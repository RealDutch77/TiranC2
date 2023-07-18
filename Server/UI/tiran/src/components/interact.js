import React, {useState} from "react";
import { Host } from "./host";

export default function sendCommand( {uid, command}){ 
    const todo = { command };
    const response = fetch(`${Host}/command/add/${uid}`, {
        method: "POST",
        headers: {
        'Content-Type' : 'application/json'
        },
        body: JSON.stringify(todo)
     })

     response.then((resp) => {
        console.log(resp["ok"])


     })

}