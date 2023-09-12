package main

import (
	"embed"
	"io/fs"
	"log"
	"net/http"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

//go:embed public/*
var content embed.FS

func main() {
	app := pocketbase.New()
	publicFolder, _ := fs.Sub(content, "public")

	// serves static files from the provided public dir (if exists)
	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		e.Router.GET("/hello/:name", func(c echo.Context) error {
			name := c.PathParam("name")

			return c.JSON(http.StatusOK, map[string]string{"message": "Hello " + name})
		} /* optional middlewares */)

		return nil
	})

	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		e.Router.GET("/", func(c echo.Context) error {
			//return c.String(http.StatusOK, "Haiyya")
			a, _ := content.ReadFile("public/index.html")
			return c.HTMLBlob(http.StatusOK, a)
		} /* insert middleware here*/)

		return nil
	})

	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		// serves static files from the provided dir (if exists)
		//e.Router.GET("/*", apis.StaticDirectoryHandler(os.DirFS("public/"), false))
		e.Router.GET("/*", apis.StaticDirectoryHandler(publicFolder, false))

		return nil
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
