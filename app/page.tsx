import ConversationSection from "@/components/ConversationSection";
import {InputSection} from "@/components/InputSection";
import Sidebar from "@/components/Sidebar";

export default async function Home() {
  const data = {
    clerkId: "clerk_1",
    username: "user_1",
    email: "email_1",
  };

  const response = await fetch(
    "http://localhost:8000/api/users", 
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
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
