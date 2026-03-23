/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import SectionTitle from "../shared/SectionTitle";

const steps = [
  { num: "01", title: "Enter Your Details", desc: "Input your height, weight, and age to calculate your BMI instantly.", emoji: "📏", color: "bg-[#DCEDC8]" },
  { num: "02", title: "Get Your BMI Result", desc: "See your BMI category — Underweight, Normal, Overweight, or Obese.", emoji: "📊", color: "bg-[#E0F7FA]" },
  { num: "03", title: "Receive Food Plan", desc: "Get personalized daily, weekly, and monthly meal plans tailored to you.", emoji: "🥗", color: "bg-[#F3E5F5]" },
  { num: "04", title: "Book a Doctor", desc: "Schedule an appointment with a certified health professional if needed.", emoji: "👨‍⚕️", color: "bg-[#FFF3E0]" },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center mb-20">
          <SectionTitle title="How It Works" />
          <p className="text-[#41431B]/70 mt-4 max-w-xl mx-auto font-medium">
            Follow these four simple steps to start your journey towards a healthier lifestyle.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-4 gap-8 lg:gap-10">
          {steps.map((step, i) => (
            <motion.div 
              key={step.num} 
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Connecting Line (Only for desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-14 left-full w-full h-[2px] bg-dashed border-t-2 border-dashed border-[#77be0dee]/30 z-0" 
                     style={{ width: 'calc(100% - 2rem)', left: 'calc(50% + 2rem)' }} 
                />
              )}

              {/* Step Card */}
              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Emoji Circle */}
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-24 h-24 ${step.color} rounded-[2rem] flex items-center justify-center text-5xl shadow-sm border-4 border-white mb-6 transition-all group-hover:shadow-lg`}
                >
                  {step.emoji}
                </motion.div>

                {/* Number Badge */}
                <div className="bg-[#41431B] text-[#77be0dee] text-xs font-black px-3 py-1 rounded-full mb-4">
                  STEP {step.num}
                </div>

                {/* Content */}
                <h3 className="font-black text-[#41431B] text-lg mb-3 leading-tight group-hover:text-[#77be0dee] transition-colors">
                  {step.title}
                </h3>
                <p className="text-[#41431B]/70 text-sm leading-relaxed px-2">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}