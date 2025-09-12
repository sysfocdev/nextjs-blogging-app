"use client";
import { useEffect, useState } from "react";
import {
  Search,
  LayoutDashboard,
  BellPlus,
  Scan,
  Settings,
} from "lucide-react";
import Image from "next/image";
import Darkmode from "@/app/(public)/components/navbar/Darkmode";

export default function DashboardNavbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <div className="flex-1 px-6 py-2 h-12">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex items-center px-3 py-2 gap-2 w-1/2 rounded-lg border border-gray-300">
          <input
            placeholder="Search Here"
            className="flex-1 outline-none border-none"
          />
          <Search cursor={"pointer"} />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-5 cursor-pointer">
          <div className="w-8 h-8 rounded-xl">
            <Image
              src="/flag.png"
              width={100}
              height={100}
              alt="flag"
              className="w-[100%] h-[100%] rounded-xl object-fill cursor-pointer"
            />
          </div>
          <LayoutDashboard className="transition-transform duration-700 hover:rotate-[360deg]" />
          <Scan className="transition-transform duration-700 hover:rotate-[360deg]" />
          <BellPlus className="transition-transform duration-700 hover:rotate-[360deg]" />

          {/* ✅ Logged In User Info */}
          {user && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src={user.profileImg || "/default-avatar.png"}
                  width={1200}
                  height={800}
                  alt={user.fName}
                  className="w-[100%] h-[100%] rounded-full object-cover"
                />
              </div>
              <div>
                <h2 className="font-semibold text-sm">{user.fName}</h2>
                <p className="text-gray-500 text-sm italic">{user.role}</p>
              </div>
            </div>
          )}

          <Settings className="transition-transform duration-700 hover:rotate-[360deg]" />
          <Darkmode />
        </div>
      </div>
    </div>
  );
}
