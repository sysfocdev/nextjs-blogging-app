import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardNavbar from "../(public)/components/dashoard/DashboardNavbar";
import DashboardTable from "../(public)/components/dashoard/DashboardTable";
import Sidebar from "../(public)/components/dashoard/Sidebar";

export default function Page() {
  const cookieStore = cookies();   
  const auth = cookieStore.get("auth");

  if (!auth) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 dark:text-white">
        <DashboardNavbar />
        <div className="mt-10">
          <DashboardTable />
        </div>
      </div>
    </div>
  );
}
