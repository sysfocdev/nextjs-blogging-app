"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";   // ✅ import useParams
import DashboardNavbar from "../../../(public)/components/dashoard/DashboardNavbar";
import Sidebar from "../../../(public)/components/dashoard/Sidebar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";           // ✅ import toast

export default function Page() {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [role, setRole] = useState("");
  const [country, setCountry] = useState("");

  const { id } = useParams();  // ✅ grab id from route params

  useEffect(() => {
    if (id) {
      getUserDetails();
    }
  }, [id]); // ✅ fetch when id is available

  const getUserDetails = async () => {
    let res = await fetch(`/api/users/${id}`);
    let data = await res.json();

    if (data.success) {
      let result = data.result;
      setFName(result.fName);
      setLName(result.lName);
      setEmail(result.email);
      setPassword(result.password);
      setProfileImg(result.profileImg);
      setRole(result.role);
      setCountry(result.country);   // ✅ fixed setter
    }
  };

  const handleform = async (e) => {
    e.preventDefault();
    let res = await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fName, lName, email, password, profileImg, role, country }),
    });
    let data = await res.json();
    if (data.result) {
      toast.success("User Updated");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />
      {/* Main dashboard content */}
      <div className="flex-1">
        <div>
          <DashboardNavbar />
        </div>
        <div className="mt-6 mx-8 w-fit px-4 py-2 rounded-sm cursor-pointer bg-gradient-to-r from-[#d397fa] to-[#8364e8] text-white">
          <Link href={"/dashboard/users"}>
            <ArrowLeft className="transition-transform duration-700 hover:rotate-[360deg]" />
          </Link>
        </div>
        <div className="max-w-2xl mx-auto p-6 overflow-y-auto shadow-md border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Update User</h2>
          <form onSubmit={handleform} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="First Name"
              value={fName}
              onChange={(e) => setFName(e.target.value)}
              className="px-3 py-2 border border-gray-300"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lName}
              onChange={(e) => setLName(e.target.value)}
              className="px-3 py-2 border border-gray-300"
            />
            <input
              type="email"
              placeholder="E-Mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-3 py-2 border border-gray-300"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-3 py-2 border border-gray-300"
            />
            <input
              type="text"
              placeholder="Profile Image URL"
              value={profileImg}
              onChange={(e) => setProfileImg(e.target.value)}
              className="px-3 py-2 border border-gray-300"
            />
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              id="country"
              name="country"
              className="px-3 py-2 border border-gray-300"
            >
              <option value="">Select Country</option>
              <option value="Pakistan">Pakistan</option>
              <option value="India">India</option>
              <option value="United States">United States</option>
              {/* keep your full list here */}
            </select>
            <select
              className="px-3 py-2 border border-gray-300"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            <button
              type="submit"
              className="w-full py-2 cursor-pointer bg-gradient-to-r from-[#d397fa] to-[#8364e8] text-white"
            >
              Update User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
