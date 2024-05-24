package main

import (
	"chrome100/v2/cros_types"
	"database/sql"
	"fmt"
	"os"

	_ "github.com/mattn/go-sqlite3"
)

func openChromeVersions() *sql.DB {
	db, err := sql.Open("sqlite3", "./node_modules/chrome-versions/dist/chrome.db")
	if err != nil {
		fmt.Fprintf(os.Stderr, "Could not open DB: %v\n", err)
		os.Exit(1)
	}
	return db
}

func getTargets(db *sql.DB) []cros_types.CROS_TARGET {
	targets := []cros_types.CROS_TARGET{}
	rows, err := db.Query("SELECT board,mp_token,mp_key_max FROM CROS_TARGET ORDER BY board")
	if err != nil {
		fmt.Fprintf(os.Stderr, "Query: %v", err)
		os.Exit(1)
	}
	for rows.Next() {
		target := cros_types.CROS_TARGET{}
		err = rows.Scan(&target.Board, &target.MP_Token, &target.MP_Key_Max)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Scan: %v", err)
			os.Exit(1)
		}
		targets = append(targets, target)
	}

	return targets
}

func getTarget(db *sql.DB, board string) *cros_types.CROS_TARGET {
	rows, err := db.Query("SELECT mp_token,mp_key_max FROM CROS_TARGET WHERE board = ?", board)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Query: %v\n", err)
		os.Exit(1)
	}
	if !rows.Next() {
		return nil
	}
	target := &cros_types.CROS_TARGET{Board: board}
	err = rows.Scan(&target.MP_Token, &target.MP_Key_Max)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Scan: %v\n", err)
		os.Exit(1)
	}
	return target
}

func getBrands(db *sql.DB, board string) []string {
	brands := []string{}
	rows, err := db.Query("SELECT brand FROM cros_brand WHERE board = ? ORDER BY brand", board)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Query: %v\n", err)
		os.Exit(1)
	}
	for rows.Next() {
		brand := ""
		err = rows.Scan(&brand)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Scan: %v\n", err)
			os.Exit(1)
		}
		brands = append(brands, brand)
	}

	return brands
}

func getImages(db *sql.DB, board string) []cros_types.CROS_RECO_IMG_DB {
	images := []cros_types.CROS_RECO_IMG_DB{}
	rows, err := db.Query("SELECT platform,chrome,mp_token,mp_key,channel,last_modified FROM cros_recovery_image WHERE board = ?", board)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Query: %v\n", err)
		os.Exit(1)
	}
	for rows.Next() {
		image := cros_types.CROS_RECO_IMG_DB{Img: cros_types.CROS_RECO_IMG{Board: board}}
		err = rows.Scan(&image.Img.Platform, &image.Chrome, &image.Img.MP_Token, &image.Img.MP_Key, &image.Img.Channel, &image.LastModified)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Scan: %v\n", err)
			os.Exit(1)
		}
		images = append(images, image)
	}

	return images
}
