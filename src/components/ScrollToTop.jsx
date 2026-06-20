import { useEffect } from "react";
import { useLocation } from "react-router";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const unlisten = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant", 
      });
    }, 10);

    return () => clearTimeout(unlisten);
  }, [pathname]);

  return null;
}