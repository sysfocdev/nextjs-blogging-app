"use client"
import { useState } from "react";
import Sidebar from "@/app/(public)/components/home/Sidebar";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  // Dummy data for cards
  const blogPosts = [
    {
      id: 1,
      category: "Fashion",
      img: "/banner.webp",
      author: "Hamza Ilyas",
      date: "March 23, 2023",
      title: "3 Easy Ways To Make Your iPhone Faster",
      desc: "The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc...",
    },
    {
      id: 2,
      category: "Travel",
      img: "/banner.webp",
      author: "Ali Khan",
      date: "April 5, 2023",
      title: "Top 5 Destinations You Must Visit",
      desc: "Discover breathtaking locations across the world with our curated travel guide...",
    },
    {
      id: 3,
      category: "Tech",
      img: "/banner.webp",
      author: "Sara Ahmed",
      date: "May 10, 2023",
      title: "Latest AI Tools That Will Change the World",
      desc: "AI is rapidly evolving, and here are some tools that will revolutionize industries...",
    },
    {
      id: 4,
      category: "Food",
      img: "/banner.webp",
      author: "Ahmed Raza",
      date: "June 15, 2023",
      title: "10 Quick and Healthy Breakfast Ideas",
      desc: "Start your mornings with these quick, healthy, and tasty breakfast recipes...",
    },
    {
      id: 5,
      category: "Lifestyle",
      img: "/banner.webp",
      author: "Fatima Noor",
      date: "July 20, 2023",
      title: "Minimalist Living: How to Declutter Your Life",
      desc: "Simplify your life with these easy steps towards minimalism...",
    },
    {
      id: 6,
      category: "Business",
      img: "/banner.webp",
      author: "Zain Malik",
      date: "August 1, 2023",
      title: "5 Habits of Highly Successful Entrepreneurs",
      desc: "Learn from the best with these proven habits...",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 4;

  // Pagination logic
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = blogPosts.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(blogPosts.length / cardsPerPage);

  return (
    <section className="flex flex-col md:flex-row justify-between gap-x-6 gap-y-5">
      {/* Blog Cards */}
      <div className="w-full md:w-[68%] p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
          {currentCards.map((post) => (
            <div key={post.id} className="relative">
              <div className="absolute top-4 left-4">
                <button className="w-fit py-2 px-4 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] text-white rounded-full text-sm">
                  {post.category}
                </button>
              </div>
              <div>
                <Image
                  src={post.img}
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
                <p className="text-sm">{post.date}</p>
              </div>
              <div>
                <Link href={"/"}>
                  <h4 className="font-bold text-xl">{post.title}</h4>
                </Link>
                <p className="mt-2 text-gray-500">{post.desc}</p>
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
  );
}
