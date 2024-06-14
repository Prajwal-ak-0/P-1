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
import ModelParam from "./ModelParam";
import { BiAddToQueue } from "react-icons/bi";

export default function Sidebar() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="flex fixed h-screen bg-gray-100 w-64">
      <div className="relative bg-black text-white h-full transition-all duration-300 ease-in-out">
        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col">
            <div className="flex pl-6 pt-6 pb-2">
              <div className="flex pr-6">
                <Image src="/logo.svg" width={40} height={40} alt="Logo" />
                <span className="text-lg px-4 font-semibold">RAG-GPT</span>
              </div>
              <div className="h-full">
                <Hint label="New" side="right" align="center">
                  <BiAddToQueue size={25} />
                </Hint>
              </div>
            </div>
            <ModelParam/>
          </div>
          <div className="pl-1">
            <SidebarBottomItem />
          </div>
        </div>
      </div>
    </div>
  );
}
