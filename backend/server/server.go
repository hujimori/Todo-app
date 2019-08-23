package server

import (
	"net/http"
	"strconv"

	"github.com/jinzhu/gorm"

	"github.com/hujimori/Todo-app/backend/db"
	"github.com/hujimori/Todo-app/backend/model"
	"github.com/labstack/echo/middleware"

	"github.com/labstack/echo"
)

// var (
// 	todos = map[int]*model.Todo{}
// 	seq   = 1
// )

///////////////////
// Handlers
///////////////////
// e.POST("/todo/", createTodo)
func createTodo(c echo.Context) error {
	t := &model.Todo{}
	if err := c.Bind(t); err != nil {
		return err
	}

	// INSERTを実行
	con.Create(&t)

	return c.JSON(http.StatusCreated, t)
}

// e.GET("/todo/:id", showTodo)
func showTodo(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	t := &model.Todo{ID: id}

	con.First(&t)

	return c.JSON(http.StatusOK, t)
}

// e.GET("/todos", showAllTodos)
func showAllTodos(c echo.Context) error {
	todos := []model.Todo{}
	con.Find(&todos)
	return c.JSON(http.StatusOK, todos)
}

// e.PUT("/todo/:id", updateTodos)
func updateTodos(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	t := &model.Todo{}

	if err := c.Bind(t); err != nil {
		return err
	}

	attrMap := map[string]interface{}{"title": t.TITLE, "text": t.Text}
	todo := model.Todo{}
	con.Model(&todo).Where("id= ?", id).Updates(attrMap)
	return c.NoContent(http.StatusOK)
}

// e.DELETE("/employee/:id", deleteTodo)
func deleteTodo(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	todo := model.Todo{ID: id}
	con.First(&todo)
	con.Delete(&todo)
	return c.JSON(http.StatusOK, todo)
}

var con *gorm.DB

func Start() {
	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())

	con = db.GetConnection()
	defer con.Close()

	// Rouring
	e.POST("/todo", createTodo)
	e.GET("/todo/:id", showTodo)
	e.GET("/todos", showAllTodos)
	e.PUT("/todo/:id", updateTodos)
	e.DELETE("/todo/:id", deleteTodo)

	e.Logger.Fatal(e.Start(":1323"))
}
