"use client"
import { useState } from "react";
import DialogModule from "./DialogModule";

function CreateButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
    <button className="p-[3px] relative">
     <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
     <div onClick={() => setIsOpen(true)} className="px-8 py-2  bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
      Start a Stream as Creator
     </div>
    </button>
    <DialogModule isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}

export default CreateButton;