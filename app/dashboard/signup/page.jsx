"use client"
import { useState } from "react";
import DashboardNavbar from "../../(public)/components/dashoard/DashboardNavbar";
import Sidebar from "../../(public)/components/dashoard/Sidebar";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Page() {

  const [fName, setFName]= useState("")
  const [lName, setLName]= useState("")
  const [email, setEmail]= useState("")
  const [password, setPassword]= useState("")
  const [profileImg, setProfileImg]= useState("")
  const [role, setRole]= useState("")

  const formHandler= (e)=>{
    e.preventDefault()

    if(!fName || !lName || !email || !password || !profileImg || !role){
      toast.error("Inputs are Empty")
      return
    }
    console.log(fName, lName, email, password, profileImg, role)
    toast.success("User Has Registerd, Wait For Admin Aproval")
    setFName("")
    setLName("")
    setEmail("")
    setPassword("")
    setProfileImg("")
    setRole("")
  }


  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />
      {/* Main dashboard content */}
      <div className="flex-1">
        <div>
          <DashboardNavbar />
        </div>
        <div  className="mt-6 mx-8 w-fit px-4 py-2 rounded-sm cursor-pointer bg-gradient-to-r from-[#d397fa] to-[#8364e8] text-white  " >
        <Link href={"/dashboard/blogs"} > <ArrowLeft className="transition-transform duration-700 hover:rotate-[360deg]"/></Link>
        </div>
        <div className="max-w-2xl mx-auto p-6 overflow-y-auto  shadow-md border-gray-200  ">
        <h2 className="text-xl font-semibold mb-4">Create New User</h2>
          <form onSubmit={formHandler} className="flex flex-col gap-3">
            <input type="text"
             placeholder="First Name"
             value={fName}
             onChange={(e)=>setFName(e.target.value)}
              className="px-3 py-2  border border-gray-300" />

            <input type="text"
             placeholder="Last Name"
             value={lName}
             onChange={(e)=>setLName(e.target.value)}
               className="px-3 py-2 border border-gray-300" />
            <input type="email" 
            placeholder="E-Mail"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
              className="px-3 py-2 border border-gray-300" />
            <input type="password"
             placeholder="Password" 
             value={password}
             onChange={(e)=>setPassword(e.target.value)}
              className="px-3 py-2 border border-gray-300" />
            <input type="file"
             placeholder="CHoose Profile Image"
             value={profileImg}
             onChange={(e)=>setProfileImg(e.target.value)}
               className="px-3 py-2 border border-gray-300" />
            <select className="px-3 py-2 border border-gray-300 "
            value={role}
            onChange={(e)=>setRole(e.target.value)} >
                <option className="text-black" value="">Select Role</option>
                <option className="text-black" value="admin">Admin</option>
                <option className="text-black" value="user">User</option>
            </select>
            <button
          type="submit"
          className="w-full py-2 cursor-pointer bg-gradient-to-r from-[#d397fa] to-[#8364e8] text-white"
        >
          Create User
        </button>
          </form>
        </div>
      </div>
    </div>
  );
}
