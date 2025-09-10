"use client";

import { EyeIcon, SquarePen, Trash2Icon, View } from "lucide-react";
import { useEffect, useState } from "react";
import DeleteUser from "../../../../lib/DeleteUser";
import { useRouter } from "next/navigation";

export default function DashboardUserTable() {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  // Toggle verification (update API)
  const handleToggle = async (id, verified) => {
    const res = await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ verified: !verified }),
    });
    if (res.ok) {
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, verified: !u.verified } : u))
      );
    }
  };

  return (
    <div className="overflow-x-auto mx-8">
      <table className="table">
        <thead className="bg-[#9377E0] text-white">
          <tr>
            <th></th>
            <th>Name</th>

            <th>Role</th>
            <th>Verification</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <th>
                <input
                  type="checkbox"
                  checked={user.verified}
                  onChange={() => handleToggle(user._id, user.verified)}
                  className="checkbox checkbox-success border border-gray-500"
                />
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={user.profileImg} alt={user.fName} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{`${user.fName} ${user.lName}`}</div>
                    <div className="text-sm opacity-50">{user.country}</div>
                  </div>
                </div>
              </td>

              <td className="font-semibold">{user.role}</td>
              <td
                className={`font-semibold ${
                  user.verified ? "text-green-500" : "text-red-500"
                }`}
              >
                {user.verified ? "Verified ✔" : "Not-Verified ❌"}
              </td>

              <td className="text-sm font-semibold opacity-70">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => router.push("/dashboard/users/" + user._id)}
                  >
                    <SquarePen cursor={"pointer"} color="#EF9B0F" />
                  </button>
                  <View cursor={"pointer"} color="#89CFF0" />
                  <DeleteUser id={user._id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
