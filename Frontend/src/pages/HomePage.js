import React from "react";
import "../App.css";
import { Link} from "react-router-dom";

const HomePage = () => {
  return (
    <>

      <div className="relative min-h-screen min-w-screen bg-[url(./image/Homebg.jpg)] bg-cover bg-center bg-fixed">
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-6">

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-center mb-6">
            Experience the Power of <span className="text-cyan-400">AI</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl text-center mb-10">
            Chat smarter, faster, and more efficiently with our AI-powered assistant.
            Built to help you learn, create, and solve problems effortlessly.
          </p>

          {/* Buttons */}
          <div className="flex gap-6 mb-16">
            <Link to={'/Login'} className="px-8 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-600 transition font-semibold">
              Login
            </Link >

            <Link to={'/register'} className="px-8 py-3 rounded-lg border border-white hover:bg-white hover:text-black transition font-semibold">
             Create Account
            </Link >
          </div> 
        </div>
      </div>
    </>
  );
};

export default HomePage;
