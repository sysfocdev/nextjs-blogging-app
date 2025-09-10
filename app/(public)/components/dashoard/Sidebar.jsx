"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  ChartBar,
  LogOut,
  UserPlus,
  FilePlus2,
} from "lucide-react";
import toast from "react-hot-toast";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Blogs", href: "/dashboard/blogs", icon: <FileText size={20} /> },
    { name: "Add Blog", href: "/dashboard/blogs/new", icon: <FilePlus2 size={20} /> },
    { name: "Users", href: "/dashboard/users", icon: <Users size={20} /> },
    { name: "Add User", href: "/dashboard/signup", icon: <UserPlus size={20} /> },
    { name: "Charts", href: "/dashboard/charts", icon: <ChartBar size={20} /> },
    { name: "Settings", href: "/dashboard", icon: <Settings size={20} /> },
    // Logout will be handled separately
  ];

  const handleLogout = () => {
    setShowLogoutConfirm(false);

    
    toast.success("Logged out successfully!");
    router.push("/login");
  };

  return (
    <>
      <aside className="h-screen   w-64 bg-[#111C43] text-white flex flex-col hidden md:block">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          Blog Admin
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition 
                  ${pathname === item.href ? "bg-gray-700" : "hover:bg-gray-800"}`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}

            {/* Logout item with popup */}
            <li>
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer  transition hover:bg-gray-800 w-full text-left"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

     
      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg w-[60%]">
            <h2 className="text-lg font-bold mb-4">Confirm Logout</h2>
            <p className="mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 cursor-pointer py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 cursor-pointer rounded bg-red-600 text-white hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
