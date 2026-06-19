import React from "react";
import { Outlet } from "react-router";
import Navbar from "../pages/shared/Navbar";
import Footer from "../pages/home/Footer";
import ScrollToTop from "../components/ScrollToTop";

const RootLayout = () => {
  return (
 
    <div className="min-h-screen flex flex-col bg-[#F8F3E1]"> 
    
      {/* Floating food emojis */}
      {["🥑","🫐","🥦","🍎","🥕","🫚"].map((em, i) => (
        <div key={i} className="absolute text-2xl opacity-20 animate-bounce select-none pointer-events-none"
          style={{
            top: `${15 + i * 13}%`,
            right: `${8 + (i % 3) * 6}%`,
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${2.5 + i * 0.3}s`
          }}>
          {em}
        </div>
      ))}
      {/* Floating food emojis */}
      {["🥑","🫐","🥦","🍎","🥕","🫚"].map((em, i) => (
        <div key={i} className="absolute text-2xl opacity-20 animate-bounce select-none pointer-events-none"
          style={{
            top: `${15 + i * 13}%`,
            left: `${8 + (i % 3) * 6}%`,
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${2.5 + i * 0.3}s`
          }}>
          {em}
        </div>
      ))}
      <ScrollToTop></ScrollToTop>
      <Navbar />
      <div className="flex-grow"> 
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
