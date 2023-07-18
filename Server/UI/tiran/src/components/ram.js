import {CheckBadgeIcon  , ExclamationTriangleIcon   } from "@heroicons/react/24/solid";

export default function Ram( {ram} ) {
    if (ram < 2900) { //Ram is under 4gb, means its an VM! (or the hardware is atleast modified)
        return (
            <div class="mt-1 flex items-center gap-x-1.5">
                <div class="flex-none">
                    <ExclamationTriangleIcon className="h-4 w-4 text-yellow-500" />
                </div>
                <p class="text-leading-5 text-yellow-500"> 
                 Virtual Machine
                 </p>
            </div>



        )
    } else {
        return (
            <div class="mt-1 flex items-center gap-x-1.5">
                <div class="flex-none">
                    <CheckBadgeIcon  className="h-4 w-4 text-green-500" />
                </div>
                <p class="text-leading-5 text-green-500"> 
                  Safe
                 </p>
            </div>

            
        )
    }
}

