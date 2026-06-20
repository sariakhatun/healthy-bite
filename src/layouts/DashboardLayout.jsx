import { Outlet } from "react-router";
import DashboardSidebar from "../pages/dashboard/DashboardSidebar";
import ScrollToTop from "../components/ScrollToTop";

export default function DashboardLayout() {
  return (
    <div className="max-w-6xl mx-auto ">
        <div className="flex min-h-screen  mx-6">
          <ScrollToTop></ScrollToTop>
      <DashboardSidebar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div> 
    </div>
  );
}