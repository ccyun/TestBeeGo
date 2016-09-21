package dao

import (
	"log"

	bolt "github.com/johnnadratowski/golang-neo4j-bolt-driver"
)

//InitNeo4j 初始化neo4j
func InitNeo4j() {
	driver := bolt.NewDriver()
	if conn, err := driver.OpenNeo("bolt://localhost:7687"); err == nil {

	}

	//defer conn.Close()
	log.Println(conn)
}
