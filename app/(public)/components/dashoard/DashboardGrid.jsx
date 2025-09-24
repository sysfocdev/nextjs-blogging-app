"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardGrid() {
  const [userRole, setUserRole]= useState("")
  useEffect(()=>{
    const user= JSON.parse(localStorage.getItem("user"));
    if(user && user.role){
      setUserRole(user.role)
    }

  })
  const cards = [
   
   
    {
      title: "All Users",
      description: "Manage registered and verified users.",
      href: "/dashboard/users",
      bg: "bg-gradient-to-r from-pink-500 to-red-500",
    },
  
    {
        title: "All Blogs",
        description: "Manage All Blogs And Update & Delete.",
        href: "/dashboard",
        bg: "bg-gradient-to-r from-[#9bafd9] to-[#103783]",
      },
      {
        title: "Reach Chart",
        description: "View analytics and performance charts.",
        href: "/dashboard/charts",
        bg: "bg-gradient-to-r from-green-400 to-blue-500",
      },
      
    
     
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      

      {userRole === "admin" && (
        <Link href="/dashboard/blogs/new"
        className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-6 shadow-lg text-white hover:scale-105 transition-transform cursor-pointer">
           <h2 className="text-xl font-bold mb-2">Add Blog</h2>
           <p className="text-sm opacity-90">Add and publish a new blog post</p>
        </Link>
      )}
      {userRole==="admin" && (
        <Link href="/dashboard/signup"
        className="bg-gradient-to-r from-[#919bff] to-[#133a94] rounded-2xl p-6 shadow-lg text-white hover:scale-105 transition-transform cursor-pointer">
           <h2 className="text-xl font-bold mb-2">Add New User</h2>
           <p className="text-sm opacity-90">Add and Update a New User</p>
        </Link>
      )}
      {userRole==="admin" && (
        <Link href="/dashboard/category"
        className="bg-gradient-to-r from-[#ffb88e] to-[#ea5753] rounded-2xl p-6 shadow-lg text-white hover:scale-105 transition-transform cursor-pointer">
           <h2 className="text-xl font-bold mb-2">Add New Category</h2>
           <p className="text-sm opacity-90">Manage All Categories, Add, Update & Delete.</p>
        </Link>
      )}
      {userRole==="admin" && (
        <Link href="/dashboard/showCategories"
        className="bg-gradient-to-r from-[#ffb88e] to-[#ea5753] rounded-2xl p-6 shadow-lg text-white hover:scale-105 transition-transform cursor-pointer">
           <h2 className="text-xl font-bold mb-2">All Categories</h2>
           <p className="text-sm opacity-90">Manage All Categories, Add, Update & Delete.</p>
        </Link>
      )}
      {userRole==="admin" && (
        <Link href="/dashboard/subcategories"
        className="bg-gradient-to-r from-[#ffb88e] to-[#ea5753] rounded-2xl p-6 shadow-lg text-white hover:scale-105 transition-transform cursor-pointer">
           <h2 className="text-xl font-bold mb-2">All Sub Categories</h2>
           <p className="text-sm opacity-90">Manage All Sub Categories, Add, Update & Delete.</p>
        </Link>
      )}
      {cards.map((card, idx) => (
        <Link
          key={idx}
          href={card.href}
          className={`${card.bg} rounded-2xl p-6 shadow-lg text-white hover:scale-105 transition-transform cursor-pointer`}
        >
          <h2 className="text-xl font-bold mb-2">{card.title}</h2>
          <p className="text-sm opacity-90">{card.description}</p>
        </Link>
      ))}
    </div>
  );
}
