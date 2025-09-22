"use client";
import { useEffect, useState } from "react";
import { SquarePen } from "lucide-react";
import { useRouter } from "next/navigation";
import DeleteBlog from "../../../../lib/DeleteBlog";

export default function DashboardTable() {
  const [blogs, setBlogs] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState("");
  const router = useRouter();

  useEffect(() => {
    // get logged in user
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(user);
    if (user && user.role) {
      setUserRole(user.role);
    }

    // fetch blogs
    fetch("/api/blogs", { cache: "no-cache" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBlogs(data.blogs);
        }
      });
  }, []);

  


  return (
   
    <div className="max-w-4xl mx-auto p-6 dark:bg-black shadow rounded">
    <h2 className="text-xl font-bold mb-4">All Blogs</h2>
  
    <table className="w-full border">
      <thead>
        <tr className="light:bg-gray-100">
          <th>Sr No</th>
          <th className="p-2 border">Blog Title</th>
          <th className="p-2 border">Category</th>
        
          <th>Author</th>
           {userRole === "admin" && <th>Actions</th>} 
        </tr>
      </thead>
      <tbody>
        {blogs.length > 0 ? (
          blogs.map((blog, index) => (
            <tr key={blog._id} className="text-center">
              <td className="font-semibold p-2 border">{index + 1}</td>
              <td className="p-2 border">{blog.title}</td>
              <td className="p-2 border">{blog.category?.categoryName}</td>
              <td className="p-2 border">
                {currentUser?.fName === blog.author ? (
                  <span className="font-semibold text-[#00009C] dark:text-gray-200">
                    {blog.author} (You)
                  </span>
                ) : (
                  blog.author
                )}
              </td>
  
              {userRole === "admin" && (
                <td className="p-2 border" >
                 
                  
                   
                  <button onClick={() => router.push("/dashboard/blogs/new/" + blog._id)} className="px-3 py-1 cursor-pointer bg-blue-500 text-white rounded mr-2">
                        Edit
                      </button>
                    <DeleteBlog id={blog._id} />
              
                </td>
              )}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="p-4 text-center text-gray-500">
              No blogs found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
  
  );
}
