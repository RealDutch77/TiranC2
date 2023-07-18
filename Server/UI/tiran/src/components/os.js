import { ComputerDesktopIcon } from "@heroicons/react/24/solid";

export default function OperatingSystem( {os, size} ){
    switch (os) {
        case "windows":
            return (
                <img class={size}   src="https://upload.wikimedia.org/wikipedia/commons/3/34/Windows_logo_-_2012_derivative.svg" alt={os} />
            )
        case "darwin":
            return (
                <img class={size} src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt={os} />
            )
        default:
            return (
                <img class={size} src="https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg" alt={os} />
            )
    }
}