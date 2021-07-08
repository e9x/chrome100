# Chrome100

## Collection of ChromeOS recovery images.

More information and data found on the [Website](https://chrome100.dev)

## How it works:

ChromeOS recovery images can be used to downgrade/upgrade your Chromebook. Reverse engineering the URLs used by the recovery servers allows for generating URLs that apply to a specific board, firmware version, and ChromeOS release.

Scraping all valid combinations of board, firmware, and ChromeOS release allows us to provide a service that allows you to choose a specific combination without the need of researchihng into the specific firmware version or ChromeOS version id

A bulk list of ChromeOS version ids scraped from all over the web along with all firmware versions and can be found in the [consts file](consts.js).

### URL example:

```
https://dl.google.com/dl/edgedl/chromeos/recovery/chromeos_CHROMEOS.VERSION.ID_CODENAME_recovery_stable-channel_mp-vFIRMWARE-VERSION.bin.zip
```