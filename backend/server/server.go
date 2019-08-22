package server

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/middleware"

	"github.com/labstack/echo"
)

type (
	todo struct {
		ID   int    `json:"id"`
		Text string `json:"text"`
	}
)

var (
	todos = map[int]*todo{}
	seq   = 1
)

// Handlers

func createTodo(c echo.Context) error {
	t := &todo{
		ID: seq,
	}

	if err := c.Bind(t); err != nil {
		return err
	}

	todos[t.ID] = t
	seq++
	return c.JSON(http.StatusCreated, t)
}

func getTodo(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	return c.JSON(http.StatusOK, todos[id])
}

func updateTodo(c echo.Context) error {
	t := new(todo)
	if err := c.Bind(t); err != nil {
		return err
	}
	id, _ := strconv.Atoi(c.Param("id"))
	todos[id].Text = t.Text
	return c.JSON(http.StatusOK, todos[id])
}

func deleteTodo(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	delete(todos, id)
	return c.NoContent(http.StatusNoContent)
}

func Start() {
	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// Rouring
	e.POST("/todos/", createTodo)
	e.GET("/todos/:id", getTodo)
	e.PUT("/todos/:id", updateTodo)
	e.DELETE("/todos/:id", deleteTodo)

	e.Logger.Fatal(e.Start(":1323"))
}
