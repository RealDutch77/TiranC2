import { Fragment, useRef, useState } from "react";


import { Dialog, Transition } from "@headlessui/react";
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import {
  ExclamationCircleIcon ,
  XMarkIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}


export default function ShellModal({ path, fileex }) {
  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);

  const checkfile =  ( fileex ) => {
    if (fileex === ".jpg" || fileex === ".JPG" || fileex === ".png" || fileex === ".PNG" || fileex === ".jpeg" || fileex === ".JPEG") {
      return (
          <button onClick={() => setOpen(true)} class="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-l border-l border-t border-b border-green-700">
            <EyeIcon className="h-6 w-6 text-black-900" /> View
          </button>
      )
    } else {
      return (
        <button onClick={() => setOpen(true)} class="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-400 text-sm font-medium rounded-l border-l border-t border-b border-slate-300">
          <ExclamationCircleIcon   className="h-6 w-6 text-black-900" /> View
        </button>
      )
    }
    
    // const string1 = file
    // console.log(file)
    // if (file = "gashduigh.jpg") {
    //   return (
    //     <button onClick={() => setOpen(true)} class="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-l">
    //       <EyeIcon className="h-6 w-6 text-black-900" /> View
    //     </button>
    //   ) 
    // } else {
    //   return (
    //     <button onClick={() => setOpen(true)} class="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-l">
    //       <EyeIcon className="h-6 w-6 text-black-900" /> View
    //     </button>
    //   )
    // }
  }
  return (
    <>
    {checkfile( fileex )}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                

                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all  sm:h-sm  sm:max-w-fit">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      {/* Offline online icon left side */}
                      <div className="mx-auto flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10">
                        {/* <PhotoIcon  className="h-8 w-8 text-gray-500" /> */}
                        <button onClick={() => setOpen(false)}>
                          <XMarkIcon  className="h-8 w-8 text-gray-500" />
                        </button>
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <div className="flex flex-col space-y-2">
                          <Dialog.Title
                            as="h3"
                            className="text-base font-semibold leading-6 text-gray-900"
                          >
                            <div class="flex flex-center">

                              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                                File: {path}
                              </h1>

                            </div>


                          </Dialog.Title>
                          {/* Terminal screen */}
                          <div className="bg-contain bg-gray-50 overflow-auto dark:border-gray-300 rounded-lg border border-gray-900 py-1 px-1">
                            <img src={path} class="p-4 rounded:md"></img>
                            {/* <p>{path}</p> */}
                            {/* <Text Filename={path}></Text> */}
                          </div>
                          {/* Input and send command button */}
                          
                        </div>
                      </div>
                    </div>
                  </div>

                  
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
