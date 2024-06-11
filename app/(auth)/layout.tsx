import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Logo from "@/components/Logo";
import AuthLandingPage from "@/components/AuthLandingPage";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed">
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        {/* LEFT SIDE */}
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <div className="flex items-center p-2 cursor-pointer dark:">
              <Image
                width={105}
                height={75}
                src="/logo-white.png"
                alt="Logo"
              />
            </div>
          </div>

          {/* CONTENT */}
          <AuthLandingPage />
        </div>

        {/* RIGHT SIDE - AUTHENTICATION FORM */}
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default layout;
