# chrome100

A directory of recovery images for Google's operating system, Chrome OS.

Documentation is a work in progress. See the website live at https://chrome100.dev/.

The legacy branch contains an earlier path for chrome100. We no longer store binary recovery data in the repository, instead we store it in the [chrome-versions package](https://www.npmjs.com/package/chrome-versions) ([GitHub](https://github.com/e9x/chrome-versions)).

## Building and running

You will need:

- NPM
- Golang

1. Clone the repository

```sh
git clone https://github.com/e9x/chrome100.git
cd chrome100
```

2. Install modules

```sh
npm install
```

3. Build

```sh
go build
```

4. Start the server

```sh
./chrome100
```
