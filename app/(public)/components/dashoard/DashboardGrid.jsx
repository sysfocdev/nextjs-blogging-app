"use client";

import Link from "next/link";

export default function DashboardGrid() {
  const cards = [
    {
      title: "Create New Blog",
      description: "Add and publish a new blog post.",
      href: "/dashboard/blogs",
      bg: "bg-gradient-to-r from-indigo-500 to-purple-500",
    },
    {
      title: "Reach Chart",
      description: "View analytics and performance charts.",
      href: "/dashboard/charts",
      bg: "bg-gradient-to-r from-green-400 to-blue-500",
    },
    {
      title: "Users",
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
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
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
