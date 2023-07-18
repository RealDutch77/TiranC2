
import { DocumentArrowDownIcon  } from "@heroicons/react/24/outline";

import { useState, useEffect } from "react";
import { Agentloot } from "../components/host";
import LootControl from "../components/loot/lootControl";

export default function Loot() {

    const [loot, setLoot] = useState([]);
    // // Function to collect data
    // const countUID
    const getApiData = async () => {
        const response = await fetch(
            Agentloot
          ).then((response) => response.json());
            const data = JSON.parse(response) 
            setLoot(data.filename);
        };
  
        useEffect(() => {
            const interval = setInterval(() => {
                getApiData();
            }, 5000) 
    
        }, []);

    const DataTable = () => {
        return (
            loot.map( (loot) => (
                <tr>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div class="text-sm leading-5 text-gray-900 flex"> {loot.uid}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div class="text-sm leading-5 text-gray-900 flex">{loot.created}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div class="text-sm leading-5 text-gray-900 flex"> {loot.modified}</div>
                    </td>

                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div class="text-sm leading-5 text-gray-900 flex"> {loot.filename}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div class="text-sm leading-5 text-gray-900 flex"> {process.env.PUBLIC_URL + "/loot/" + loot.fullpath}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 flex flex-center p-2">
                            <LootControl fileex={loot.filename.substr(loot.filename.indexOf("."))} path={process.env.PUBLIC_URL + "/loot/" + loot.fullpath}></LootControl>
                            <a href={process.env.PUBLIC_URL + "/loot/" + loot.fullpath} download={loot.filename} class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-r border-r border-t border-b border-2 border-blue-700">

                            <DocumentArrowDownIcon class="h-5 w-5 mr-2 "></DocumentArrowDownIcon>

                            Download


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
                    <h1 className="text-3xl font-bold tracking-tight text-slate-800">Loot</h1>
                    
                </div>
            </header>
            <div class="mx-auto sm:px-6 lg:px-8">
                <div class="bg-slate-50 border border-slate-200">
                    <div class="py-3 px-6 flex items-center">
                        <h1 className="text-xl font-bold tracking-tight text-slate-800">Loot</h1>

                    </div>
                    <div class="align-middleinline-block min-w-full overflow-auto ">
                        <table class="min-w-full">
                            <thead>
                                <tr>
                                    <th class="px-6 py-2 border-y-2 border-slate-200 bg-slate-100 text-left text-sm leading-4 font-bold text-slate-500 uppercase tracking-wider">
                                        UID
                                    </th>
                                    <th class="px-6 py-2 border-y-2 border-slate-200 bg-slate-100 text-left text-sm leading-4 font-bold text-slate-500 uppercase tracking-wider">
                                        Time.Created
                                    </th>
                                    <th class="px-6 py-2 border-y-2 border-slate-200 bg-slate-100 text-left text-sm leading-4 font-bold text-slate-500 uppercase tracking-wider">
                                        Time.modified
                                    </th>

                                    <th class="px-6 py-2 border-y-2 border-slate-200 bg-slate-100 text-left text-sm leading-4 font-bold text-slate-500 uppercase tracking-wider">
                                        Filename
                                    </th>
                                    <th class="px-6 py-2 border-y-2 border-slate-200 bg-slate-100 text-left text-sm leading-4 font-bold text-slate-500 uppercase tracking-wider">
                                        Fullpath
                                    </th>
                                    <th class="px-6 py-2 border-y-2 border-slate-200 bg-slate-100 text-left text-sm leading-4 font-bold text-slate-500 uppercase tracking-wider">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white">
                                {DataTable()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
        </>
    )
}