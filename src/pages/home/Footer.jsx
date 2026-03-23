/* eslint-disable no-unused-vars */
import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const LeafIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 4-8 4s1 5-3 5c-1 0-2-.5-2.5-1.5" />
  </svg>
);

export default function Footer() {
  const socialIcons = [
    { icon: <FaFacebookF />, link: "#" },
    { icon: <FaTwitter />, link: "#" },
    { icon: <FaLinkedinIn />, link: "#" },
  ];

  return (
  
    <footer className="bg-black text-white/70 py-16 w-full mt-auto">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Socials */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#d0f236] to-[#77be0dee] flex items-center justify-center text-[#41431B]">
                <LeafIcon />
              </div>
              <span 
                className="text-2xl font-black text-white tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Healthy<span className="text-[#77be0dee]">Bite</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6 text-white/60">
              Your smart health companion for BMI-based food, medicine, and doctor guidance. Let's make healthy living easier.
            </p>
            <div className="flex gap-3">
              {socialIcons.map((s, i) => (
                <a
                  key={i}
                  href={s.link}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-sm text-white/80 hover:bg-[#77be0dee] hover:text-[#41431B] transition-all duration-300 border border-white/10"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="text-white font-bold text-base mb-6 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              {["Food Suggestions", "BMI Calculator", "About Us", "Contact Us"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm hover:text-[#77be0dee] transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="text-white font-bold text-base mb-6 uppercase tracking-wider">Services</h4>
            <ul className="space-y-3">
              {["Food Plans", "Medicine Guide", "Doctor Booking", "Exercise Tips"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm hover:text-[#77be0dee] transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-base mb-6 uppercase tracking-wider">Contact</h4>
            <div className="space-y-4 text-sm">
              <p className="leading-relaxed">
                123 Health Street, <br />
                Dhaka, Bangladesh
              </p>
              <p className="font-bold text-[#77be0dee]">+880 1712-345678</p>
              <p className="hover:text-[#77be0dee] cursor-pointer">support@healthybite.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:grid md:grid-cols-3 items-center gap-6 pb-0">
          <p className="text-xs text-white/40 text-center md:text-left">
            © 2026 HealthyBite. Built with ❤️ for a better life.
          </p>
          <div className="flex gap-8 text-xs font-medium justify-center">
            <a href="#" className="hover:text-[#77be0dee] transition-colors uppercase tracking-widest">Privacy Policy</a>
            <a href="#" className="hover:text-[#77be0dee] transition-colors uppercase tracking-widest">Terms</a>
          </div>
          <div className="text-right hidden md:block">
            <span className="text-[10px] text-white/20 uppercase tracking-[0.2em]">Saria Khatun Proj.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}