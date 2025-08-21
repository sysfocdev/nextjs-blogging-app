"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
  const [email, seteEmail] = useState("");
  const [password, setPassword] = useState("");
  const router= useRouter()

  const formHandler = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Inputs are empty");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must contain at least 8 characters");
      return;
    }
    toast.success("Login Successful");
    router.push("/")
  };

  return (
    <section className="mt-10 px-4 md:px-10 w-full pb-10 flex items-center justify-center">
    
      <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[40%] border border-gray-200 rounded-xl p-6 md:p-10">
        <h1 className="text-center font-bold text-2xl md:text-3xl mb-4">
          Login Page
        </h1>

        <form onSubmit={formHandler} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => seteEmail(e.target.value)}
            value={email}
            className="w-full px-4 py-3 text-base md:text-lg rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FE4F70] to-[#FFA387]"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full px-4 py-3 text-base md:text-lg rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FE4F70] to-[#FFA387]"
          />
          <button
            type="submit"
            className="py-2 cursor-pointer md:py-3 rounded-md bg-gradient-to-r from-[#FE4F70] to-[#FFA387] text-white font-semibold text-base md:text-lg"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
}
