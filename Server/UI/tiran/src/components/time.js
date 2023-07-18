
function calcDifference(datetime){
    var now = new Date()
    

    var start = new Date(datetime)
    var end = new Date(now)

    var calc = end.getTime() - start.getTime()

    return `${calc}`
    // return calc
}

export default function TimeComponent( {timesincelastint} ) {

    if (calcDifference(timesincelastint) < 6000){
     return (
        <div className="mt-1 flex items-center gap-x-1.5">
            <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </div>
            <p className="text-xs leading-5 text-gray-500">Online</p>
        </div>
        )
    } else { // Agent is online
        return (
            <div className="mt-1 flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-gray-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-500" />
                </div>
                <p className="text-xs leading-5 text-gray-500"> Offline</p>
            </div>

            // <span class="inline-flex items-center rounded-md bg-green-200 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-500/20">
                
            // </span>
        )
    }
}