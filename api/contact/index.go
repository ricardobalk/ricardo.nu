package handler

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/mailgun/mailgun-go/v4"
)

type RequestData struct {
	// Name    string `json:"name,omitempty"`
	// Email   string `json:"email,omitempty"`
	// Subject string `json:"subject,omitempty"`
	Message string `json:"message"`
}

type SendToDetails struct {
	Email   string
	Name    string
	Subject string
}

type EnvVars struct {
	MG_DOMAIN  string `env:"MAILGUN_DOMAIN"`
	MG_API_KEY string `env:"MAILGUN_API_KEY"`
	TO_EMAIL   string `env:"TO_EMAIL"`
	TO_NAME    string `env:"TO_NAME"`
	TO_SUBJECT string `env:"TO_SUBJECT"`
}

type APIResponse struct {
	Timestamp int64  `json:"timestamp"`
	Success   bool   `json:"success"`
	Message   string `json:"message,omitempty"`
}

type APIErrors struct {
	Errors []string `json:"errors"`
}

type MailgunRespone struct {
	ID      string `json:"id"`
	Message string `json:"message"`
}

type APIAdditionalResponseData struct {
	MailgunRespone `json:"mailgun_response"`
}

type APIErrorResponse struct {
	APIResponse
	APIErrors
}

type APISuccessResponse struct {
	APIResponse
	APIAdditionalResponseData
}

var (
	env = EnvVars{
		MG_DOMAIN:  os.Getenv("MG_DOMAIN"),  // The domain that you see in the Mailgun dashboard.
		MG_API_KEY: os.Getenv("MG_API_KEY"), // The API key that you see in the Mailgun dashboard.
		TO_EMAIL:   os.Getenv("TO_EMAIL"),   // The email address of the recipient.
		TO_NAME:    os.Getenv("TO_NAME"),    // The name of the recipient.
		TO_SUBJECT: os.Getenv("TO_SUBJECT"), // The subject of the email.
	}

	mg mailgun.Mailgun = mailgun.NewMailgun(
		env.MG_DOMAIN,
		env.MG_API_KEY,
	)
)

// sendMail sends an email using the Mailgun API.
func sendMail(timeout uint8, from string, subject string, message string, to ...string) (id string, resp string, err error) {
	msg := mg.NewMessage(from, subject, message, to...)

	ctx, cancel := context.WithTimeout(context.Background(), time.Second*time.Duration(timeout))
	defer cancel()

	return mg.Send(ctx, msg)
}

// checkEnv checks if the required environment variables are set. If not, it will return an error. Otherwise, it will return nil.
func checkEnv() error {
	envVars := map[string]string{
		"MG_DOMAIN":  env.MG_DOMAIN,
		"MG_API_KEY": env.MG_API_KEY,
		"TO_EMAIL":   env.TO_EMAIL,
		"TO_NAME":    env.TO_NAME,
		"TO_SUBJECT": env.TO_SUBJECT,
	}

	missingEnvVars := []string{}

	for key, value := range envVars {
		if value == "" {
			missingEnvVars = append(missingEnvVars, key)
		}
	}

	if len(missingEnvVars) > 0 {
		return fmt.Errorf("missing environment variables: %v", strings.Trim(strings.Join(missingEnvVars, ", "), ", "))
	}

	return nil
}

func Handler(w http.ResponseWriter, r *http.Request) {
	if err := checkEnv(); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "Error: %s", err)
		return
	}

	// Check if the request method is a POST request. If not, return a 405 error code (Method Not Allowed).
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		fmt.Fprintf(w, "Error: %s", http.StatusText(http.StatusMethodNotAllowed))
		return
	}

	requestData := RequestData{}
	err := json.NewDecoder(r.Body).Decode(&requestData)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "Error: %s", err)
		return
	}

	// Send the email. If there is an error, return a 500 error code (Internal Server Error).
	id, resp, err := sendMail(
		15,                       // Timeout in seconds.
		"noreply@"+env.MG_DOMAIN, // The email address of the sender.
		env.TO_SUBJECT,           // The subject of the email.
		requestData.Message,      // The message of the email.
		env.TO_EMAIL,             // The email address of the recipient.
	)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "Error: %s", err)
		return
	}

	// Return a 200 status code (OK) and the ID of the email that was sent.
	w.Header().Set("Content-Type", "text/json")
	w.WriteHeader(http.StatusOK)

	json.NewEncoder(w).Encode(
		APISuccessResponse{
			APIResponse{
				Timestamp: time.Now().Unix(),
				Success:   true,
				Message:   "Email sent successfully.",
			},
			APIAdditionalResponseData{
				MailgunRespone: MailgunRespone{
					ID:      id,
					Message: resp,
				},
			},
		})
}
