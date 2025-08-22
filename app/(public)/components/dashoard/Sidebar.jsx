
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Users, Settings } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Blogs", href: "/dashboard/blogs", icon: <FileText size={20} /> },
    { name: "Users", href: "/dashboard/users", icon: <Users size={20} /> },
    { name: "Settings", href: "/dashboard/users", icon: <Settings size={20} /> },
  ];

  return (
    <aside className="h-screen w-64 bg-[#111C43] text-white flex flex-col hidden md:block">
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
        </ul>
      </nav>
    </aside>
  );
}
