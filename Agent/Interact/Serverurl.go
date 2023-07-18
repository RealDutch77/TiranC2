package Interact

import "fmt"

var interval = 5

func ServerADD(server string, uid string) string {
	return fmt.Sprintf("%v/add/%v", server, uid)
}

func ServerCommandReport(server string, id int) string {
	return fmt.Sprintf("%v/report/command/%v", server, id)
}
