/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const LeafIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-20 h-20">
    <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 4-8 4s1 5-3 5c-1 0-2-.5-2.5-1.5" />
  </svg>
);

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 bg-[#F8F3E1]">
      <div className="text-center">
        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="flex justify-center text-[#77be0dee] mb-8"
        >
          <LeafIcon />
        </motion.div>

        {/* 404 Text */}
        <h1 
          className="text-9xl font-black text-[#41431B] opacity-10 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none select-none"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          404
        </h1>

        <div className="relative z-10">
          <h2 
            className="text-4xl md:text-5xl font-black text-[#41431B] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Oops! Page Not Found
          </h2>
          <p className="text-[#41431B]/60 max-w-md mx-auto mb-10 text-lg font-medium">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full bg-[#77be0dee] text-white font-bold shadow-lg shadow-[#77be0dee]/20 hover:bg-[#65a308] transition-all text-sm uppercase tracking-wider"
              >
                Back to Home
              </motion.button>
            </Link>
            
            <button 
              onClick={() => window.history.back()}
              className="px-8 py-3 rounded-full border-2 border-[#41431B]/20 text-[#41431B] font-bold hover:bg-[#41431B]/5 transition-all text-sm uppercase tracking-wider"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}