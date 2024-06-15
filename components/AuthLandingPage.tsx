"use client";

import React, { useEffect, useMemo, useState } from "react";

const AuthLandingPage = () => {
  const features = useMemo(
    () => [
      "Summarize lengthy documents quickly.",
      "Ask questions and get answers instantly.",
      "Save time and enhance productivity.",
    ],
    []
  );
  const [isCursorVisible, setIsCursorVisible] = useState(true);

  const typingDelay = 30;
  const erasingDelay = 30;
  const newTextDelay = 2000;
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(typingDelay);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const handleTyping = () => {
      setText((currentText) =>
        features[loopNum].substring(0, currentText.length + 1)
      );
      setTypingSpeed(typingDelay);
    };

    const handleErasing = () => {
      setText((currentText) =>
        features[loopNum].substring(0, currentText.length - 1)
      );
      setTypingSpeed(erasingDelay);
    };

    if (isTyping) {
      timer = setTimeout(handleTyping, typingSpeed);
    } else {
      timer = setTimeout(handleErasing, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [text, isTyping, loopNum, typingSpeed, features]);

  useEffect(() => {
    const handleSwitch = () => {
      setIsTyping(true);
      setLoopNum((prevLoopNum) => (prevLoopNum + 1) % features.length);
    };

    if (!isTyping && text === "") {
      setTimeout(handleSwitch, newTextDelay);
    } else if (isTyping && text === features[loopNum]) {
      setTimeout(() => setIsTyping(false), newTextDelay);
    }

    const interval = setInterval(() => {
      setIsCursorVisible((prevIsCursorVisible) => !prevIsCursorVisible);
    }, 500);
    return () => clearInterval(interval);
  }, [isTyping, text, loopNum, newTextDelay, features]);
  return (
    <div className="relative z-20 mt-32 space-y-4 text-center">
      <h2 className="text-4xl font-bold">Welcome to RAG-GPT</h2>
      <p className="text-lg">
        The ultimate document summarizer and Q&A platform. Upload your
        documents, get concise summaries, and ask any questions you have about
        the content.
      </p>
      <h2 className="text-3xl pt-12 font-bold">Features</h2>
      <p className="text-lg">
        {text}
        <span
          className={isCursorVisible ? "inline font-light bg-[#C4CFDE]" : "hidden bg-[#C4CFDE]"}>
          |
        </span>
      </p>
    </div>
  );
};

export default AuthLandingPage;
