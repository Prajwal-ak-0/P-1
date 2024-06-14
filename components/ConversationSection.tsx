"use client";

import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { SendHorizontal } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import Navbar from "./Navbar";
import Image from "next/image";

export type Message = {
  role: "USER" | "BOT";
  content: string;
};

const ConversationSection: React.FC = () => {
  const [isClient, setIsClient] = useState<boolean>(false);
  const { user } = useUser();
  const [input, setInput] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current && lastMessageRef.current) {
      const messagesContainer = messagesContainerRef.current;
      const lastMessage = lastMessageRef.current;
      const offset = lastMessage.offsetTop - messagesContainer.offsetTop;
      messagesContainer.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      scrollToBottom();
    });
  }, [chatMessages]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage: Message = { role: "USER", content: input.trim() };
      setChatMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput("");
      setIsLoading(true);

      try {
        const response = await fetch(
          `http://localhost:8000/api/query`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              clerkId: user?.id ?? "",
              query: input.trim(),
              results: "",
            }),
          }
        );
        const data = await response.json();

        if (data.results) {
          const botMessage: Message = { role: "BOT", content: data.results };
          setChatMessages((prevMessages) => [...prevMessages, botMessage]);
        }
      } catch (error) {
        console.error("Error fetching bot response:", error);
      }

      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 relative overflow-hidden">
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-700"></div>
          </div>
        )}
        <div
          className="absolute my-28 inset-0 flex flex-col p-4 overflow-y-auto"
          ref={messagesContainerRef}
        >
          {chatMessages.map((message, index) => (
            <div
              key={index}
              ref={index === chatMessages.length - 1 ? lastMessageRef : null}
              className={`flex items-start gap-x-4 mb-4 p-4 md:mx-28 ${
                message.role === "USER"
                  ? " bg-emerald-50 border border-black/10"
                  : "bg-purple-100"
              } rounded-lg`}
            >
              <Image
                src={message.role === "USER" ? "/user.png" : "/bot.png"}
                alt={message.role === "USER" ? "User" : "Bot"}
                className="w-10 h-10 rounded-full"
              />
              <p className="text-md font-normal">{message.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConversationSection;
