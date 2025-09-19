"use client";
import { useEffect, useState } from "react";
import { SquarePen, Trash2, View } from "lucide-react";
import { useRouter } from "next/navigation";
import DeleteBlog from "../../../../lib/DeleteBlog";

export default function DashboardTable() {
  const [blogs, setBlogs] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole]= useState("")
  const router= useRouter()

  useEffect(() => {
    // get logged in user
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(user);
    if (user && user.role) {
      setUserRole(user.role);
    }

    // fetch blogs
    fetch("/api/blogs",{cache:"no-cache"})
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
          
            <th>Author</th>
            {userRole === "admin" && <th>Actions</th>} 
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog, index) => (
            <tr key={blog._id}>
              <th>{index + 1}</th>
              <td>{blog.title}</td>
              <td>{blog.category?.categoryName || "No Category"}</td>
              <td>{blog.subcategory?.categoryName || "—"}</td>
             
              <td >
        {currentUser?.fName === blog.author ? <span className="font-semibold text-[#00009C] dark:text-gray-200">{blog.author}(You)</span> : blog.author}
      </td>
      {userRole==="admin" && (
        <td>
        <div className="flex items-center gap-2">
        <button
            onClick={() => router.push("/dashboard/blogs/new/" + blog._id)}
          >
            <SquarePen cursor={"pointer"} color="#EF9B0F" />
          </button>
        
          <DeleteBlog id= {blog._id}/>
        </div>
      </td>

      )}
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
