// ✅ Sidebar.jsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  FileText,
  Users,
  ChartBar,
  LogOut,
  FileSpreadsheet
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role) {
      setUserRole(user.role);
    }
  }, []);

  const menuItems = [
    { name: "Dashboard", href: "/dashboard/blogs", icon: <LayoutDashboard size={20} /> },
    { name: "Blogs", href: "/dashboard", icon:  <FileText size={20} /> },
    
    { name: "Users", href: "/dashboard/users", icon: <Users size={20} /> },
    { name: "Charts", href: "/dashboard/charts", icon: <ChartBar size={20} /> },

  ];

  const handleLogout = async () => {
    if (confirm("Are you sure you want to log out?")) {
      await fetch("/api/auth/logout", { method: "POST" });
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
      router.push("/login");
    }
  };

  return (
    <aside className="h-screen w-64 bg-[#011F5B] text-white flex flex-col">
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
          {userRole ==="admin" &&(
            <li >
            <Link
              href={"/dashboard/showCategories"}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition 
              ${pathname === "dashboard/showCategories" ? "bg-gray-700" : "hover:bg-gray-800"}`}
            >
              <FileSpreadsheet size={20} />
              <span>Categories</span>
            </Link>
          </li>
          )}
           {userRole ==="admin" &&(
            <li >
            <Link
              href={"/dashboard/addSubcategory"}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition 
              ${pathname === "dashboard/showCategories" ? "bg-gray-700" : "hover:bg-gray-800"}`}
            >
              <FileSpreadsheet size={20} />
              <span>Add Subcategory</span>
            </Link>
          </li>
          )}

          {userRole ==="admin" &&(
            <li >
            <Link
              href="/dashboard/subcategories"
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition 
              ${ pathname === "/dashboard/subcategories" ? "bg-gray-700" : "hover:bg-gray-800"}`}
            >
              <FileSpreadsheet size={20} />
              <span>All Sub Categories</span>
            </Link>
          </li>
          )}

          

          {/* ✅ Simple Logout */}
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition hover:bg-gray-800 w-full text-left"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
