import { CommandLineIcon  , ArrowLeftIcon    } from "@heroicons/react/24/solid";
import sendCommand from "../components/interact";
import { useState, useEffect, useRef } from "react";

import Information from "../components/information";

import { AgentCommand } from "../components/host";
import Loading from "../components/loading";


export default function Uid() {
    const [message, setMessage] = useState(false)
    const [commands, setCommands] =  useState([])
    const [command, setCommand] = useState("")
    const [loading, setLoading] = useState(true)

    let url = (new URLSearchParams(window.location.search))

    let uid = url.get("uid")
    let os = url.get("os")
    let username = url.get("user")
    let hostname = url.get("host")
    let proccess = url.get("proc")
    let pid = url.get("pid")
    let ram = url.get("ram")
    let ip = url.get("ip")
    let syslan = url.get("syslan")



    if (!uid) {
        window.location.replace("/Dashboard")
    }

    const handleChange = event => {
        setCommand(event.target.value);
        setMessage(false)
        console.log('value is:', event.target.value);

        console.log(command)

      };

    const Commands = async () => {
        const response = await fetch(
            `${AgentCommand}${uid}`
            ).then((response) => response.json());
            const data = JSON.parse(response) 
            setCommands(data);
            console.log(data)
            console.log(commands)
        };
  
    useEffect(() => {
        const interval = setInterval(() => { 
            Commands();
            setLoading(false)
        }, 10000) 

    }, []);


    const autosuggestor = () => {
        if (!commands.length && loading !== true) {
            return <p>No commands yet :(</p>
        } else if (loading != true) {
            return (
                <div class="rounded-md border-gray-300  border py-1 px-1 mt-1">
                <p className="font-mono">Select Command</p>
                <div class="cursor-pointer p-0 hover:bg-slate-200 font-mono">
                </div>
                    {commands.filter( cmd => cmd.command.includes(command)).map(commands => (

                        <div class="cursor-pointer p-0 hover:bg-slate-200 font-mono">
                            <a onClick={() => setCommand(commands.command)}>
                                <p>[{commands.command_executed}] {commands.command}</p>
                            </a>
                        </div>

                    ))
                    }
                </div>
            )
        } else {
            return <p></p>
        }
    }
    const empty = () => {
        if (loading == true) {
            return (
                <Loading></Loading>
                // <p>Loading....</p>
            )
        } else {
            return (
                commands.map( (commands) => (
                    <div class="whitespace-normal">
                        <p class="font-mono"> [{commands.command_added}][Staged][{commands.command}]</p>
                        <p class="font-mono" style={{whiteSpace: "pre-wrap"}}>[{commands.command_executed}][{commands.command}][Response] <br/>{commands.command_response}</p>
                        <p>------------------------------------------------------------------------------</p>
                        {/* <div class="flex-grow  border-t border-gray-600"></div> */}
                    </div>
                    // console.log("COmmansd" + commands.command_par)
                ))
            )
        }
    }

    const showmessage = () => {
        if (message == true) {
            return (
            <div class="flex min-h-min shadow-lg rounded-lg">
            <div class="bg-green-600 py-4 px-6 rounded-l-lg flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="text-white fill-current" viewBox="0 0 16 16" width="20" height="20"><path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>
            </div>
            <div class="px-4 py-6 bg-white rounded-r-lg flex justify-between items-center w-full border border-l-transparent border-gray-200">
              <div> {command}, successfully sent to database</div>
              <button>
                <a onClick={() => setMessage(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="fill-current text-gray-700" viewBox="0 0 16 16" width="20" height="20"><path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path></svg>
                </a>
               
              </button>
            </div>
          </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
    return (
        <>
    


            <div className="mx-auto  py-6 sm:px-6 lg:px-8">
                <a href="/Dashboard">
                    <div className="flex flex-center" >
                        <ArrowLeftIcon className="h-5 w-5 text-slate-500" />
                    </div>
                </a>
            </div>
            <header>
                <nav class=" text-slate-700 font-bold text-2xl py-2" aria-label="Breadcrumb">
                    <ol role="list" className=" flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        <li key="">
                            <div className="flex items-center">
                            <a href="/Dashborard" className="mr-2 text-1xl font-bold text-gray-900">
                                Dashboard
                            </a>
                            <svg
                                width={16}
                                height={20}
                                viewBox="0 0 16 20"
                                fill="currentColor"
                                aria-hidden="true"
                                className="h-6 w-7 text-black"
                            >
                                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                            </svg>
                            </div>
                        </li>
                        <li key="">
                            <div className="flex items-center">
                            <a className="mr-2 text-1xl font-bold text-gray-900">
                                #{uid}
                            </a>
                            </div>
                        </li>
                    </ol>
                </nav>
            </header>
            <div class="mx-auto  py-6 sm:px-6 lg:px-8">
            <div class="justify-self-auto">
                    <div class="bg-slate-50 border border-slate-200 h-96 overflow-auto">
                        <div class="py-3 px-6">
                            <h1 className="text-2xl px-2 font-bold tracking-tight text-slate-800">System Information</h1>
                            <Information keyword="osuid" data={uid} data2={os} ></Information>
                            <Information keyword="userhost" data={username} data2={hostname} ></Information>
                            <Information keyword="procpid" data={proccess} data2={pid} ></Information>
                            <Information keyword="ramvm" data={ram} data2="None" ></Information>
                            <Information keyword="ip" data={ip} data2="None" ></Information>
                            <Information keyword="syslan" data={syslan} data2="None" ></Information>
                            


                        </div>
                    </div>
                </div>
                <div class="mx-auto py-4">
                    <div class="bg-slate-50 border border-slate-200">
                        <div class="py-3 px-6">
                        <div class="">
                            <h1 className="text-2xl font-bold tracking-tight text-slate-800">Shell</h1>
                            {showmessage()}
                        </div>
                        <div class="bg-slate-100  rounded-md max-h-96 overflow-auto dark:border-gray-300  border py-1 px-1 mt-1 text-base h-96">
                            {empty()}
                            {autosuggestor()}
                        

                        </div>
                        {/* <br></br> */}
                        <div class="py-2">
                        <div class="bg-gray-100 min-h-full rounded-md  border-l border-r border-b border-t border-gray-300 sm:flex sm:flex-row"> 
                            <div class="py-1 px-1">
                                <CommandLineIcon className="h-6 w-6 text-black" />
                            </div>


                            <input 
                                class="w-full bg-slate-100 text-black placeholder:text-gray-600 outline-none  sm:text-sm sm:leading-6 rounded-sm" 
                                onChange={handleChange}
                                value={command}
                                placeholder="whoami" 
                            />
                            <div>

                            </div>
                            <div class="flex flex-center">
                            <button
                                type="button"
                                className="w-full rounded-md bg-slate-100 py-1 px-10 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-200 sm:mt-0 sm:w-auto"
                                onClick={() => {
                                    sendCommand( {uid, command});
                                    setMessage(true)
                                    
                                }}
                        
                                    >
                                Send
                            </button>
                            </div>

                        </div>
                        </div>
                        
                        </div>
                        
                    </div>
                </div>
            </div>
               
        </>
    )
    }