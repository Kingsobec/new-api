package controller

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"one-api/model"
	"os"
	"strings"

	// "os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"gorm.io/gorm"
)

func googleOAuthConfig() *oauth2.Config {
	return &oauth2.Config{ClientID: os.Getenv("GOOGLE_CLIENT_ID"),
		ClientSecret: os.Getenv("GOOGLE_CLIENT_SECRET"),
		RedirectURL:  os.Getenv("GOOGLE_REDIRECT_URL"),
		Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"},
		Endpoint:     google.Endpoint}
}

const oauthStateString = "random_state"

func HandleGoogleLogin(c *gin.Context) {
	if googleOAuthConfig().ClientID == "" {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Google OAuth not configured properly"})
		return
	}
	url := googleOAuthConfig().AuthCodeURL(oauthStateString, oauth2.AccessTypeOffline)
	c.Redirect(http.StatusTemporaryRedirect, url)
}

func HandleGoogleCallback(c *gin.Context) {
	state := c.Query("state")
	if state != oauthStateString {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid state parameter"})
		return
	}

	code := c.Query("code")
	token, err := googleOAuthConfig().Exchange(context.Background(), code)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to exchange token"})
		return
	}

	client := googleOAuthConfig().Client(context.Background(), token)
	resp, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user info"})
		return
	}
	defer resp.Body.Close()

	var userInfo struct {
		ID      string `json:"id"`
		Email   string `json:"email"`
		Name    string `json:"name"`
		Picture string `json:"picture"`
	}

	if err := json.NewDecoder(resp.Body).Decode(&userInfo); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode user info"})
		return
	}

	user, err := model.GetUserByEmail(userInfo.Email)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			newUser := model.User{
				Email:    userInfo.Email,
				Username: strings.Split(userInfo.Name, " ")[0],
				Status:   1,
			}
			if newUser.Username == "" {
				newUser.Username = strings.Split(userInfo.Email, "@")[0]
			}
			if err := newUser.Insert(0); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
				return
			}
			user = newUser
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
			return
		}
	}

	fmt.Println(user)

	jwtSecret := os.Getenv("JWT_SECRET")
	if jwtSecret == "" {
		panic("JWT_SECRET is not set!")
	}
	jwtToken, err := generateJWT(user.Id, user.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create JWT token"})
		fmt.Printf("this is the error: %v", err)
		return
	}

	// c.JSON(http.StatusOK, gin.H{"token": jwtToken})
	redirectURL := "https://71c4-197-210-79-131.ngrok-free.app/login?token=" + jwtToken
	c.Redirect(http.StatusSeeOther, redirectURL)
}

func generateJWT(id int, email string) (string, error) {
	claims := jwt.MapClaims{
		"id":    id,
		"email": email,
		"exp":   time.Now().Add(time.Hour * 24 * 30).Unix(),
		"rnd":   time.Now().UnixNano(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte("b722576c8883a5bbed110e098e690be0647782107d3311925aeafd4d65c9224a"))
}

func VerifyGoogleToken(tokenString string) (jwt.MapClaims, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(googleOAuthConfig().ClientSecret), nil
	})

	if err != nil {
		return nil, err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		return claims, nil
	}
	return nil, fmt.Errorf("invalid token")
}
