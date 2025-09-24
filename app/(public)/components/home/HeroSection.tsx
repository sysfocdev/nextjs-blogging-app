"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const HeroSection = () => {
  const [latestBlog, setLatestBlog] = useState(null);

  useEffect(() => {
    const fetchLatestBlog = async () => {
      try {
        const res = await fetch("/api/blogs", { cache: "no-cache" });
        const data = await res.json();

        if (data.success && data.blogs.length > 0) {
          // ✅ sort by createdAt (newest first)
          const sorted = [...data.blogs].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setLatestBlog(sorted[0]); // ✅ pick latest
        }
      } catch (err) {
        console.error("Failed to fetch latest blog:", err);
      }
    };

    fetchLatestBlog();
  }, []);

  if (!latestBlog) {
    return (
      <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center border rounded-xl">
        <p className="text-gray-500">No blog posts yet</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-xl group">
      {/* Blog Image */}
      <Image
        src={latestBlog?.image || "/Mood-Booster.png"}
        alt={latestBlog?.title || "hero-img"}
        fill
        className="object-cover rounded-xl group-hover:scale-105 transition-all duration-500 ease-in-out"
        priority
        fetchPriority="high"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 rounded-xl" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col gap-y-5 justify-end p-5 md:p-10 text-white">
        <button className="w-fit py-2 px-4 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] text-white rounded-full text-sm">
          {latestBlog?.category.categoryName || "Uncategorized"}
        </button>

        <Link href={`/blogs/${latestBlog?.slug}`}>
          <h1 className="font-bold text-2xl md:text-3xl line-clamp-2">
            {latestBlog?.title}
          </h1>
        </Link>

        <div className="flex items-center gap-x-5 text-sm">
          <p>{latestBlog?.author || "Anonymous"}</p>
          <div className="w-1 h-1 rounded-full bg-white" />
          <p>
            {latestBlog?.createdAt
              ? new Date(latestBlog.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
