"use client"

import { SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import DeleteCategory from "../../../../lib/DeleteCategory";
import {useRouter}  from "next/navigation";


export default function ShowCategories(){

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userRole , setUserRole]= useState("")
    const router = useRouter()

  
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"))
        if(user && user.role){
            setUserRole(user.role)
        }
    }, [])
    useEffect(() => {
        
      const fetchCategories = async () => {
        try {
          let res = await fetch("/api/categories", {
            cache:"no-cache"
          });
          let data = await res.json();
  
          if (data.success) {
            setCategories(data.categories); // ✅ store in state
          } else {
            console.error("Error fetching categories:", data.error);
          }
        } catch (err) {
          console.error("Failed to fetch categories:", err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchCategories();
    }, []);
  
    if (loading) return <p>Loading categories...</p>;

    return(
      //   <div className="overflow-x-auto">
      //   <table className="table">
      //     {/* head */}
      //     <thead className="bg-[#9377E0] text-white">
      //       <tr >
      //         <th></th>
      //         <th>Category Name</th>
      //         <th>Meta Data</th>
      //         <th>Meta Description</th>
      //         {userRole==="admin" && <th>Actions</th>}
      //       </tr>
      //     </thead>
      //     <tbody>
      //       {categories.map((cat, index)=>(
      //           <tr key={cat._id}>
      //               <td>{index +1}</td>
      //               <td>{cat.categoryName}</td>
      //               <td>{cat.metaTitle}</td>
      //               <td>{cat.metaDescription}</td>

      //               {userRole === "admin" && ( // 👈 actions only for admin
      //           <td>
      //             <div className="flex items-center gap-2">
      //               <button
      //                 onClick={() => router.push("/dashboard/showCategories/" + cat._id)}
      //               >
      //                 <SquarePen cursor="pointer" color="#EF9B0F" />
                      
      //               </button>
      //               <DeleteCategory id={cat._id}/>
                        
      //             </div>
      //           </td>
      //         )}
      //           </tr>
      //       ))}
      //     </tbody>
      //   </table>
      // </div>
      <div className="max-w-4xl mx-auto  p-6 dark:bg-black shadow rounded">
      <h2 className="text-xl font-bold mb-4">All Categories</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th>Sr No</th>
            <th className="p-2 border">Category Name</th>
            <th className="p-2 border">Meta Data</th>
            <th className="p-2 border">Meta Meta Description</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((cat, index) => (
              <tr key={cat._id} className="text-center">
                <td className="font-semibold p-2 border ">{index +1}</td>
                <td className="p-2 border font-semibold  text-gray-600 dark:text-white">{cat.categoryName}</td>
                <td className="p-2 border">{cat.metaTitle}</td>
              <td className="p-2 border">{cat.metaDescription}</td>
              {userRole === "admin" && ( // 👈 actions only for admin
                 <td className="p-2 border">
               
                 <button onClick={() => router.push("/dashboard/showCategories/" + cat._id)} className="px-3 py-1 cursor-pointer bg-blue-500 text-white rounded mr-2">
                        Edit
                      </button>
                    <DeleteCategory id={cat._id}/>
                        
                  
                 </td>
               )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-4 text-center text-gray-500">
                No subcategories found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    )
}