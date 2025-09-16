"use client";
import { useEffect, useState } from "react";
import {
  Search,
  LayoutDashboard,
  BellPlus,
  Scan,
  Settings,
} from "lucide-react";
import Darkmode from "@/app/(public)/components/navbar/Darkmode";

export default function DashboardNavbar() {
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]); // all users from API
  const [searchTerm, setSearchTerm] = useState(""); // input state
  const [filteredUsers, setFilteredUsers] = useState([]); // results

  // Get logged in user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Fetch all users (for searching)
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/users");
      const data = await res.json();
      setAllUsers(data);
    };
    fetchUsers();
  }, []);

  // Filter users when typing
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers([]);
    } else {
      const results = allUsers.filter((u) =>
        `${u.fName} ${u.lName}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(results);
    }
  }, [searchTerm, allUsers]);

  return (
    <div className="flex-1 px-6 py-2 h-14 relative">
      <div className="flex items-center justify-between">
        {/* 🔍 Search */}
        <div className="flex items-center px-3 py-2 gap-2 w-1/2 rounded-lg border border-gray-300 relative">
          <input
            placeholder="Search Here"
            className="flex-1 outline-none border-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search cursor={"pointer"} />
        </div>

        {/* 🔔 Right Side */}
        <div className="flex items-center gap-5 cursor-pointer">
          <LayoutDashboard className="transition-transform duration-700 hover:rotate-[360deg]" />
          <Scan className="transition-transform duration-700 hover:rotate-[360deg]" />
          <BellPlus className="transition-transform duration-700 hover:rotate-[360deg]" />

          {/* ✅ Logged In User Info */}
          {user && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img
                  src={user.profileImg || "/default-avatar.png"}
                  alt={user.fName}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div>
                <h2 className="font-semibold text-sm">
                  {user.fName.toUpperCase()}
                </h2>
                <p className="text-gray-500 font-semibold text-sm italic">
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </p>
              </div>
            </div>
          )}

          <Settings className="transition-transform duration-700 hover:rotate-[360deg]" />
          <Darkmode />
        </div>
      </div>

      {/* 🔽 Dropdown for Search Results */}
      {filteredUsers.length > 0 && (
        <div className="absolute top-14 left-6 w-1/2 dark:bg-black border border-gray-200 bg-white rounded-lg shadow-lg z-50">
          {filteredUsers.map((u) => (
            <div
              key={u._id}
              className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700   cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img
                  src={u.profileImg || "/default-avatar.png"}
                  alt={u.fName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-sm dark:text-white">{`${u.fName} ${u.lName}`}</p>
                <p className="text-xs text-gray-400">{u.role}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
