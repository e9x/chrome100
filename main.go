package main

import (
	"bytes"
	"chrome100/v2/cros_types"
	"encoding/json"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
	"path"
	"strconv"
	"strings"

	"github.com/evanw/esbuild/pkg/api"
	"github.com/tdewolff/minify/v2"
	"github.com/tdewolff/minify/v2/html"
)

func main() {
	db := openChromeVersions()
	mirrors := loadShimMirrors()

	m := minify.New()
	m.AddFunc("text/html", html.Minify)

	// tmpl := template.Must(template.ParseGlob("views/*.tmpl"))
	tmpl := make(map[string]*template.Template)
	tmpl["index"] = template.Must(template.ParseFiles("views/index.tmpl", "views/layout.tmpl"))
	tmpl["board"] = template.Must(template.ParseFiles("views/board.tmpl", "views/layout.tmpl"))
	tmpl["info"] = template.Must(template.ParseFiles("views/info.tmpl", "views/layout.tmpl"))
	tmpl["guide"] = template.Must(template.ParseFiles("views/guide.tmpl", "views/layout.tmpl"))
	tmpl["404"] = template.Must(template.ParseFiles("views/404.tmpl", "views/layout.tmpl"))

	static := http.FileServer(http.Dir("static/"))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/" {
			// load our own 404 page if we can't find the file
			_, err := os.Open(path.Join("static/", path.Clean(r.URL.Path))) // Do not allow path traversals.
			if os.IsNotExist(err) {
				var buf bytes.Buffer
				err := tmpl["404"].ExecuteTemplate(&buf, "base", nil)
				if err == nil {
					err = m.Minify("text/html", w, &buf)
				}
				if err != nil {
					fmt.Fprintf(os.Stderr, "Rendering 404: %v\n", err)
					return
				}
			} else {
				static.ServeHTTP(w, r)
			}
			return
		}

		targets := getTargets(db)

		// boards with brands
		tbs := make([]struct {
			Board  string
			Brands string
		}, len(targets))

		for i := range tbs {
			target := &targets[i]
			tbs[i].Board = target.Board
			tbs[i].Brands = strings.Join(getBrands(db, target.Board), ", ")
		}

		var buf bytes.Buffer
		err := tmpl["index"].ExecuteTemplate(&buf, "base", tbs)
		if err == nil {
			err = m.Minify("text/html", w, &buf)
		}
		if err != nil {
			fmt.Fprintf(os.Stderr, "Rendering index: %v\n", err)
		}
	})

	http.HandleFunc("/board/{name}", func(w http.ResponseWriter, r *http.Request) {
		boardName := r.PathValue("name")
		target := getTarget(db, boardName)

		type BoardViewData struct {
			Board  *string
			Brands []string
			Images []cros_types.CROS_RECO_IMG_DB
			Shims  []ResolvedShim
		}

		if target == nil {
			w.WriteHeader(404)
			var buf bytes.Buffer
			err := tmpl["404"].ExecuteTemplate(&buf, "base", nil)
			if err == nil {
				err = m.Minify("text/html", w, &buf)
			}
			if err != nil {
				fmt.Fprintf(os.Stderr, "Rendering 404: %v\n", err)
			}
			return
		}

		images := getImages(db, boardName)
		shims := getShims(mirrors, boardName)

		var buf bytes.Buffer
		err := tmpl["board"].ExecuteTemplate(&buf, "base", BoardViewData{
			Board:  &target.Board,
			Brands: getBrands(db, boardName),
			Images: images,
			Shims:  shims,
		})
		if err == nil {
			err = m.Minify("text/html", w, &buf)
		}
		if err != nil {
			fmt.Fprintf(os.Stderr, "Rendering board %s: %v\n", boardName, err)
		}
	})

	http.HandleFunc("/api/board/{name}", func(w http.ResponseWriter, r *http.Request) {
		boardName := r.PathValue("name")
		target := getTarget(db, boardName)

		if target == nil {
			w.WriteHeader(404)
			return
		}

		// CROS_RECO_IMG + CROS_RECO_IMG_DB + a url field
		type BoardAPIImg struct {
			Platform     string `json:"platform"`
			Channel      string `json:"channel"`
			Board        string `json:"board"`
			MP_Key       int    `json:"mp_key"`
			MP_Token     string `json:"mp_token"`
			LastModified string `json:"last_modified"`
			Chrome       string `json:"chrome"`
			URL          string `json:"url"`
		}

		type BoardAPI struct {
			Images []BoardAPIImg `json:"images"`
			// API change: used to be an array of objects with the board name, is now just an array of strings
			Brands []string       `json:"brands"`
			Shims  []ResolvedShim `json:"shims"`
		}

		res := BoardAPI{
			Brands: getBrands(db, boardName),
			Shims:  getShims(mirrors, boardName),
		}

		imgs := getImages(db, boardName)
		for i := range imgs {
			img := &imgs[i]
			res.Images = append(res.Images, BoardAPIImg{
				Platform:     img.Img.Platform,
				Channel:      img.Img.Channel,
				Board:        img.Img.Board,
				MP_Key:       img.Img.MP_Key,
				MP_Token:     img.Img.MP_Token,
				LastModified: img.LastModified,
				Chrome:       img.Chrome,
				URL:          img.Img.URL(),
			})
		}

		w.Header().Set("content-type", "application/json")
		err := json.NewEncoder(w).Encode(res)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Rendering API for board %s: %v\n", boardName, err)
		}
	})

	// static stuff
	http.HandleFunc("/info", func(w http.ResponseWriter, r *http.Request) {
		var buf bytes.Buffer
		err := tmpl["info"].ExecuteTemplate(&buf, "base", nil)
		if err == nil {
			err = m.Minify("text/html", w, &buf)
		}
		if err != nil {
			fmt.Fprintf(os.Stderr, "Rendering info: %v\n", err)
		}
	})

	http.HandleFunc("/guide", func(w http.ResponseWriter, r *http.Request) {
		var buf bytes.Buffer
		err := tmpl["guide"].ExecuteTemplate(&buf, "base", nil)
		if err == nil {
			err = m.Minify("text/html", w, &buf)
		}
		if err != nil {
			fmt.Fprintf(os.Stderr, "Rendering guide: %v\n", err)
		}
	})

	// build board js when script is ran
	api.Build(api.BuildOptions{
		EntryPoints:       []string{"views/board.ts", "views/index.css"},
		Outdir:            "static/",
		Bundle:            true,
		Write:             true,
		MinifyWhitespace:  true,
		MinifyIdentifiers: true,
		MinifySyntax:      true,
		Banner: map[string]string{
			"js": "'use strict';",
		},
		Format:   api.FormatCommonJS,
		Platform: api.PlatformBrowser,
		LogLevel: api.LogLevelInfo,
	})

	port := 8080

	if envPort, err := strconv.Atoi(os.Getenv("PORT")); err == nil {
		port = envPort
	}

	address := "127.0.0.1:" + strconv.Itoa(port)
	fmt.Println("Listening on http://" + address)
	log.Fatal(http.ListenAndServe(address, nil))
}
