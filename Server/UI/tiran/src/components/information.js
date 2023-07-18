import OperatingSystem from "./os"
import Ram from "./ram";

import { TagIcon, CodeBracketIcon, CpuChipIcon, LanguageIcon, WifiIcon      } from "@heroicons/react/24/solid";

export default function Information( {keyword, data, data2}){
    switch (keyword) {
        case "osuid":
            return (
                <div className="cursor-pointer group relative flex items-center gap-x-6 rounded-lg py-2 px-2 text-sm">
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-slate-200 ">
                        <OperatingSystem os={data2} size="w-6 h-6"></OperatingSystem>
                    </div>
                    <div className="flex-auto">
                        <a  className="block font-semibold text-gray-900">
                            #{data}
                            <span className="absolute inset-0" />
                        </a>
                        <p className=" text-gray-600">{data2}</p>
                    </div>
                </div>
            )
        case "userhost":
            return (
                <div className="cursor-pointer group relative flex items-center gap-x-6 rounded-lg py-2 px-2 text-sm">
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-slate-200 ">
                        <TagIcon className="h-6 w-6 text-gray-500" />
                    </div>
                    <div className="flex-auto">
                        <a  className="block font-semibold text-gray-900">
                            {data}
                            <span className="absolute inset-0" />
                        </a>
                        <p className=" text-gray-600">{data2}</p>
                    </div>
                </div>
            )
        
        case "procpid":
            return (
                <div className="cursor-pointer group relative flex items-center gap-x-6 rounded-lg py-2 px-2 text-sm">
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-slate-200 ">
                        <CodeBracketIcon  className="h-6 w-6 text-sky-500" />
                    </div>
                    <div className="flex-auto">
                        <a  className="block font-semibold text-gray-900">
                            {data}
                            <span className="absolute inset-0" />
                        </a>
                        <p className=" text-gray-600">{data2}</p>
                    </div>
                </div>                
            )
        
    

        case "ramvm":
            return (
                <div className="cursor-pointer group relative flex items-center gap-x-6 rounded-lg py-2 px-2 text-sm">
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-slate-200 ">
                        <CpuChipIcon    className="h-6 w-6 text-purple-500" />
                    </div>
                    <div className="flex-auto">
                        <a  className="block font-semibold text-gray-900">
                            {data}MB
                            <span className="absolute inset-0" />
                        </a>
                        {/* <p className=" text-gray-600">{data2}</p> */}
                        <Ram ram={data}></Ram>
                    </div>
                </div>                  
            )

        case "syslan":
            return (
                <div className="cursor-pointer group relative flex items-center gap-x-6 rounded-lg py-2 px-2 text-sm">
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-slate-200 ">
                        <LanguageIcon className="h-6 w-6 text-green-500" />
                    </div>
                    <div className="flex-auto">
                        <a  className="block font-semibold text-gray-900">
                            {data}
                            <span className="absolute inset-0" />
                        </a>
                        {/* <p className=" text-gray-600">{data2}</p>
                        <Ram ram={data}></Ram> */}
                    </div>
                </div>                     
            )

        case "ip":
            return (
                <div className="cursor-pointer group relative flex items-center gap-x-6 rounded-lg py-2 px-2 text-sm">
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-slate-200 ">
                        <WifiIcon   className="h-6 w-6 text-green-500" />
                    </div>
                    <div className="flex-auto">
                        <a  className="block font-semibold text-gray-900">
                            {data}
                            <span className="absolute inset-0" />
                        </a>
                        <p className=" text-gray-600">127.0.0.1</p>
                    </div>
                </div>  
            )
    }
}