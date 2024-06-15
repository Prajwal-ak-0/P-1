import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref as firebaseRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { toast } from "sonner";
import { FaFileUpload } from "react-icons/fa";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { LucideSendHorizonal } from "lucide-react";
import { Hint } from "./Hint";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const firebaseConfig = {
  apiKey: process.env.Firebase_API_KEY,
  authDomain: process.env.Firebase_AUTH_DOMAIN,
  projectId: process.env.Firebase_PROJECT_ID,
  storageBucket: "rag-gpt.appspot.com",
  messagingSenderId: process.env.Firebase_MESSAGING_SENDER_ID,
  appId: process.env.Firebase_APP_ID,
  measurementId: process.env.Firebase_MEASUREMENT_ID,
};

export type Message = {
  role: "USER" | "BOT";
  content: string;
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const InputSection = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const { user } = useUser();
    console.log("User: ", user)
    const [input, setInput] = useState<string>("");
    const [chatMessages, setChatMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const messagesContainerRef = useRef<HTMLDivElement | null>(null);
    const lastMessageRef = useRef<HTMLDivElement | null>(null);

    const [file, setFile] = useState<File | null>(null);
    const [buttonText, setButtonText] = useState<string>("Add Pdf");

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setFile(e.target.files[0]);
        setButtonText("Upload Now");
      }
    };

    const handleFileUpload = () => {
      if (!file) {
        return;
      }

      const storageRef = firebaseRef(storage, `${file.name}`);
      uploadBytes(storageRef, file)
        .then((snapshot) => getDownloadURL(snapshot.ref))
        .then((url) => {
          toast.success("File uploaded successfully");
          setButtonText("Add Pdf");
          setFile(null);
          createDocument(user?.id ?? "", url);
        })
        .catch((error) => {
          console.error("Upload failed:", error);
          toast.error("Upload failed");
        });
    };

    const handleButtonClick = () => {
      if (file) {
        handleFileUpload();
      } else {
        fileInputRef.current?.click();
      }
    };

    const createDocument = async (clerkId: string, link: string) => {
      if (!clerkId) {
        toast.error("User's clerkId not found");
        return;
      }

      const response = await fetch(`http://localhost:8000/api/link`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clerkId, link }),
      });

      if (response.ok) {
        toast.success("Document created successfully");
      } else {
        const errorData = await response.json();
        console.error("Failed to create document:", errorData);
        toast.error("Failed to create document");
      }
    };

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
          const response = await fetch(`http://localhost:8000/api/query`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              clerkId: user?.id ?? "",
              query: input.trim(),
              results: "",
            }),
          });

          if (!response.ok) {
            console.error(`Error: ${response.status}`);
            return;
          }

          const data = await response.json();

          if (data.results) {
            const botMessage: Message = { role: "BOT", content: data.results };
            setChatMessages((prevMessages) => [...prevMessages, botMessage]);
          }
        } catch (error) {
          console.error("Error fetching bot response:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    return (
      <div className="flex flex-col h-full">
        <div className="flex-grow overflow-y-auto" ref={messagesContainerRef}>
          {isLoading && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-700"></div>
            </div>
          )}
          {chatMessages.map((message, index) => (
            <div
              key={index}
              ref={index === chatMessages.length - 1 ? lastMessageRef : null}
              className={`flex items-start gap-x-4 mb-4 p-4 md:mx-28 ${
                message.role === "USER"
                  ? "bg-emerald-50 border border-black/10"
                  : "bg-purple-100"
              } rounded-lg`}
            >
              <Image
                src={message.role === "USER" ? user?.imageUrl ?? "/user.png" : "/logo.png"}
                alt={message.role === "USER" ? "User" : "Bot"}
                className="w-10 h-10 rounded-full"
                width={40}
                height={40}
              />
              <p className="text-gray-800">{message.content}</p>
            </div>
          ))}
        </div>
        <div className="relative mt-8 flex-shrink-0">
          <input
            type="file"
            accept="application/pdf"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <div className="flex items-center px-4 py-2">
            <Hint label="Upload File" align="center" side="bottom">
              <button
                className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-gray-200 text-gray-600 rounded-full mr-4"
                onClick={handleButtonClick}
              >
                <FaFileUpload className="w-6 h-6" />
              </button>
            </Hint>
            <input
              className={`flex-grow px-4 py-2 md:px-8 md:py-4 border-2 border-gray-300 bg-black  rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ${className}`}
              type={type}
              {...props}
              ref={ref}
              value={input}
              onChange={handleInputChange}
              placeholder="Enter a message..."
            />
            <Hint label="Send Message" align="center" side="bottom">
              <button
                className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-purple-600 text-white rounded-full ml-4"
                onClick={handleSend}
              >
                <LucideSendHorizonal className="w-6 h-6" />
              </button>
            </Hint>
          </div>
        </div>
      </div>
    );
  }
);

InputSection.displayName = "InputSection";

export { InputSection };
