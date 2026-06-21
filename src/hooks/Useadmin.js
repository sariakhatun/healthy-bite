import useAuth from "./useAuth";

const ADMIN_EMAIL = "sariajuiit@gmail.com";

export default function useAdmin() {
  const { user, loading } = useAuth();

  return {
    isAdmin: user?.email === ADMIN_EMAIL,
    loading,
    user,
  };
}