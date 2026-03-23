import { useState, useEffect, useRef } from "react";
import {
  FaHome,
  FaCalculator,
  FaUtensils,
  FaHeartbeat,
  FaCalendarCheck,
  FaUserCircle,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const LeafIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 4-8 4s1 5-3 5c-1 0-2-.5-2.5-1.5" />
  </svg>
);

const navLinks = [
  { label: "Home", href: "/", icon: FaHome },
  { label: "BMI Calculator", href: "/bmi", icon: FaCalculator },
  { label: "Food Suggestion", href: "/foods", icon: FaUtensils },
  { label: "Medicine & Exercise", href: "#medicines", icon: FaHeartbeat },
  { label: "Appointment", href: "/appointment", icon: FaCalendarCheck },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const dropdownRef = useRef();

  console.log("user from navbar",user)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          title: "Logged Out!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        setDropdownOpen(false);

        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
        });
      });
  };

  return (
    <nav className="fixed bg-[#41431B] top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Logo */}
       <Link to='/'>
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#d0f236] to-[#77be0dee] flex items-center justify-center text-white">
            <LeafIcon />
          </div>
          <span className="text-xl font-black text-white">
            Healthy<span className="text-[#77be0dee]">Bite</span>
          </span>
        </div></Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.label}
                to={link.href}
                className="flex items-center gap-2 text-white hover:text-[#77be0dee]"
              >
                <Icon />
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop User Dropdown */}
        <div ref={dropdownRef} className="relative hidden md:flex items-center">
          {user ? (
            <>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setDropdownOpen(!dropdownOpen);
                }}
                className="cursor-pointer"
              >
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    className="w-9 h-9 rounded-full border-2 border-[#77be0dee]"
                  />
                ) : (
                  <FaUserCircle className="text-3xl text-white" />
                )}
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 top-12 w-40 bg-white rounded-xl shadow-lg py-2">
                  <Link
                    to="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link to="/login">
              <button className="px-5 py-2 rounded-full bg-[#77be0dee] text-white">
                Login
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="w-5 h-0.5 bg-white mb-1" />
          <div className="w-5 h-0.5 bg-white mb-1" />
          <div className="w-5 h-0.5 bg-white" />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-6 py-4 flex flex-col gap-4 shadow-md">
          
          {/* Links */}
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 text-gray-700"
              >
                <Icon />
                {link.label}
              </Link>
            );
          })}

          <div className="border-t pt-3"></div>

          {/* User Section */}
          {user ? (
            <>
              <div className="flex items-center gap-3">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <FaUserCircle className="text-3xl" />
                )}
                <span>{user?.displayName || "User"}</span>
              </div>

              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700"
              >
                Dashboard
              </Link>

              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="text-red-500 text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              <button className="w-full py-2 bg-[#77be0dee] text-white rounded-full">
                Login
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}