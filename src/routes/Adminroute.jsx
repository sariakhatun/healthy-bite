import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";

const ADMIN_EMAIL = "sariajuiit@gmail.com";

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  // Wait for auth to load
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#77be0d] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but not admin → redirect to home
  if (user.email !== ADMIN_EMAIL) {
    return <Navigate to="/" replace />;
  }

  // Admin 
  return children;
}