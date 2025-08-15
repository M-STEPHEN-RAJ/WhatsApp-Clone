import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/whatsapp-logo.svg";
import back from "../assets/back.png";
import login_img from "../assets/login-img.png";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const success = await login("login", {
      email,
      password,
    });

    if (success) {
      navigate("/chat");
    }
  };    

  return (
    <>
      <div className="flex justify-center items-center h-screen w-full">
        <div className="relative max-w-[400px] w-[90%] sm:max-w-max sm:w-auto h-[550px] sm:h-[590px] md:h-[590px] lg:h-[590px] xl:h-[590px] flex flex-col justify-center items-center gap-5 py-8 md:py-2 lg:py-4 xl:py-8 px-4 sm:px-8 md:px-4 lg:px-8 xl:px-12 bg-white/5 rounded-xl backdrop-blur-md border border-white/20 shadow-lg z-10">
          <div onClick={() => navigate('/')} className="absolute top-5 left-5 p-2 hover:bg-white/10 rounded-full flex justify-center items-center cursor-pointer">
            <img className="w-3.5" src={back} alt="" />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 mb-5">
            <img src={logo} className="w-10 h-10 lg:w-14 lg:h-14" alt="" />
            <h2 className="text-white font-semibold md:text-lg lg:text-xl">
              Login to WhatsApp
            </h2>
          </div>

          <div className="w-full sm:w-[400px] md:w-[320px] lg:w-[400px] flex flex-col gap-7">
            <div className="flex flex-col gap-3">
              <label className="text-white font-medium" htmlFor="mail">
                E-mail
              </label>
              <input
                className="outline-none text-white border-b border-b-gray-400 focus:border-b-[#14C861] pb-1"
                placeholder="Enter your mail"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-white font-medium" htmlFor="password">
                Password
              </label>
              <input
                className="outline-none text-white border-b border-b-gray-400 focus:border-b-[#14C861] pb-1"
                placeholder="Enter your password"
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="bg-[#14C861] hover:bg-[#14D261] px-16 lg:px-[75px] py-1.5 my-2 font-semibold rounded-3xl cursor-pointer mt-10"
          >
            Login
          </button>

          <div className="mt-2">
            <p className="text-gray-300 text-sm">
              Create an account?{" "}
              <a
                onClick={() => navigate("/signup")}
                className="text-[#14C861] cursor-pointer font-semibold ml-2"
              >
                SignUp
              </a>
            </p>
          </div>
        </div>

        <div className="hidden relative -left-1 bg-[#2A2A2A] md:flex flex-col justify-center items-center gap-10 md:w-[400px] lg:w-[500px] xl:w-[700px] md:h-[590px] lg:h-[590px] xl:h-[590px] border border-white/20 border-l-transparent rounded-r-xl">
          <img className="w-60 h-60 lg:w-80 lg:h-80" src={login_img} alt="" />
          <div className="flex flex-col gap-2">
            <h2 className="text-white font-bold text-center text-xl lg:text-2xl leading-8 tracking-wide">
              Welcome back to WhatsApp Clone
            </h2>
            <h3 className="text-white lg:font-semibold text-center lg:text-xl leading-8">
              Please log in to continue!
            </h3>
          </div>
          <p className="text-gray-400 text-sm mt-5">End-to-end encrypted</p>
        </div>
      </div>
    </>
  );
};

export default Login;
