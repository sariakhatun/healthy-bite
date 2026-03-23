import { NavLink } from "react-router";
import {
  FaUser,
  FaPaw,
  FaHeart,
  FaClipboardList,
  FaCommentDots,
  FaStar,
  FaVideo,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

export default function DashboardSidebar() {
  const { logOut } = useAuth();

  const menuItems = [
    { label: "Profile", to: "/dashboard/profile", icon: FaUser },
    { label: "Applications", to: "/dashboard/applications", icon: FaPaw },
    { label: "Favorites", to: "/dashboard/favorites", icon: FaHeart },
    { label: "My Bookings", to: "/dashboard/bookings", icon: FaClipboardList },
    { label: "My Feedback", to: "/dashboard/feedback", icon: FaCommentDots },
    { label: "Reviews", to: "/dashboard/reviews", icon: FaStar },
    { label: "Sponsorships", to: "/dashboard/sponsorships", icon: FaVideo },
    { label: "Settings", to: "/dashboard/settings", icon: FaCog },
  ];

  return (
    <aside className="w-64 mt-20 shadow-lg  p-4 flex flex-col justify-between border-r border-gray-200">
      <div className="flex flex-col gap-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700  hover:bg-[#77be0dee] hover:text-white transition-colors ${
                  isActive ? " bg-[#77be0dee] text-white" : ""
                }`
              }
            >
              <Icon />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Logout Button */}
      <button
        onClick={logOut}
        className="mt-4 flex items-center gap-3 px-4 py-2 rounded-lg text-red-500 hover:bg-red-100 transition-colors"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </aside>
  );
}