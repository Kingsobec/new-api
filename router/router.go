package router

import (
	"embed"
	"one-api/controller"

	"github.com/gin-gonic/gin"
)

func SetGoogleRouter(server *gin.Engine, buildFS embed.FS, indexPage []byte) {
	api := server.Group("/auth")
	{
		api.GET("/google/login", controller.HandleGoogleLogin)
		api.GET("/google/callback", controller.HandleGoogleCallback)
	}
}
