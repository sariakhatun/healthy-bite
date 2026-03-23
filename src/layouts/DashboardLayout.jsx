import { Outlet } from "react-router";
import DashboardSidebar from "../pages/dashboard/DashboardSidebar";

export default function DashboardLayout() {
  return (
    <div className="max-w-6xl mx-auto ">
        <div className="flex min-h-screen  mx-6">
      <DashboardSidebar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div> 
    </div>
  );
}