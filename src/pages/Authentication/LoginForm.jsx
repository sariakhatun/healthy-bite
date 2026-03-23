/* eslint-disable no-unused-vars */
import React, { use, useState } from "react"; 
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import SocialLogin from "./SocialLogin";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import Swal from "sweetalert2";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const [showPassword, setShowPassword] = useState(false);

  const {loginUser}=use(AuthContext)
  let navigate = useNavigate()

 const onSubmit = (data) => {
  console.log("Login form data:", data);

  loginUser(data.email, data.password)
    .then((result) => {
      console.log(result.user);

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
      console.error(error);

      Swal.fire({
        title: "Login Failed!",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#d33",
      });
    });
};

  return (
    <div className="min-h-screen bg-[#F8F3E1] flex items-center justify-center py-20 px-4">
      <div className="max-w-5xl w-full flex flex-col lg:flex-row items-center justify-center gap-16">
        
        {/* Right Side: Login Card */}
        <div className="flex-1 w-full max-w-md">
          <div className="bg-white p-10 rounded-[40px] shadow-2xl shadow-[#41431B]/5 border border-[#41431B]/5">
            <h2 className="text-3xl font-black text-[#41431B] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Welcome Back!
            </h2>
            <p className="text-[#41431B]/60 mb-8 text-sm">Please enter your details to sign in.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#41431B]/50 mb-2 ml-1">Email</label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="hello@reallygreatsite.com"
                  className="w-full px-5 py-4 rounded-2xl bg-[#F8F3E1]/50 border border-transparent focus:border-[#77be0dee] focus:bg-white outline-none transition-all"
                />
              </div>

              {/* Password Field with Toggle */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#41431B]/50 mb-2 ml-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", { required: true })}
                    placeholder="••••••••"
                    className="w-full px-5 py-4 rounded-2xl bg-[#F8F3E1]/50 border border-transparent focus:border-[#77be0dee] focus:bg-white outline-none transition-all"
                  />
                  {/* Eye Icon Button */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#41431B]/40 hover:text-[#77be0dee] transition-colors"
                  >
                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
              </div>

              <button className="w-full bg-[#41431B] text-white py-5 rounded-2xl font-bold hover:bg-[#2d2f13] transition-all shadow-lg shadow-[#41431B]/20 uppercase tracking-widest text-xs">
                Login Account
              </button>
            </form>

            <div className="my-8 flex items-center gap-4">
              <div className="flex-1 h-[1px] bg-[#41431B]/10"></div>
              <span className="text-[10px] font-bold text-[#41431B]/30 uppercase tracking-widest">Or login with</span>
              <div className="flex-1 h-[1px] bg-[#41431B]/10"></div>
            </div>

            <SocialLogin />

            <p className="text-center mt-8 text-sm text-[#41431B]/60">
              Don't have an account? <Link to="/register" className="text-[#77be0dee] font-bold">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;