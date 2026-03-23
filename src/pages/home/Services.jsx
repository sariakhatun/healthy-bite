/* eslint-disable no-unused-vars */
import React from "react";
import { FaCalculator, FaUtensils, FaMedkit } from "react-icons/fa";
import { motion } from "framer-motion";
import SectionTitle from "../shared/SectionTitle";

const servicesData = [
  {
    icon: <FaCalculator />,
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index using height and weight to understand your health condition.",
    bgColor: "bg-[#E0F7FA]", // Light Cyan for BMI
    iconColor: "text-[#00ACC1]",
    list: ["Height & weight input", "BMI result", "Health category status"]
  },
  {
    icon: <FaUtensils />,
    title: "Food Recommendation",
    description: "Get healthy food suggestions based on your specific BMI category and lifestyle.",
    bgColor: "bg-[#FFF3E0]", // Light Orange for Food
    iconColor: "text-[#FB8C00]",
    list: ["BMI-based meal plans", "Breakfast, Lunch, Dinner", "Healthy alternatives"]
  },
  {
    icon: <FaMedkit />,
    title: "Medicine Guidance",
    description: "Basic medicine and supplement suggestions according to your BMI and health needs.",
    bgColor: "bg-[#F3E5F5]", // Light Purple for Medicine
    iconColor: "text-[#8E24AA]",
    list: ["BMI-based info", "Supplement guidance", "Consultation reminders"]
  },
];

const OurServices = () => {
  return (
    <section className="px-6 py-20 max-w-6xl mx-auto  rounded-[3rem] ">
      {/* Section Title */}
      <div className="text-center mb-16">
        <SectionTitle title="Our Services" />
      </div>

      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        {servicesData.map((service, index) => (
          <motion.div
            key={index}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className={`p-8 rounded-[2.5rem] flex flex-col items-center text-center space-y-5 transition-all duration-300 shadow-md hover:shadow-xl ${service.bgColor}`}
          >
            {/* Icon with Animation */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className={`text-5xl p-4 bg-white rounded-2xl shadow-sm ${service.iconColor}`}
            >
              {service.icon}
            </motion.div>

            <h3 className="text-2xl font-black text-[#41431B]">{service.title}</h3>
            
            <p className="text-[#41431B]/80 text-sm leading-relaxed">
              {service.description}
            </p>

            {/* Feature List (Matching your image) */}
            <div className="w-full text-left bg-white/50 p-5 rounded-2xl space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#41431B]/50">Includes:</span>
              <ul className="text-xs md:text-sm text-[#41431B]/90 space-y-1">
                {service.list.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#77be0dee]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;