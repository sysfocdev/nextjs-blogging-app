
import DashboardNavbar from "../../(public)/components/dashoard/DashboardNavbar";
import DashboardUserTable from "../../(public)/components/dashoard/DashboardUserTable";
import Sidebar from "../../(public)/components/dashoard/Sidebar";

export default function Page() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />
      {/* Main dashboard content */}
      <div className="flex-1">
        <div>
          <DashboardNavbar />
        </div>
        <div className="mt-10">
        
          <DashboardUserTable/>
        </div>
      </div>
    </div>
  );
}
