
import DashboardNavbar from "../../(public)/components/dashoard/DashboardNavbar";
import DashboardUserTable from "../../(public)/components/dashoard/DashboardUserTable";
import PieChartComponent from "../../(public)/components/dashoard/PieChartComponent";
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
        
          <PieChartComponent/>
        </div>
      </div>
    </div>
  );
}
