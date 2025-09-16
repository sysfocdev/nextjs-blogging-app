// ✅ app/dashboard/page.js
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardNavbar from "../(public)/components/dashoard/DashboardNavbar";
import Sidebar from "../(public)/components/dashoard/Sidebar";
import DashboardTable from "../(public)/components/dashoard/DashboardTable";

export default function Page() {
  const cookieStore = cookies();
  const auth = cookieStore.get("auth_token");

  if (!auth) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar fixed */}
      <div className="w-64 h-screen sticky top-0 border-r border-gray-200 dark:border-gray-700">
        <Sidebar /> {/* ✅ Sidebar ke andar Logout hai */}
      </div>

      {/* Main Content scrollable */}
      <div className="flex-1 flex flex-col overflow-y-auto h-screen dark:text-white">
        {/* Navbar fixed inside main */}
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 shadow">
          <DashboardNavbar />
        </div>

        {/* Page content */}
        <div className="flex-1 p-6">
          <DashboardTable />
        </div>
      </div>
    </div>
  );
}
