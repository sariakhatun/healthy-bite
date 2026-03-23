/* eslint-disable no-unused-vars */
import React from "react";
import { FaBullseye, FaLightbulb } from "react-icons/fa";
import { motion } from "framer-motion";
import SectionTitle from "../shared/SectionTitle";

const AboutUs = () => {
  return (
    <section className="px-6 max-w-6xl mx-auto my-24 overflow-hidden">
      <SectionTitle title="About Us" />

      <div className="lg:flex justify-between items-center gap-12 xl:gap-20">
        {/* Left Side: Image with your custom border style */}
        <motion.div
          className="hidden lg:block flex-1"
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="relative group">
            <img
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2070&auto=format&fit=crop"
              alt="About Healthy Bite"
              className="w-full max-w-[480px] h-[550px] object-cover rounded-[2.5rem] border-b-[10px] border-r-[10px] border-[#77be0dee]/50  transition-transform duration-500 group-hover:scale-[1.01]"
            />
            {/* Decorative soft glow */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#77be0dee]/15 rounded-full blur-3xl -z-10" />
          </div>
        </motion.div>

        {/* Right Side: Text & Mission/Vision Cards */}
        <div className="flex flex-col gap-10 flex-1">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-xl sm:text-2xl text-format font-black text-[#41431B] leading-[1.15]">
              Discover our story, <br />
              <span className="text-[#77be0dee]">our purpose</span>, and where
              we’re headed.
            </h3>
            <p className="">
              At **HealthyBite**, we bridge the gap between complex health data
              and daily lifestyle choices. Many struggle to find accurate food
              guides; our system provides reliable BMI-based insights to help
              you take the first step toward a healthier lifestyle.
            </p>
            <p>
              We are a smart health platform designed to help people make better
              lifestyle choices based on their Body Mass Index (BMI). Our system
              analyzes your BMI and provides personalized food recommendations
              along with general medicine guidance to support a healthier and
              more balanced life. We aim to make health information simple,
              accessible, and easy to understand for everyone. Many people
              struggle to know what food is right for their body weight or when
              basic medical guidance is needed. Our platform bridges that gap by
              offering BMI-based suggestions that help users take the first step
              toward a healthier lifestyle. We focus on research-based
              information and standard health guidelines to ensure reliability
              and safety.
            </p>
          </motion.div>

          {/* Cards Grid */}

          {/* Learn More Button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
              <button className="px-6 py-2.5 border-2 border-[#77be0dee] text-[#77be0dee] rounded-full  hover:bg-[#77be0dee] hover:text-white transition-all backdrop-blur-sm active:scale-95">
                           Read More
                          </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
