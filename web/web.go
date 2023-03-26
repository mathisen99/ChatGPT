package web

import (
	"net/http"
)

func RunWebServer() {
	// Set up the routes
	http.HandleFunc("/", indexHandler)

	// Start the web server listening on port 8080
	http.ListenAndServe(":8080", nil)
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	// server the index.html file
	http.ServeFile(w, r, "templates/index.html")
}
