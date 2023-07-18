from app import App

import os

class SetConfigs:

    def __init__(self, serverip, serverport, uihost, uiport, lootdir, lootdircustum, configname):
        self.serverip = serverip
        self.serverport = serverport
        self.uiip = uihost
        self.uiport = uiport
        self.lootdir = lootdir
        self.lootdircustum = lootdircustum
        self.version = "0.0.1"
        self.configname = configname

        print(self.banner("0.0.1"))
        print(self.configs())
        self.npmcustum(self.uiip, self.uiport)
        self.updateHostjs(serverip, serverport)
        print(self.npm())
        # run our server on the prefferd host and port

        App(self.serverip, self.serverport, self.lootdir, self.lootdir)


    def npm(self):
        return f"""
[+] You can startup the gui with the folowing command:
make sure your in the UI/tiran folder to run the command

[i] > 1. npm run start
[+] > navigate to: http://{self.uiip}:{self.uiport}/Dashboard

"""
    def configs(self):
        return f"""
Running under: {self.configname}

Server
[+] Server IP: {self.serverip}
[+] Server Port: {self.serverport}

UI:
[+] UI IP: {self.uiip}
[+] UI Port: {self.uiport}

Lootdir:
[+] LootDir: {self.lootdir}
[+] Second lootdir: {self.lootdircustum}
"""
    def banner(self, version):
        os.system("cls||clear")
        return f"""                                                                      
         ttttt        tt                                                        
       tttttttttttttttttt   ttt                                                 
       tt   tt   tttttt     ttt                                                 
        ttt  tttt   t        t              
       ttt   tttt  ttt   ttttttt  tttttttttttt   t t t        ttttttttttttttt    
      tttt   tttt  ttt      tttt     tttt       tt    tttt      tttt   ttt      
      ttttt   tttt   t  t    tttt     tttt     t     ttttt      tttt   ttt      
       ttttt        tttt    tttt     tttt      tttt   tttt      tttt   ttt      
         ttttttttttttt    tttttttt tttttttt     ttttttttttttt  tttttt ttttttt v{version} 

            ::[Created by Vince (RealDutch77 https://github.com/RealDutch77)]::"""
    def readfile(self, path):
        with open(path, "r+") as f:
            return f.read()

    def createfile(self, path, content):
        with open(path, "w+") as f:
            f.write(content)
            f.close()
            print(f"created {path}")

    def updateHostjs(self, host, port):
        hostpath = f"../ui/tiran/src/components/Host.js"
        Hostjscust = f'const Host = "http://{host}:{port}";'

        Hostjsdefault = '''const Agent = `${Host}/agents`;
const AgentInfo = `${Host}/agents/`
const AgentCommand = `${Host}/command/`
const Agentloot = `${Host}/loot/info`'''

        HostjsExports = 'export {Host, Agent, AgentInfo, AgentCommand, Agentloot}' #Python code will use the bracelets as variable, but its js code do we dont want that

        Hostjs = f"{Hostjscust}\n{Hostjsdefault}\n\n{HostjsExports}"


        if os.path.exists(hostpath):
            if self.readfile(hostpath) != Hostjs:
                self.createfile(hostpath, Hostjs)
        else:
            self.createfile(hostpath, Hostjs)
        
    def npmcustum(self, host, port):
        envcontent = f"host={host}\nport={port}"
        envpath = "../ui/tiran/.env"

        if os.path.exists(envpath):
            if self.readfile(envpath) != envcontent:
                self.createfile(envpath, envcontent)
        else:
            self.createfile(envpath, envcontent)
    
    def lootdirs(self, json):
        print(json.dumps(json))

