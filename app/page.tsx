"use client"

import ConversationSection from "@/components/ConversationSection";
import { InputSection } from "@/components/InputSection";
import Sidebar from "@/components/Sidebar";
import { useUser } from "@clerk/nextjs";
import { useCallback, useEffect } from "react";
import SignInPage from "./(auth)/sign-in/[[...sign-in]]/page";

export default function Home() {
  const { user, isSignedIn } = useUser();

  const createUser = useCallback(async () => {
    const data = {
      clerkId: user?.id,
      username: (user?.firstName + "-" + user?.lastName)
        .replace(/\s+/g, "")
        .toLowerCase(),
      email: user?.primaryEmailAddress?.emailAddress,
    };

    const response = await fetch("http://localhost:8000/api/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("User created successfully");
    } else {
      const errorData = await response.json();
      console.error("Failed to create user:", errorData);
    }
  }, [user]);

  useEffect(() => {
    if (isSignedIn) {
      createUser();
    }
  }, [isSignedIn, createUser]);

  if (!isSignedIn) {
    return <SignInPage />;
  }

  return (
    <div className="text-white flex">
      <Sidebar />
      <div className="ml-64 px-10 py-8  flex flex-col justify-around h-screen w-full">
        <div className="flex-grow">
          <ConversationSection />
        </div>
        <div className="px-20">
          <InputSection />
        </div>
      </div>
    </div>
  );
}
