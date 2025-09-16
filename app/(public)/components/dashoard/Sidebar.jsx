"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  ChartBar,
  LogOut,
  UserPlus,
  FilePlus2,
  ChartColumnStacked,
} from "lucide-react";
import { deleteCookie } from "cookies-next";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // ✅ Get role from localStorage (or JWT/cookie depending on your auth system)
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role) {
      setUserRole(user.role);
    }
  }, []);

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Blogs", href: "/dashboard/blogs", icon: <FileText size={20} /> },
    { name: "Add Blog", href: "/dashboard/blogs/new", icon: <FilePlus2 size={20} /> },
    { name: "Users", href: "/dashboard/users", icon: <Users size={20} /> },
    { name: "Charts", href: "/dashboard/charts", icon: <ChartBar size={20} /> },
    
  ];

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <>
      <aside className="h-screen w-64 bg-[#111C43] text-white flex flex-col">
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

            {/* ✅ Only Admin can see Add User */}
            {userRole === "admin" && (
              <li>
                <Link
                  href="/dashboard/signup"
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition 
                  ${pathname === "/dashboard/signup" ? "bg-gray-700" : "hover:bg-gray-800"}`}
                >
                  <UserPlus size={20} />
                  <span>Add User</span>
                </Link>
              </li>
            )}
             {userRole === "admin" && (
              <li>
                <Link
                  href="/dashboard/categories"
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition 
                  ${pathname === "/dashboard/signup" ? "bg-gray-700" : "hover:bg-gray-800"}`}
                >
                 <ChartColumnStacked size={20} />
                  <span>Categories</span>
                </Link>
              </li>
            )}

            {/* Logout item */}
            <li>
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition hover:bg-gray-800 w-full text-left"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Logout confirmation modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[100000]">
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
