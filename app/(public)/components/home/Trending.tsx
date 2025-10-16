"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Blog } from "@/types/blog";

const Trending: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs", { cache: "no-store" });
        const data: { success: boolean; blogs: Blog[]; error?: string } =
          await res.json();

        if (data.success) {
          setBlogs(data.blogs);
        } else {
          console.error("Error fetching blogs:", data.error);
        }
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="mt-12 px-4">
      {/* Section Header */}
      <div className="my-4 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start">
          <h3 className="text-2xl font-bold">Trending</h3>
        </div>
        <div className="mt-2 flex justify-center md:justify-start">
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

      {/* Blog Grid */}
      <div className="border border-gray-200/70 rounded-xl">
        <div className="p-4">
          {loading && (
            <p className="text-gray-400 text-center py-6">
              Loading trending posts…
            </p>
          )}

          {!loading && blogs.length === 0 && (
            <p className="text-gray-400 text-center py-6">
              No trending posts available
            </p>
          )}

          {!loading && blogs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
              {/* Top Featured Blogs */}
              {blogs.slice(0, 2).map((post) => (
                <div key={post._id} className="relative">
                  <div className="absolute top-4 left-4">
                    <button className="w-fit py-2 px-4 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] text-white rounded-full text-sm">
                      {post.category?.name || "General"}
                    </button>
                  </div>

                  <div>
                    <Image
                      src={post.coverImg || "/banner.webp"}
                      alt={post.title}
                      width={300}
                      height={300}
                      className="w-full h-auto rounded-xl object-cover"
                    />
                  </div>

                  <div className="my-3 flex items-center gap-x-5">
                    <div className="flex items-center gap-x-3">
                      <div className="relative w-8 h-8">
                        <Image
                          src="/blog-img.jpg"
                          alt="profile"
                          fill
                          className="object-cover rounded-full"
                        />
                      </div>
                      <p className="text-sm font-semibold">
                        {post.author || "Unknown Author"}
                      </p>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-[#FE4F70]" />
                    <p className="text-sm text-gray-500">
                      {post.createdAt
                        ? new Date(post.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : ""}
                    </p>
                  </div>

                  <div>
                    <Link href={`/blogs/${post.slug}`}>
                      <h4 className="font-bold text-xl line-clamp-2">
                        {post.title}
                      </h4>
                    </Link>
                    <p className="mt-2 text-gray-500 line-clamp-3">
                      {post.excerpt ||
                        "No description available for this article."}
                    </p>
                  </div>
                </div>
              ))}

              {/* Bottom List of Smaller Blogs */}
              <div className="md:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
                  {blogs.slice(2, 6).map((post, index) => (
                    <div
                      key={post._id}
                      className={`flex items-center gap-x-5 pb-4 pt-4 border-t border-gray-200/70`}
                    >
                      <div className="w-[100px] h-[80px] rounded-md overflow-hidden relative shrink-0">
                        <Image
                          src={post.coverImg || "/blog-img.jpg"}
                          alt={post.title}
                          fill
                          className="object-cover"
                          priority
                        />
                      </div>

                      <div>
                        <Link href={`/blogs/${post.slug}`}>
                          <h3 className="font-bold line-clamp-2">
                            {post.title}
                          </h3>
                        </Link>
                        <p className="text-xs text-gray-400 mt-1">
                          {post.createdAt
                            ? new Date(post.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )
                            : ""}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Trending;
