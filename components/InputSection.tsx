"use client";

import { cn } from "@/lib/utils";
import { GrAttachment } from "react-icons/gr";
import { LuSendHorizonal } from "react-icons/lu";
import { Hint } from "./Hint";
import React, { useEffect, useRef, useState } from "react";
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

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const InputSection = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const { user } = useUser();

    const [file, setFile] = useState<File | null>(null);
    const [buttonText, setButtonText] = useState<string>("Add Pdf");

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setFile(e.target.files[0]);
        setButtonText("Upload Now");
        console.log("File selected:", e.target.files[0]); // Add this line
      }
    };

    const handleFileUpload = () => {
      if (!file) {
        console.log("No file selected");
        return;
      }

      const storageRef = firebaseRef(storage, `${file.name}`);
      uploadBytes(storageRef, file)
        .then((snapshot) => {
          console.log("Uploaded a file!", snapshot);
          return getDownloadURL(snapshot.ref);
        })
        .then((url) => {
          console.log("File available at", url);
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
      console.log("Button clicked"); // Add this line
      if (file) {
        handleFileUpload();
      } else {
        if (fileInputRef.current) {
          fileInputRef.current.click();
        }
      }
    };

    const createDocument = async (clerkId: string, link: string) => {
      if (!clerkId) {
        toast.error("User's clerkId not found");
        console.error("User's clerkId not found");
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
        console.log("Document created successfully");
      } else {
        const errorData = await response.json();
        console.error("Failed to create document:", errorData);
        toast.error("Failed to create document");
      }
    };

    useEffect(() => {
      console.log("Current file:", file);
    }, [file]);

    return (
      <div className="flex h-16 rounded-full bg-background text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 items-center justify-center outline shadow-lg">
        <input
          type={type}
          className={cn(
            "flex h-16 w-[90%] rounded-full bg-background text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 px-4 outline-none",
            className
          )}
          placeholder="Type a message..."
          ref={ref}
          {...props}
        />
        <Hint label="Upload File" side="bottom" align="center">
          <div className="px-3 cursor-pointer" onClick={handleButtonClick}>
            {file ? <FaFileUpload size={25} /> : <GrAttachment size={25} />}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
        </Hint>
        <Hint label="Submit" side="bottom" align="center">
          <div className="px-3 cursor-pointer">
            <LuSendHorizonal size={25} />
          </div>
        </Hint>
      </div>
    );
  }
);

InputSection.displayName = "InputSection";

export { InputSection };
