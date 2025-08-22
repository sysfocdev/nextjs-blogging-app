"use client";

import { useState } from "react";

export default function DashboardUserTable() {
  // initial data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Nasir Akhtar",
      country: "United States",
      description: "Zemlak, Daniel and Leannon",
      role: "Admin",
      verified: true,
      avatar: "https://img.daisyui.com/images/profile/demo/2@94.webp",
    },
    {
      id: 2,
      name: "Brice Swyre",
      country: "China",
      description: "Carroll Group",
      role: "User",
      verified: true,
      avatar: "https://img.daisyui.com/images/profile/demo/3@94.webp",
    },
    {
      id: 3,
      name: "Marjy Ferencz",
      country: "Russia",
      description: "Rowe-Schoen",
      role: "User",
      verified: false,
      avatar: "https://img.daisyui.com/images/profile/demo/4@94.webp",
    },
    {
      id: 4,
      name: "Yancy Tear",
      country: "Brazil",
      description: "Wyman-Ledner",
      role: "User",
      verified: false,
      avatar: "https://img.daisyui.com/images/profile/demo/5@94.webp",
    },
  ]);

  // toggle verification when checkbox is clicked
  const handleToggle = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, verified: !user.verified } : user
      )
    );
  };

  return (
    <div className="overflow-x-auto mx-8">
      <table className="table">
        {/* head */}
        <thead className="bg-[#9377E0] text-white">
          <tr>
            <th></th>
            <th>Name</th>
            <th>Description</th>
            <th>Role</th>
            <th>Verification</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <th>
                <input
                  type="checkbox"
                  checked={user.verified}
                  onChange={() => handleToggle(user.id)}
                  className="checkbox checkbox-success border border-gray-500"
                />
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={user.avatar} alt={user.name} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{user.name}</div>
                    <div className="text-sm opacity-50">{user.country}</div>
                  </div>
                </div>
              </td>
              <td>{user.description}</td>
              <td className="font-semibold">{user.role}</td>
              <td
                className={`font-semibold ${
                  user.verified ? "text-green-500" : "text-red-500"
                }`}
              >
                {user.verified ? "Verified ✔" : "Not-Verified ❌"}
              </td>
              <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
