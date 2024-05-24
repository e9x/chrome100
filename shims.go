package main

import (
	"encoding/json"
	"fmt"
	"os"
)

type Shim struct {
	URL      string `json:"url"`
	Codename string `json:"codename"`
}

type ShimMirror struct {
	Name  string `json:"name"`
	Shims []Shim `json:"shims"`
}

// resolved shim for a codename
type ResolvedShim struct {
	Codename string
	Mirror   string `json:"mirror"`
	URL      string `json:"url"`
}

func getShims(mirrors []ShimMirror, codename string) []ResolvedShim {
	res := []ResolvedShim{}
	for i := range mirrors {
		m := &mirrors[i]
		for si := range m.Shims {
			if m.Shims[si].Codename == codename {
				res = append(res, ResolvedShim{
					Codename: codename,
					Mirror:   m.Name,
					URL:      m.Shims[si].URL,
				})
			}
		}
	}
	return res
}

func loadShimMirrors() []ShimMirror {
	f, err := os.Open("shim_mirrors.json")
	mirrors := []ShimMirror{}
	if err == nil {
		err = json.NewDecoder(f).Decode(&mirrors)
	}

	if err != nil {
		fmt.Fprintf(os.Stderr, "Could not parse sh1mmer mirrors: %v\n", err)
		os.Exit(1)
	}

	return mirrors
}
