package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
)

func main() {
	setupServer()

	// Define flags for bind and port
	var bind string
	var port int

	flag.StringVar(&bind, "bind", "0.0.0.0", "Address to bind to (default: 0.0.0.0)")
	flag.IntVar(&port, "port", 8080, "Port to listen on (default: 8080)")
	flag.Parse()

	// Default values
	host := bind

	// Get the PORT from environment variable
	if envPort, err := strconv.Atoi(os.Getenv("PORT")); err == nil {
		port = envPort
	}

	// Get the HOST from environment variable
	if envHost := os.Getenv("HOST"); envHost != "" {
		host = envHost
	}

	address := host + ":" + strconv.Itoa(port)
	fmt.Println("Listening on http://" + address)
	log.Fatal(http.ListenAndServe(address, nil))
}
