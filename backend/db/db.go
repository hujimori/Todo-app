package db

import (
	"github.com/jinzhu/gorm"
	_ "github.com/lib/pq"
)

func GetConnection() *gorm.DB {
	dbms := "postgres"
	connect := "host=localhost port=5432 user=postgres dbname=todoapp password=root sslmode=disable"

	db, err := gorm.Open(dbms, connect)

	if err != nil {
		panic(err.Error())
	}
	return db
}
