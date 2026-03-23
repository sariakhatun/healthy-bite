/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import SectionTitle from "../shared/SectionTitle";

const testimonials = [
  { 
    name: "Rahim Ahmed", 
    loc: "Dhaka", 
    text: "Healthy Bite helped me understand my BMI and gave me a perfect meal plan. Lost 8kg in 2 months!", 
    rating: 5, 
    avatar: "👨",
    bgColor: "bg-[#DCEDC8]/30" 
  },
  { 
    name: "Fatema Khatun", 
    loc: "Chittagong", 
    text: "The food suggestions are so easy to follow. Breakfast, lunch, dinner — everything planned for me!", 
    rating: 5, 
    avatar: "👩", 
    bgColor: "bg-[#E0F7FA]/30"
  },
  { 
    name: "Karim Hossain", 
    loc: "Sylhet", 
    text: "I booked a doctor appointment through the platform. Super smooth experience. Highly recommend!", 
    rating: 5, 
    avatar: "🧑",
    bgColor: "bg-[#FFF3E0]/30"
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-transparent">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <SectionTitle title="What People Say" />
          <p className="text-[#41431B]/70 mt-4 font-medium uppercase tracking-widest text-xs">
            Testimonials from our happy users
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div 
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className={`relative p-8 rounded-[2.5rem] border border-white shadow-sm hover:shadow-xl transition-all duration-300 ${t.bgColor} backdrop-blur-sm`}
            >
              {/* Star Ratings */}
              <div className="flex gap-1 mb-5">
                {[...Array(t.rating)].map((_, i) => (
                  <FaStar key={i} className="text-[#FB8C00] text-sm" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-[#41431B] text-base italic leading-relaxed mb-8">
                "{t.text}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl border border-[#41431B]/5">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-black text-[#41431B] text-sm uppercase tracking-tight">
                    {t.name}
                  </div>
                  <div className="text-xs text-[#77be0dee] font-bold">
                    {t.loc}, Bangladesh
                  </div>
                </div>
              </div>

              {/* Decorative Quote Mark */}
              <div className="absolute top-6 right-8 text-6xl text-[#41431B]/5 font-serif select-none">
                "
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}