"use client";

import { UserButton } from "@clerk/nextjs";
import { FaCog } from "react-icons/fa";
import { ModeToggle } from "./ModeToggle";
import { Transition } from "@headlessui/react";
import { Hint } from "./Hint";

interface SidebarBottomItemProps {
  isOpen: boolean;
}

const SidebarBottomItem = ({
  isOpen
}:{
  isOpen: boolean
}) => {
  return (
    <div>
      <Hint label="Toggle" side="right" align="center">
      <div className="ml-6 mb-4 flex items-center cursor-pointer">
        <ModeToggle isOpen={isOpen} />
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
          ></Transition>
        )}
      </div>
      </Hint>
      <Hint label="Settings" side="right" align="center">
      <div className="ml-6 mb-4 flex items-center cursor-pointer">
        <FaCog className="w-8 h-6" />
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
            <span className="ml-4 pl-1">Settings</span>
          </Transition>
        )}
      </div>
      </Hint>
      <Hint label="Profile" side="right" align="center">
      <div className="ml-6 mb-4 flex items-center cursor-pointer">
        <div className="px-1"><UserButton afterSignOutUrl="/" /></div>
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
            <span className="ml-4">Profile</span>
          </Transition>
        )}
      </div>
      </Hint>
    </div>
  );
};

export default SidebarBottomItem;
