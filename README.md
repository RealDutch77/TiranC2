# TiranC2
Tiran C2 is an simple C2 framework written in python, react and golang

# Installation of server
1. `git clone https://github.com/RealDutch77/TiranC2.git`    
2. Open up the folder in any preferd file explorer
3. Open the file Server/Flask/Configs/config1.json
4. Replace the Server ip and port with your prefferd ip and port
5. go to Server/Flask
6. right click on the empty space > and open up in terminal
7. `pip install -r .\requirements.txt`
8. `python .\TiranC2.py --build http://host:port --output TiranC2.exe `, replace host with your server host an port with your server port. anf if prefferd you can change TiranC2.exe to any .exe name you want
9. `python .\TiranC2.py --config Configs/config1.json`
10. your server should start up right now, so lets fix our frontend

# Installation of gui
1. open up Server/UI/tiran in an new terminal
2. `npm i @headlessui/react`
3. `npm i @heroicons/react`
4. `npm run start`

# Continue
You can now test out TiranC2

# Commands
there arent many commands due the fact that this program is very recent, i apologize  
| Type | Description | Description |
| --- | --- | --- |
| Info | ps| Returns an list of active processes on the system |
| Info | whoami | Returns the user of the system |
| Info | ipconfig | Returns info about the IP address of the agent |
| === | =========== | ========= |
| Server | list | Returns an list of commands |
| Server | remove | Removes client from database | 
| === | =========== | ========= |
| Agent | cd Folderpath | Change directory on target systems folder | 
| Agent | download FIle | Downloads file from targets drive, only specify the file not include the dir |
| Agent | selfkill | Kills current process using taskkill |

# Photos
> StartUp
<img src="https://raw.githubusercontent.com/RealDutch77/TiranC2/main/Images/StartUp.png" width="400" height="280">

> Compiled
<img src="https://raw.githubusercontent.com/RealDutch77/TiranC2/main/Images/Compiled.png" width="400" height="280">

> Empty Dashboard
<img src="https://raw.githubusercontent.com/RealDutch77/TiranC2/main/Images/Empty Dashboard.png" width="400" height="280">

> Dashboard
<img src="https://raw.githubusercontent.com/RealDutch77/TiranC2/main/Images/Dashboard.png" width="400" height="280">

> Shell
<img src="https://raw.githubusercontent.com/RealDutch77/TiranC2/main/Images/Shell.png" width="400" height="280">

> Command
<img src="https://raw.githubusercontent.com/RealDutch77/TiranC2/main/Images/Command.png" width="400" height="280">

> Loot
<img src="https://raw.githubusercontent.com/RealDutch77/TiranC2/main/Images/Loot.png" width="400" height="280">
