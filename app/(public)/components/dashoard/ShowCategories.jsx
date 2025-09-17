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
        <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-[#9377E0] text-white">
            <tr >
              <th></th>
              <th>Category Name</th>
              <th>Meta Data</th>
              <th>Meta Description</th>
              {userRole==="admin" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, index)=>(
                <tr key={cat._id}>
                    <td>{index +1}</td>
                    <td>{cat.categoryName}</td>
                    <td>{cat.metaTitle}</td>
                    <td>{cat.metaDescription}</td>

                    {userRole === "admin" && ( // 👈 actions only for admin
                <td>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => router.push("/dashboard/showCategories/" + cat._id)}
                    >
                      <SquarePen cursor="pointer" color="#EF9B0F" />
                      
                    </button>
                    <DeleteCategory id={cat._id}/>
                        
                  </div>
                </td>
              )}
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
}