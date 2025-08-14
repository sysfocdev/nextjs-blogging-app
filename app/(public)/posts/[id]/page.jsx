"use client";
import Sidebar from "@/app/(public)/components/home/Sidebar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const DATA = [
  { id: 1, title: "60 Things To Immediately Do About Building", description: "The European languages are members of the same family. Their separate existence is a myth", date: "August 17, 2022" },
  { id: 2, title: "3 Easy Ways To Make Your iPhone Faster", description: "The European languages are members of the same family. Their separate existence is a myth", date: "August 17, 2022" },
  { id: 3, title: "Facts About Business That Will Help You Success", description: "The European languages are members of the same family. Their separate existence is a myth", date: "August 17, 2022" },
  { id: 4, title: "Your Light Is About To Stop Being Relevant", description: "The European languages are members of the same family. Their separate existence is a myth", date: "August 17, 2022" },
];

export default function PostDetailsPage() {
  const { id } = useParams();
  const post = DATA.find((p) => String(p.id) === String(id));

  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");



  const addComment = (e) => {
    e.preventDefault();
    const t = text.trim();
    const n = name.trim();
    if (!t || !n) return;
    const dateTime = new Date().toLocaleString();
    setComments((prev) => [...prev, { id: Date.now(), name: n, text: t, dateTime }]);
    setText("");
    setName("");
  };

  const removeComment = (cid) => {
    setComments((prev) => prev.filter((c) => c.id !== cid));
  };

  if (!post) {
    return (
      <div className="p-6">
        <p className="text-red-500 font-medium">Post not found.</p>
        <Link href="/" className="text-blue-600 underline">Go back</Link>
      </div>
    );
  }

  return (
    <section className='flex justify-between gap-x-6 gap-y-5 "mx-4 md:mx-12 my-8"'>
      <div className='w-full md:w-[68%]'>
        <div className="mt-4">
          <Link href="/" className="px-4 py-2 rounded bg-gradient-to-r from-[#FE4F70] to-[#FFA387] text-white">← Back</Link>
        </div>

        <div className="border border-gray-200/70 rounded-xl overflow-hidden mt-3">
          <div className="relative w-full h-64">
            <Image src="/blog-img.jpg" alt={post.title} fill className=" hobject-cover" />
          </div>
          <div className="p-6">
            <h1 className="text-2xl md:text-3xl font-bold">{post.title}</h1>
            <p className="text-gray-500 mt-1">{post.date}</p>
            <p className="mt-4 text-gray-700">{post.description}</p>
          </div>
        </div>

        
        <div className="mt-8 border border-gray-200/70 rounded-xl p-6">
          <div className='my-4'>
            <div className='flex items-center'>
              <h3 className='text-2xl font-bold'>Leave a Replay</h3>
            </div>
            <div className='mt-2'>
              <svg width='33' height='6' xmlns='http://www.w3.org/2000/svg'>
                <defs>
                  <linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='0%'>
                    <stop offset='0%' stopColor='#FE4F70'></stop>
                    <stop offset='100%' stopColor='#FFA387'></stop>
                  </linearGradient>
                </defs>
                <path
                  d='M33 1c-3.3 0-3.3 4-6.598 4C23.1 5 23.1 1 19.8 1c-3.3 0-3.3 4-6.599 4-3.3 0-3.3-4-6.6-4S3.303 5 0 5'
                  stroke='url(#gradient)'
                  strokeWidth='2'
                  fill='none'
                ></path>
              </svg>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <p className="text-gray-400 italic text-sm">Your email address will not be published. Required fields are marked*</p>
            <form onSubmit={addComment}>
              <label className="font-semibold text-sm text-gray-600">Comment*</label>
              <textarea
                className="border rounded px-3 py-2 w-full"
                placeholder="Write a comment…"
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>

              <label className="font-semibold text-sm text-gray-600">Name*</label>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded px-3 py-2 w-full"
              />

              <button
                type="submit"
                className="px-4 py-2 rounded bg-gradient-to-r mt-3 from-[#FE4F70] to-[#FFA387] text-white"
              >
                Post
              </button>
            </form>
          </div>

          <ul className="mt-6 space-y-3">
            {comments.length === 0 && (
              <li className="text-gray-500">No comments yet. Be the first!</li>
            )}
            {comments.map((c) => (
              <li key={c.id} className="flex justify-between items-center border-b pb-3">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-800">{c.name}:</span>
                    <span className="text-gray-700">{c.text}</span>
                  </div>
                  <span className="text-xs text-gray-500">{c.dateTime}</span>
                </div>
                <button
                  onClick={() => removeComment(c.id)}
                  className="text-xs text-red-600 hover:underline"
                >
                  delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Sidebar />
    </section>
  );
}
