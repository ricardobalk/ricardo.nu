package handler

import (
	"encoding/json"
	"encoding/xml"
	"fmt"
	"net/http"
	"reflect"
	"time"

	"gopkg.in/yaml.v3"
)

type ResponseBody struct {
	Message    string    `json:"message" yaml:"message" xml:"message"`
	Timestamp  time.Time `json:"timestamp" yaml:"timestamp" xml:"timestamp"`
	RemoteAddr string    `json:"remote_addr" yaml:"remote_addr" xml:"remote_addr"`
}

func Handler(w http.ResponseWriter, r *http.Request) {

	responseBody := ResponseBody{
		Message:    "Hello from Go!",
		Timestamp:  time.Now(),
		RemoteAddr: r.RemoteAddr,
	}

	responseHeaders := map[string]string{
		"Content-Type":           "application/json",
		"Cache-Control":          "no-cache, no-store, must-revalidate",
		"Pragma":                 "no-cache",
		"Expires":                "0",
		"X-Content-Type-Options": "nosniff",
		"X-Dog-Type-Options":     "nobark",
		"X-Frame-Options":        "DENY",
		"X-XSS-Protection":       "1; mode=block",
		"X-GitHub-Repository":    "ricardobalk/ricardo.nu",
		"Location":               "/",
	}

	for k, v := range responseHeaders {
		w.Header().Set(k, v)
	}

	w.WriteHeader(http.StatusFound)

	switch r.Header.Get("Accept") {

	case "application/xml":
		w.Header().Set("Content-Type", "application/xml")
		err := xml.NewEncoder(w).Encode(responseBody)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			fmt.Fprintf(w, "Error: %s", err)
			return
		}

	case "text/plain":
		w.Header().Set("Content-Type", "text/plain")

		s := reflect.ValueOf(&responseBody).Elem()

		for i := 0; i < s.NumField(); i++ {
			f := s.Field(i)

			fmt.Fprintf(w, "%s: %v", s.Type().Field(i).Name, f.Interface())

			if i != s.NumField()-1 {
				fmt.Fprintf(w, "\n")
			}
		}

	case "application/x-yaml":
		w.Header().Set("Content-Type", "application/x-yaml")
		err := yaml.NewEncoder(w).Encode(responseBody)

		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			fmt.Fprintf(w, "Error: %s", err)
			return
		}

	default:
		w.Header().Set("Content-Type", "application/json")
		err := json.NewEncoder(w).Encode(responseBody)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			fmt.Fprintf(w, "Error: %s", err)
			return
		}
	}

}
