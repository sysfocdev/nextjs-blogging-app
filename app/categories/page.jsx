"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/app/(public)/components/home/Sidebar";
import Image from "next/image";
import Link from "next/link";
import MainHeader from "../(public)/components/home/MainHeader";

export default function Page() {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 4;

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setBlogs(data.blogs);
      });
  }, []);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = blogs.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(blogs.length / cardsPerPage);

  return (
    <>
      <MainHeader />
      <section className="flex flex-col md:flex-row justify-between gap-x-6 gap-y-5 mx-4 md:mx-12 my-8">
        {/* Blog Cards */}
        <div className="w-full md:w-[68%]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
          {currentCards.map((post) => (
  <div key={post._id} className="relative">
    <div className="absolute top-4 left-4">
      <button className="w-fit py-2 px-4 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] text-white rounded-full text-sm">
        {post.category?.categoryName}   {/* ✅ fixed */}
      </button>
    </div>
    <div>
      <Image
        src={post.coverImg || "/Mood-Booster.png"}
        alt="image"
        width={300}
        height={300}
        className="size-full rounded-xl object-cover"
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
        <p className="text-sm font-semibold">{post.author}</p>
      </div>
      <div className="w-1 h-1 rounded-full bg-[#FE4F70]" />
      <p className="text-sm">{new Date(post.createdAt).toDateString()}</p>
    </div>
    <div>
      <Link href={`/blog/${post.slug}`}>
        <h4 className="font-bold text-xl">{post.title}</h4>
      </Link>
      <p className="mt-2 text-gray-500 line-clamp-3">
                    {post.content.replace(/<[^>]*>?/gm, "").slice(0, 100)}...
                  </p>
    </div>
  </div>
))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === index + 1
                    ? "bg-gradient-to-r from-[#FE4F70] to-[#FFA387] text-white"
                    : ""
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <Sidebar />
      </section>
    </>
  );
}
