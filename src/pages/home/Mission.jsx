/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

export default function Mission() {
  const purposes = [
    { emoji: "🥑", label: "Nutrition Focused", color: "bg-[#DCEDC8]" }, // Lime light
    { emoji: "⚖️", label: "BMI Based", color: "bg-[#E0F7FA]" }, // Cyan light
    { emoji: "💊", label: "Medicine Guided", color: "bg-[#F3E5F5]" }, // Purple light
    { emoji: "🩺", label: "Health Insights", color: "bg-[#FFF3E0]" }, // Orange light
  ];

  return (
    <section className="py-24"> {/* Cream background */}
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-[#77be0dee] font-black text-sm uppercase tracking-[0.2em]">
            Our Purpose
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#41431B] mt-3 mb-10 leading-tight">
            Vision & Mission
          </h2>

          <div className="space-y-6">
            {/* Mission Card - Restored Gradient Color */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 shadow-sm transition-all duration-300">
              <div className="flex items-start gap-5">
                <div className="text-4xl bg-white p-3 rounded-2xl shadow-sm">🎯</div>
                <div>
                  <h3 className="text-xl font-black text-[#41431B] mb-2">Our Mission</h3>
                  <p className="text-[#41431B]/70 text-sm leading-relaxed">
                    To provide BMI-based personalized food, medicine, and lifestyle guidance for healthier living — making health information simple, accessible, and easy to understand for everyone.
                  </p>
                </div>
              </div>
            </div>

            {/* Vision Card - Restored Gradient Color */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100 shadow-sm transition-all duration-300">
              <div className="flex items-start gap-5">
                <div className="text-4xl bg-white p-3 rounded-2xl shadow-sm">🌟</div>
                <div>
                  <h3 className="text-xl font-black text-[#41431B] mb-2">Our Vision</h3>
                  <p className="text-[#41431B]/70 text-sm leading-relaxed">
                    To become a trusted digital platform helping people understand and improve their health, powered by research-based information and standard health guidelines.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Visual Grid */}
        <div className="grid grid-cols-2 gap-6">
          {purposes.map((item, index) => (
            <motion.div 
              key={item.label} 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className={`aspect-square rounded-[2.5rem] ${item.color} flex flex-col items-center justify-center shadow-sm border border-white`}
            >
              <motion.div 
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-3"
              >
                {item.emoji}
              </motion.div>
              <div className="font-black text-[#41431B] text-center text-xs md:text-sm uppercase tracking-tight px-2">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}