import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SocialLogin from "./SocialLogin";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const {createUser} = useAuth();
  let navigate = useNavigate()

 const onSubmit = (data) => {
  console.log(data);

  createUser(data.email, data.password)
    .then((res) => {
      console.log(res.user);

      Swal.fire({
            title: "Login Successful!",
            text: "Welcome back 🎉",
            icon: "success",
            timer: 1500, 
            showConfirmButton: false,
          });
    
          setTimeout(() => {
            navigate("/");
          }, 1500);
        })
    .catch((error) => {
      console.error("error", error);

      Swal.fire({
        title: "Registration Failed!",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#d33",
      });
    });
};

  return (
    <div className="min-h-screen bg-[#F8F3E1] flex items-center justify-center py-20 px-4">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row-reverse items-center justify-center gap-16">
        
        {/* Register Card */}
        <div className="flex-1 w-full max-w-lg">
          <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-[#41431B]/5">
            <h2 className="text-3xl font-black text-[#41431B] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Create Account
            </h2>
            <p className="text-[#41431B]/60 mb-8 text-sm">Join HealthyBite for a better lifestyle.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Full Name - Full Width */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-[#41431B]/50 mb-2 ml-1">Full Name</label>
                <input type="text" {...register("name")} placeholder="Saria Khatun" className="w-full px-5 py-4 rounded-2xl bg-[#F8F3E1]/50 border-transparent focus:border-[#77be0dee] outline-none transition-all" />
              </div>

              {/* Photo URL - Updated to Full Width */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-[#41431B]/50 mb-2 ml-1">Photo URL</label>
                <input type="text" {...register("photo")} placeholder="image-link.png" className="w-full px-5 py-4 rounded-2xl bg-[#F8F3E1]/50 border-transparent focus:border-[#77be0dee] outline-none transition-all" />
              </div>

              {/* Email Address - Full Width */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-[#41431B]/50 mb-2 ml-1">Email Address</label>
                <input type="email" {...register("email")} placeholder="saria@ju.edu" className="w-full px-5 py-4 rounded-2xl bg-[#F8F3E1]/50 border-transparent focus:border-[#77be0dee] outline-none transition-all" />
              </div>

              {/* Password - Updated to Full Width */}
              <div className="md:col-span-2 relative">
                <label className="block text-xs font-bold uppercase tracking-widest text-[#41431B]/50 mb-2 ml-1">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    {...register("password")} 
                    placeholder="••••••••" 
                    className="w-full px-5 py-4 rounded-2xl bg-[#F8F3E1]/50 border-transparent focus:border-[#77be0dee] outline-none transition-all" 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#41431B]/40 hover:text-[#77be0dee] transition-colors"
                  >
                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit" className="md:col-span-2 w-full bg-[#77be0dee] text-[#41431B] py-5 rounded-2xl font-black hover:bg-[#65a308] transition-all shadow-lg shadow-[#77be0dee]/20 uppercase tracking-widest text-xs mt-4">
                Sign Up Now
              </button>
            </form>

            <div className="my-8 text-center">
              <span className="text-[10px] font-bold text-[#41431B]/30 uppercase tracking-[0.3em]">Or use social</span>
            </div>

            <SocialLogin />

            <p className="text-center mt-8 text-sm text-[#41431B]/60">
              Already a member? <Link to="/login" className="text-[#77be0dee] font-bold">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;