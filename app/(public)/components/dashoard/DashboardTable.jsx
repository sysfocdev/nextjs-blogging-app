"use client";
import { useEffect, useState } from "react";
import { SquarePen, Trash2, View } from "lucide-react";
import { useRouter } from "next/navigation";
import DeleteBlog from "../../../../lib/DeleteBlog";

export default function DashboardTable() {
  const [blogs, setBlogs] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const router= useRouter()

  useEffect(() => {
    // get logged in user
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(user);

    // fetch blogs
    fetch("/api/blogs",{cache:"no-store"})
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBlogs(data.blogs);
        }
      });
  }, []);


  return (
    <div className="overflow-x-auto mx-8">
      <table className="table">
        <thead className="bg-[#9377E0] text-white">
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Category</th>
            <th>Content</th>
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
              <td>{blog.content}</td>
              <td>
        {currentUser?.fName === blog.author ? <span className="font-semibold dark:text-gray-200">{blog.author}(You)</span> : blog.author}
      </td>
              <td>
                <div className="flex items-center gap-2">
                <button
                    onClick={() => router.push("/dashboard/blogs/new/" + blog._id)}
                  >
                    <SquarePen cursor={"pointer"} color="#EF9B0F" />
                  </button>
                  <View cursor="pointer" color="#89CFF0" />
                  <DeleteBlog id= {blog._id}/>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
