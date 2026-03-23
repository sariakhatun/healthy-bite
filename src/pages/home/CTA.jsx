/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="py-24 bg-transparent">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Main CTA Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-[#41431B] rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl shadow-[#41431B]/20"
        >
          {/* Decorative Elements */}
          <div className="absolute top-[-20%] right-[-10%] opacity-10 text-[15rem] flex items-center justify-center pointer-events-none select-none">
            🌿
          </div>
          <div className="absolute bottom-[-10%] left-[-5%] opacity-10 text-[10rem] flex items-center justify-center pointer-events-none select-none rotate-45">
            🥗
          </div>

          {/* Content */}
          <span className="text-[#77be0dee] font-black text-xs md:text-sm uppercase tracking-[0.3em] mb-4 block">
            Your Journey Starts Here
          </span>
          
          <h2 className="text-3xl md:text-5xl font-black mt-2 mb-6 leading-tight max-w-2xl mx-auto">
            Ready to <span className="text-[#77be0dee]">Transform</span> Your Lifestyle?
          </h2>
          
          <p className="text-white/80 mb-10 max-w-xl mx-auto leading-relaxed text-sm md:text-lg">
            Join thousands of users who have already started their personalized journey with HealthyBite’s BMI-based nutrition and health plans.
          </p>

          {/* Buttons - Now matches Navbar size */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 rounded-full bg-[#77be0dee] text-[#41431B] font-bold hover:bg-[#8ee012] transition-colors shadow-md text-sm uppercase tracking-wider"
            >
              Get Started Free
            </motion.button>
            
            <motion.button 
              whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              className="px-6 py-2.5 rounded-full border-2 border-white/30 text-white font-bold transition-all text-sm uppercase tracking-wider"
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}