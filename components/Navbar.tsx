"use client";

import { UserButton, useUser } from "@clerk/clerk-react";
import Logo from "./Logo";
import { ModeToggle } from "./ModeToggle";

const Navbar = () => {
  return (
    <div className="fixed top-0 w-full sm:py-2 py-1 sm:px-8 px-4 shadow-md z-10">
      <div className="flex justify-between">
        <Logo />
        <div className="flex">
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
