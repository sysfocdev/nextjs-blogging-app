"use client";
import { useEffect, useState } from "react";
import { SquarePen, Trash2, View } from "lucide-react";

export default function DashboardTable() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlogs() {
      const res = await fetch("/api/blogs"); // 👈 GET API
      const data = await res.json();
      if (data.success) {
        setBlogs(data.blogs);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <div className="overflow-x-auto mx-8">
      <table className="table">
        <thead className="bg-[#9377E0] text-white">
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Category</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog, index) => (
            <tr key={blog._id}>
              <th>{index + 1}</th>
              <td>{blog.title}</td>
              <td>{blog.category}</td>
              <td>{blog.author}</td>
              <td>
                <div className="flex items-center gap-2">
                  <SquarePen cursor="pointer" color="#EF9B0F" />
                  <View cursor="pointer" color="#89CFF0" />
                  <Trash2 cursor="pointer" color="red" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
