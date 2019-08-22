package model

type Todo struct {
	ID    int    `json:"id"`
	TITLE string `json:"title"`
	Text  string `json:"text"`
}
