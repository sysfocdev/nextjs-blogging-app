"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { setCookie } from "cookies-next"; // ✅ yeh import karo

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const formHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Inputs are empty");
      return;
    }

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials:"include"
    });

    const data = await res.json();

    if (data.success) {
      // ✅ Cookie set karo
      setCookie("auth", JSON.stringify(data.user), {
        maxAge: 60 * 60 * 24, // 1 din
      });
      localStorage.setItem("user", JSON.stringify(data.user)); 
      toast.success("Login Successful");
      router.push("/dashboard/blogs");
    } else {
      toast.error(data.message);
    }
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
            placeholder="E-Mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full px-4 py-3 rounded-lg border"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full px-4 py-3 rounded-lg border"
          />
          <button
            type="submit"
            className="py-2 cursor-pointer rounded-md bg-gradient-to-r from-[#FE4F70] to-[#FFA387] text-white font-semibold text-base"
          >
            Login
          </button>
        </form>

        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="w-10 h-10 rounded-full">
            <Image
              src="/google.jpg"
              width={500}
              height={500}
              alt="google"
              className="w-[100%] h-[100%] object-cover rounded-full"
            />
          </div>
          <Link href="https://www.google.com" target="blank">
            Login with <strong>Google</strong>
          </Link>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1">
            <input type="checkbox" className="accent-accent" />
            <label>Remember Me</label>
          </div>
          <div>
            <p>
              <Link href="/" className="text-blue-600">
                Forgot Password
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
