import { useState } from "react";
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
  FaBars,
  FaTimes,
  FaShieldAlt,
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAdmin from "../../hooks/Useadmin";

export default function DashboardSidebar() {
  const { logOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
const { isAdmin } = useAdmin();

  const menuItems = [
    { label: "Profile", to: "/dashboard", icon: FaUser ,end: true},
    // { label: "Applications", to: "/dashboard/applications", icon: FaPaw },
    { label: "Favorites", to: "/dashboard/favorites", icon: FaHeart },
    { label: "My Bookings", to: "/dashboard/bookings", icon: FaClipboardList },
    // { label: "My Feedback", to: "/dashboard/feedback", icon: FaCommentDots },
    // { label: "Reviews", to: "/dashboard/reviews", icon: FaStar },
    { label: "Settings", to: "/dashboard/settings", icon: FaCog },

    ...(isAdmin
    ? [{ label: "Admin Panel", to: "/dashboard/admin", icon: FaShieldAlt, isAdmin: true }]
    : []),
  ];

  return (
    <>
      {/* Hamburger for mobile */}
      <button
        className="md:hidden mt-24 fixed top-4 left-4 z-50 p-2 rounded bg-gray-200 text-gray-700 shadow"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 mt-20 h-full w-64 rounded min-h-screen shadow-lg p-4 flex flex-col justify-between border-r border-gray-200
          transform transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:flex
          z-40
        `}
      >
        <div className="flex flex-col gap-3 mt-20 md:mt-0">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-[#77be0dee] hover:text-white transition-colors ${
                    isActive ? "bg-[#77be0dee] text-white" : ""
                  }`
                }
                onClick={() => setMobileOpen(false)} // close menu on mobile after click
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

      {/* Overlay when mobile menu is open */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}
    </>
  );
}