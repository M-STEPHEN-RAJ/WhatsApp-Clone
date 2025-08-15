import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/whatsapp-logo.svg";
import back from "../assets/back.png";
import login_img from "../assets/login-img.png";
import bio_img from "../assets/bio.png";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";

const SignUp = () => {

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [showBio, setShowBio] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("Hey there I am using Stephen's WhatsApp!");
  const [agreed, setAgreed] = useState(false);

  const validateSignUp = async () => {
    
    if( !fullName || !email || !password ) {
        toast.error("All fields are required.");
        return;
    }

    if (!agreed) {
        toast.error("Agree to the Terms & Privacy Policy.");
        return;
    }

    setShowBio(true); 

  }

  const onSignUp = async (e) => {

    e.preventDefault();

    const success = await login("signup", {
      fullName,
      email,
      password,
      bio: bio.trim() || "Hey there I am using Stephen's WhatsApp!",
    });

    if (success) {
      navigate("/chat");
    }

  };

  return (
    <>
      <div className="flex justify-center items-center h-screen w-full">
        <div className="relative max-w-[400px] w-[90%] sm:max-w-max sm:w-auto h-[590px] flex flex-col justify-center items-center gap-5 py-8 md:py-2 lg:py-4 xl:py-8 px-4 sm:px-8 md:px-6 lg:px-8 xl:px-12 bg-white/5 rounded-xl backdrop-blur-md border border-white/20 shadow-lg z-10">
          <div onClick={() => navigate('/')} className="absolute top-5 left-5 p-2 hover:bg-white/10 rounded-full flex justify-center items-center cursor-pointer">
            <img className="w-3.5" src={back} alt="" />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 mb-5">
            <img src={logo} className="w-10 h-10 lg:w-14 lg:h-14" alt="" />
            <h2 className="text-white font-semibold text-xl">
              SignUp to WhatsApp
            </h2>
          </div>

          <div className="w-full sm:w-[400px] md:w-[320px] lg:w-[400px] flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <label className="text-white font-medium" htmlFor="name">
                Full Name
              </label>
              <input
                className="outline-none text-white border-b border-b-gray-400 focus:border-b-[#14C861] pb-1"
                placeholder="Enter your name"
                type="text"
                id="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-white font-medium" htmlFor="mail">
                E-mail
              </label>
              <input
                className="outline-none text-white border-b border-b-gray-400 focus:border-b-[#14C861] pb-1"
                placeholder="Enter your mail"
                type="email"
                id="mail"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="w-[90%] sm:w-[400px] md:w-[320px] lg:w-[400px] flex gap-3 mt-2">
            <input
              className="accent-[#14C861] w-4 cursor-pointer"
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <label className="text-gray-300 text-sm">
              Agree to the{" "}
              <span className="text-blue-400 cursor-pointer">Terms of use</span>{" "}
              and{" "}
              <span className="text-blue-400 cursor-pointer">
                Privacy Policy
              </span>
            </label>
          </div>

          <button
            onClick={() => {validateSignUp()}}
            className="bg-[#14C861] hover:bg-[#14D261] px-10 py-1.5 my-2 font-semibold rounded-3xl cursor-pointer"
          >
            Create Account
          </button>

          <div className="flex flex-col gap-5">
            <p className="text-gray-300 text-sm">
              Already have an account?{" "}
              <a
                onClick={() => navigate("/login")}
                className="text-[#14C861] cursor-pointer font-semibold ml-2"
              >
                Login
              </a>
            </p>
          </div>
        </div>

        <div className="hidden relative -left-1 bg-[#2A2A2A] md:flex flex-col justify-center items-center gap-10 md:w-[400px] lg:w-[500px] xl:w-[700px] md:h-[590px] lg:h-[590px] xl:h-[590px] border border-white/20 border-l-transparent rounded-r-xl">
          <img className="w-60 h-60 lg:w-80 lg:h-80" src={login_img} alt="" />
          <div className="flex flex-col gap-2">
            <h2 className="text-white font-bold text-center text-xl lg:text-2xl leading-8 tracking-wide">
              Welcome to WhatsApp Clone
            </h2>
            <h3 className="text-white lg:font-semibold text-center lg:text-xl leading-8">
              Let&apos;s get started!
            </h3>
          </div>
          <p className="text-gray-400 text-sm mt-5">End-to-end encrypted</p>
        </div>

        {showBio && (
          <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/70">
            <div className="relative flex flex-col justify-center items-center border border-white/20 bg-[#282828] w-[400px] p-6 rounded-lg shadow-lg">
              <div
                onClick={() => setShowBio(false)}
                className="absolute top-6 left-5 p-2 hover:bg-white/10 rounded-full flex justify-center items-center cursor-pointer"
              >
                <img className="w-3.5" src={back} alt="" />
              </div>

              <img className="w-[280px] p-2" src={bio_img} alt="" />

              <div
                onClick={onSignUp}
                className="absolute top-6 right-5 cursor-pointer px-3 py-1 rounded-3xl hover:bg-white/10"
              >
                <p className="text-gray-300">Skip</p>
              </div>

              <div className="w-full flex flex-col justify-center items-center gap-5 mt-2">
                <h2 className="text-white font-medium text-xl">
                  Let&apos;s personalize your profile!
                </h2>

                <textarea
                  className="w-full px-3 py-2 rounded-md outline-none border border-white/20 text-white resize-none"
                  rows={4}
                  placeholder="Enter your bio..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                >
                
                </textarea>

                <button
                  onClick={onSignUp}
                  className="bg-[#14C861] hover:bg-[#14D261] px-10 py-1.5 rounded-3xl font-medium cursor-pointer"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SignUp;
