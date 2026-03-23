import React, { use } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const SocialLogin = () => {
    const {singInWithGoogle}=use(AuthContext);
    let navigate = useNavigate()
 const handleGoogleSignIn = () => {
    singInWithGoogle()
      .then(res => {
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
      .catch(error => {
        console.log(error);

        Swal.fire({
          title: "Login Failed!",
          text: error.message,
          icon: "error",
          confirmButtonColor: "#d33",
        });
      });
  };
  return (
    <button onClick={handleGoogleSignIn} className="w-full flex items-center justify-center gap-3 px-4 py-4 border-2 border-[#41431B]/5 rounded-2xl bg-white hover:bg-[#F8F3E1] transition-all group">
      <FcGoogle className="text-2xl group-hover:rotate-12 transition-transform" />
      <span className="text-sm font-bold text-[#41431B]">Continue with Google</span>
    </button>
  );
};

export default SocialLogin;