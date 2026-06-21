import AdminDoctorManagement from "../components/admin/AdminDoctorManagement";
import AdminFoodManagement from "../components/admin/AdminFoodManagement";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen  pb-20 mt-16 ">
      <div className="max-w-6xl mx-auto px-6">
        <AdminFoodManagement />
        {/* <AdminDoctorManagement /> */}

      </div>
    </div>
  );
}