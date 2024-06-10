import Navbar from "@/components/Navbar";

export default async function Home() {
  const data = {
    clerkId: "clerk_1",
    username: "user_1",
    email: "email_1",
  };

  const response = await fetch(
    "http://localhost:8000/api/users", // Change from https to http
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
    <div>
      <Navbar />
    </div>
  );
}