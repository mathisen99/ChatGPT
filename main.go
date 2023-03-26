package main

import (
	"fmt"
	"net/http"
	"openai/web"
)

// Asci escape codes for colors
const (
	RED   = "\033[31m"
	GREEN = "\033[32m"
	BLUE  = "\033[34m"
	WHITE = "\033[37m"
	RESET = "\033[0m"
)

func main() {
	// css file server
	cssFs := http.FileServer(http.Dir("./css"))
	http.Handle("/css/", http.StripPrefix("/css/", cssFs))
	// js file server
	jsFs := http.FileServer(http.Dir("./js"))
	http.Handle("/js/", http.StripPrefix("/js/", jsFs))

	fmt.Println("")
	fmt.Println("============= ChatGPT Client by Mathisen =============")
	fmt.Println(GREEN + "Running: http://localhost:8080" + RESET)
	fmt.Println("======================================================")

	// Start the web server
	web.RunWebServer()
}
