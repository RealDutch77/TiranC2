import OperatingSystem from "../components/os";
import { useEffect } from "react";
import { useState } from "react";
import TimeComponent from "../components/time";
import Ram from "../components/ram";

import { Agent } from "../components/host";
import { ChevronRightIcon, CloudIcon, ServerIcon, TagIcon, UsersIcon, WindowIcon, FingerPrintIcon           } from "@heroicons/react/24/solid";


export default function Dashboard(){
    const [uid, setUid] = useState([]);
    // // Function to collect data
    // const countUID
    const getApiData = async () => {
        const response = await fetch(
            Agent
          ).then((response) => response.json());
            const data = JSON.parse(response) 
            setUid(data);
        };
  
    useEffect(() => {
        const interval = setInterval(() => {
            console.log(uid)
            getApiData();
        }, 5000) 

    }, []);

    const clients = () => {
            return (
                uid.map( (agent) => (
                    <tr>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 h-10 w-10">
                                    <OperatingSystem os={agent.os} size="h-9 w-8"></OperatingSystem>
                                </div>
                                <div class="ml-4">
                                    <div class="text-sm leading-5 font-medium text-gray-900">{agent.id} - {agent.uid}</div>
                                    <div class="text-sm leading-5 text-gray-500"> {agent.os}</div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div class="text-sm leading-5 text-gray-900 flex"> <TagIcon  className="h-5 w-5 text-gray-500" /> {agent.username}</div>
                            <div class="text-sm leading-5 text-gray-500 flex"> <UsersIcon className="h-5 w-5 text-gray-500" /> {agent.hostname}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div class="text-sm leading-5 text-gray-900 flex"> <WindowIcon className="h-5 w-5 text-gray-600" /> {agent.procname}</div>
                            <div class="text-sm leading-5 text-gray-500 flex"> <FingerPrintIcon  className="h-5 w-5 text-gray-600" /> {agent.pid}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div class="text-sm leading-5 text-gray-900">{agent.interaction}</div>
                            <TimeComponent timesincelastint={agent.interaction}></TimeComponent>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                            <div class="text-sm leading-5 text-gray-900">{agent.ram}MB</div>
                            <Ram ram={agent.ram}></Ram>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div class="text-sm leading-5 text-gray-900 flex"> <CloudIcon className="h-5 w-5 text-gray-500" /> {agent.ip}</div>
                            <div class="text-sm leading-5 text-gray-500 flex"> <ServerIcon   className="h-5 w-5 text-gray-500" /> 127.0.0.1</div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                            <div class="text-sm leading-5 text-gray-900">{agent.syslan}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap  border-b border-gray-200 text-sm leading-5 font-medium">
                            <a href={`uid?uid=`+ agent.uid + "&os=" + agent.os + "&host=" + agent.hostname + "&user=" + agent.username + "&proc=" + agent.procname + "&pid=" + agent.pid + "&int=" + agent.interaction + "&ram=" + agent.ram + "&ip=" + agent.ip + "&syslan=" + agent.syslan}>
                            <ChevronRightIcon  className="h-6 w-6 text-gray-500" /> 
                            </a>
                        </td>
                    </tr> 
                ))            
            )
        }
    
        return (
            <>

            <header>
            <div className="mx-auto  py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-slate-800">Dashboard</h1>
            </div>
            </header>
            <div class="mx-auto sm:px-6 lg:px-8">
                <div class="bg-slate-50 border border-slate-200">
                    <div class="py-3 px-6 flex items-center">
                        <h1 className="text-xl font-bold tracking-tight text-slate-800">Agents</h1>

                    </div>
                    <div class="align-middleinline-block min-w-full overflow-auto ">
                        <table class="min-w-full">
                            <thead>
                            <tr>
                                <th class="px-6 py-2 border-y-2 border-slate-200 bg-slate-100 text-left text-sm leading-4 font-bold text-slate-500 uppercase tracking-wider">
                                    UID/OS
                                </th>
                                <th class="px-6 py-2 border-y-2 border-slate-200 bg-slate-100 text-left text-sm leading-4 font-bold text-slate-500 uppercase tracking-wider">
                                    Username/Hostname
                                </th>
                                <th class="px-6 py-2 border-y-2 border-slate-200 bg-slate-100 text-left text-sm leading-4 font-bold text-slate-500 uppercase tracking-wider">
                                    ProcName/PID
                                </th>
                                <th class="px-6 py-2 border-y-2 border-slate-200 bg-slate-100 text-left text-sm leading-4 font-bold text-slate-500 uppercase tracking-wider">
                                    Interaction/Status
                                </th>
                                <th class="px-6 py-2 border-y-2 border-slate-200 bg-slate-100 text-left text-sm leading-4 font-bold text-slate-500 uppercase tracking-wider">
                                    RAM/VM
                                </th>
                                <th class="px-6 py-2 border-y-2 border-slate-200 bg-slate-100 text-left text-sm leading-4 font-bold text-slate-500 uppercase tracking-wider">
                                    Public / Local IP
                                </th>
                                <th class="px-6 py-2 border-y-2 border-slate-200 bg-slate-100 text-left text-sm leading-4 font-bold text-slate-500 uppercase tracking-wider">
                                    System Language
                                </th>

                                <th class="px-6 py-2 border-y-2 border-slate-200 bg-slate-100 text-left text-sm leading-4 font-bold text-slate-500 uppercase tracking-wider"></th>
                            </tr>
                            </thead>
                            <tbody class="bg-white">
                                {clients()}
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </>
        )
    }   