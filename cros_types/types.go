package cros_types

import (
	"strconv"
	"strings"
)

type CROS_BUILD struct {
	Platform string
	Chrome   string
	Channel  string
}

type CROS_RECO_IMG struct {
	Platform string
	Channel  string
	Board    string
	MP_Key   int
	MP_Token string
}

type CROS_RECO_IMG_DB struct {
	Img          CROS_RECO_IMG
	LastModified string
	Chrome       string
}

func (i *CROS_RECO_IMG) URL() string {
	v := ""

	if i.MP_Key != 1 {
		v = "-v" + strconv.Itoa(i.MP_Key)
	}

	// downloading an image without https has weird behavor
	return "https://dl.google.com/dl/edgedl/chromeos/recovery/chromeos_" + i.Platform + "_" + i.Board + "_recovery_" + i.Channel + "_" + i.MP_Token + v + ".bin.zip"
}

type CROS_TARGET struct {
	Board      string
	MP_Token   string
	MP_Key_Max int
}

type CROS_BRAND struct {
	/** The name of the Chromebook model (e.g. Lenovo N22) */
	Brand string
	/** Codename */
	Board string
}

type CHROME_VERSION struct {
	Major int
	Minor int
	Patch int
}

type BRUTEFORCE_ATTEMPT struct {
	Board    string
	Platform string
	MP_Key   int
}

func ParseChromeVersion(version string) *CHROME_VERSION {
	c := new(CHROME_VERSION)
	split := strings.Split(version, ".")
	major, err := strconv.Atoi(split[0])
	if err != nil {
		return nil
	}
	minor, err := strconv.Atoi(split[1])
	if err != nil {
		return nil
	}
	patch, err := strconv.Atoi(split[2])
	if err != nil {
		return nil
	}
	c.Major = major
	c.Minor = minor
	c.Patch = patch
	return c
}
