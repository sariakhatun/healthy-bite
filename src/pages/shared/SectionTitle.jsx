/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

const SectionTitle = ({ title }) => {
  return (
    <div className="relative text-center mb-14">
      {/* Background Large Text (Outline Style) */}
      <motion.h2
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-[45px] sm:text-6xl md:text-[80px] lg:text-[100px] font-black uppercase text-[#41431B] select-none"
      >
        {title.toUpperCase()}
      </motion.h2>

      {/* Main Foreground Title */}
      <p
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl sm:text-4xl md:text-5xl font-black text-[#41431B] whitespace-nowrap drop-shadow-sm"
      >
        {title}
        {/* Underline design to match your logo */}
        <span className="block h-1.5 w-1/3 bg-[#77be0dee] mx-auto mt-1 rounded-full"></span>
      </p>
    </div>
  );
};

export default SectionTitle;