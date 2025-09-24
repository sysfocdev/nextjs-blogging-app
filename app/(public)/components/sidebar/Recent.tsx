"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaFireFlameCurved } from "react-icons/fa6";

const Recent = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs", {
          cache: "no-cache",
        });
        const data = await res.json();

        if (data.success) {
          // ✅ take only the 4 most recent blogs
          const latest = data.blogs.slice(0, 4);
          setBlogs(latest);
        } else {
          console.error("Error fetching blogs:", data.error);
        }
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="px-4 border border-gray-200 rounded-xl">
      {/* Title */}
      <div className="mt-4 flex flex-col items-center justify-center">
        <div className="flex items-center">
          <FaFireFlameCurved size={20} className="mr-2 text-[#FE4F70]" />
          <h3 className="text-xl font-bold">Recent Posts</h3>
        </div>
        <div className="mt-2">
          <svg width="33" height="6" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FE4F70"></stop>
                <stop offset="100%" stopColor="#FFA387"></stop>
              </linearGradient>
            </defs>
            <path
              d="M33 1c-3.3 0-3.3 4-6.598 4C23.1 5 23.1 1 19.8 1c-3.3 0-3.3 4-6.599 4-3.3 0-3.3-4-6.6-4S3.303 5 0 5"
              stroke="url(#gradient)"
              strokeWidth="2"
              fill="none"
            ></path>
          </svg>
        </div>
      </div>

      {/* Blogs */}
      <div className="mt-4 flex flex-col">
        {blogs.length === 0 ? (
          <p className="text-gray-500 text-sm py-4">No recent posts found.</p>
        ) : (
          blogs.map((post) => (
            <div
              key={post?._id}
              className="flex items-center gap-x-5 border-t border-gray-200/70 py-4"
            >
              <div className="w-[65px] h-[65px] rounded-full overflow-hidden relative shrink-0">
                <Image
                  src={post?.image || "/nasir.jpg"} // ✅ fallback
                  alt={post?.title || "blog image"}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <Link href={`/blogs/${post?.slug || ""}`}>
                  <h3 className="font-bold">{post?.title}</h3>
                </Link>
                <p className="text-xs text-gray-400 mt-1">
  {post?.createdAt
    ? new Date(post.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : ""}
</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Recent;
