import React from "react";
import { Outlet } from "react-router";
import Navbar from "../pages/shared/Navbar";
import Footer from "../pages/home/Footer";

const RootLayout = () => {
  return (
 
    <div className="min-h-screen flex flex-col bg-[#F8F3E1]"> 
      <Navbar />
      <div className="flex-grow"> 
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
