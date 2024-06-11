"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaCog, FaPlus } from "react-icons/fa";
import { Transition } from "@headlessui/react";
import PlaygroundPage from "@/components/playground/home";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./ModeToggle";
import SidebarBottomItem from "./SidebarBottomItem";
import { Hint } from "./Hint";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isButtonOpen, setIsButtonOpen] = useState(true);
  const [renderContent, setRenderContent] = useState(true);

  const toggleSidebar = () => {
    if (isOpen) {
      setIsOpen(false);
      setTimeout(() => setRenderContent(false), 300); // Delay unmounting content
      setIsButtonOpen(false);
    } else {
      setIsOpen(true);
      setRenderContent(true); // Render content immediately when opening
      setTimeout(() => setIsButtonOpen(true), 300); // Delay button animation
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setRenderContent(false);
    }
  }, [isOpen]);

  return (
    <div className="flex fixed h-screen bg-gray-100 w-full">
      <div
        className={`relative bg-black text-white h-full transition-all duration-300 ease-in-out ${
          isOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="flex items-center justify-center py-4">
              <div className="flex items-center space-x-1">
                <Transition
                  show={isOpen}
                  enter="transition-opacity duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  as="div"
                >
                  <div className="flex">
                    <Image src="/logo.svg" width={40} height={40} alt="Logo" />
                    <span className="text-lg px-4 font-semibold whitespace-nowrap">
                      RAG-GPT
                    </span>
                  </div>
                </Transition>
              </div>
              <button
                onClick={toggleSidebar}
                className="text-gray-300 hover:text-white focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"
                    }
                  />
                </svg>
              </button>
            </div>
            <Hint label="New" side="right" align="center">
            <div className="ml-4 mt-6 mb-4">
              <Button className="justify-start h-10 px-3 rounded-xl py-1 bg hover:bg-white/90">
                <FaPlus className="w-4 h-4" />
                {isButtonOpen && (
                  <Transition
                    show={isOpen}
                    enter="transition-opacity duration-300 delay-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    as="div"
                  >
                    <span className="ml-2">Create new chat</span>
                  </Transition>
                )}
              </Button>
            </div>
            </Hint>
            {isOpen && (
              <Transition
                show={isOpen}
                enter="transition-opacity duration-300 delay-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                as="div"
              >
                <div className="ml-4 mt-4 text-lg">History</div>
              </Transition>
            )}
          </div>
          <div className="pl-1">
            <SidebarBottomItem isOpen={isOpen} />
          </div>
        </div>
      </div>
      <div className="flex-grow p-4 h-full w-full">
        <PlaygroundPage />
      </div>
    </div>
  );
}
