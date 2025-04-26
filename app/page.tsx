import AuthButton from "@/components/AuthButton";
import Image from "next/image";

export default function Home() {
  return (
<div className="min-h-screen flex flex-col justify-center items-center p-6">
      <h1 className="text-3xl font-bold mb-8">Welcome to TeamWisp</h1>
      <div className="flex space-x-6">
        <AuthButton label="Sign Up" route="/signup" />
        <AuthButton label="Login" route="/login" />
      </div>
    </div>
  );
}
