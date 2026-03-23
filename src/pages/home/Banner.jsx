/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { MdOutlineArrowOutward } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const slides = [
    {
      url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
      title: "Only Eat Healthy Food",
      subtitle: "Discover the perfect diet plan tailored just for your body and lifestyle.",
      buttonText: "Browse Food",
      secondaryBtn: "Calculate BMI"
    },
    {
      url: "https://images.unsplash.com/photo-1467453678174-768ec283a940?w=1600&auto=format&fit=crop",
      title: "Smart Meal Recommendations",
      subtitle: "Get personalized food suggestions based on your BMI and health goals.",
      buttonText: "View Meals",
      secondaryBtn: "Learn More"
    },
    {
      url: "https://images.unsplash.com/photo-1505682750263-f3f9e519c565?q=80&w=1600&auto=format&fit=crop",
      title: "Track Your Health Daily",
      subtitle: "Stay updated with medicine reminders and physical exercise tracking.",
      buttonText: "Get Started",
      secondaryBtn: "View Plans"
    }
  ];

  return (
    <div className="relative h-[80vh] md:h-[90vh] w-full overflow-hidden">
      <Swiper
        onSwiper={setSwiperInstance}
        effect={"fade"}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[EffectFade, Navigation, Autoplay]}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full h-full flex items-center justify-center"
              style={{
                backgroundImage: `url(${slide.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Dark Overlay for better text visibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />

              {/* Centered Content with max-w-6xl */}
              <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10">
                <div className="max-w-2xl space-y-6">
                  <AnimatePresence mode="wait">
                    {activeIndex === index && (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      >
                        <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
                          {slide.title.split(' ').slice(0, -2).join(' ')} <br />
                          <span className="text-[#77be0dee]">
                            {slide.title.split(' ').slice(-2).join(' ')}
                          </span>
                        </h1>
                        <p className="mt-4 md:text-lg text-gray-200 max-w-md">
                          {slide.subtitle}
                        </p>
                        <div className="flex flex-wrap gap-4 mt-8">
                          {/* Primary Action Button */}
                          <button className="px-6 py-2.5 bg-[#77be0dee] text-white rounded-full  flex items-center gap-2 hover:bg-[#65a308ee] transition-all shadow-lg shadow-lime-900/20 active:scale-95">
                            {slide.buttonText} <MdOutlineArrowOutward />
                          </button>
                          {/* Secondary Action Button */}
                          <button className="px-6 py-2.5 border-2 border-[#77be0dee] text-[#77be0dee] rounded-full  hover:bg-[#77be0dee] hover:text-white transition-all backdrop-blur-sm active:scale-95">
                            {slide.secondaryBtn}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Optional: Navigation Arrows (If you want them visible) */}
      <style dangerouslySetInnerHTML={{ __html: `
        .swiper-button-next, .swiper-button-prev { color: white !important; transform: scale(0.6); }
        .swiper-button-next:after, .swiper-button-prev:after { font-weight: bold; }
      `}} />
    </div>
  );
};

export default Banner;