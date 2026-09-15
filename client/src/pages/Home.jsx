import React, { useEffect, useState } from "react";
import { useLocation, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { HiPlus } from "react-icons/hi2";
import "../components/component.css";

function Home() {
  const location = useLocation();
  const isRootPath = location.pathname === "/" || location.pathname === "";
  const [isNewRoomOpen, setIsNewRoomOpen] = useState(false);

  useEffect(() => {
    if (isRootPath) {
      document.title = "QuickConnect";
    }
  }, [isRootPath]);

  return (
    <div className="flex h-screen w-screen bg-[#080E18] text-slate-100 overflow-hidden relative selection:bg-cyan-500 selection:text-white">
      {/* Sidebar Component */}
      <Sidebar
        isNewOpenExternal={isNewRoomOpen}
        setIsNewOpenExternal={setIsNewRoomOpen}
      />

      {/* Main Content Area */}
      <main className="flex-1 ml-[280px] sm:ml-[320px] md:ml-[340px] h-screen relative overflow-hidden bg-[#080E18]">
        {/* If a room route is active, render Outlet */}
        <Outlet />

        {/* Welcome Screen (Active when no specific room is selected) */}
        <AnimatePresence mode="wait">
          {isRootPath && (
            <motion.div
              key="welcome-screen"
              className="absolute inset-0 w-full h-full flex flex-col justify-center items-center overflow-hidden z-10 select-none px-6"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {/* Layered Abstract Dark Waves & Glow Background */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Top-Left Soft Cyan Radial Glow */}
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#00d2ff]/10 rounded-full blur-3xl"></div>

                {/* Center Soft Blue Glow */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-[#0072ff]/10 rounded-full blur-[100px]"></div>

                {/* Bottom-Right Layered Wavy Curved Shapes */}
                <svg
                  className="absolute bottom-0 right-0 w-[85%] max-w-[900px] h-auto opacity-75"
                  viewBox="0 0 900 500"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M150 500C320 380 480 430 650 300C780 200 850 160 900 120V500H150Z"
                    fill="#0B1A2C"
                    fillOpacity="0.8"
                  />
                  <path
                    d="M0 500C180 390 380 420 540 330C720 230 800 160 900 80V500H0Z"
                    fill="#0D223A"
                    fillOpacity="0.6"
                  />
                  <path
                    d="M280 500C450 430 600 460 760 360C840 310 880 260 900 220V500H280Z"
                    fill="#0F2B4A"
                    fillOpacity="0.4"
                  />
                </svg>

                {/* Top-Left Subtle Wave */}
                <svg
                  className="absolute top-0 left-0 w-[450px] h-auto opacity-40"
                  viewBox="0 0 500 300"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 0H500C420 80 340 120 220 100C120 80 40 180 0 240V0Z"
                    fill="#0D223A"
                  />
                </svg>

                {/* Scattered Glowing Cyan/Blue Particle Dots */}
                <div className="absolute top-[18%] left-[16%] w-2 h-2 rounded-full bg-[#00d2ff] shadow-[0_0_10px_#00d2ff] opacity-80 animate-pulse"></div>
                <div className="absolute top-[26%] right-[22%] w-2 h-2 rounded-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8] opacity-70"></div>
                <div className="absolute top-[60%] right-[10%] w-1.5 h-1.5 rounded-full bg-[#00d2ff] shadow-[0_0_6px_#00d2ff] opacity-60"></div>
                <div className="absolute bottom-[24%] left-[28%] w-1.5 h-1.5 rounded-full bg-[#818cf8] shadow-[0_0_6px_#818cf8] opacity-50"></div>
                <div className="absolute top-[38%] left-[8%] w-1.5 h-1.5 rounded-full bg-[#38bdf8] opacity-40"></div>
                <div className="absolute top-[42%] right-[32%] w-1 h-1 rounded-full bg-[#93c5fd] opacity-50"></div>
              </div>

              {/* Top-Right Stylized Handwriting Slogan */}
              <div className="absolute top-8 right-10 flex flex-col items-start -rotate-3 select-none pointer-events-none">
                <span className="font-caveat text-xl md:text-2xl text-slate-300 font-semibold tracking-wide">
                  Same ideas.
                </span>
                <div className="relative">
                  <span className="font-caveat text-xl md:text-2xl text-slate-300 font-semibold tracking-wide">
                    Bigger together.
                  </span>
                  {/* Underline Cyan Brush Arc */}
                  <svg
                    className="absolute -bottom-1.5 left-0 w-full h-3 text-[#00d2ff]"
                    viewBox="0 0 120 12"
                    fill="none"
                  >
                    <path
                      d="M2 7C35 2 85 3 118 8"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Center Content Box */}
              <div className="relative z-20 flex flex-col items-center text-center max-w-xl">
                {/* 3D Glowing Chat Bubbles with Spark Radiance */}
                <div className="relative mb-7 flex items-center justify-center">
                  {/* Radiating Celebration Sparks */}
                  <div className="absolute -top-7 left-2 w-1.5 h-4 bg-[#00d2ff] rounded-full -rotate-45 shadow-[0_0_10px_#00d2ff]"></div>
                  <div className="absolute -top-10 left-1/3 w-1.5 h-4 bg-[#00d2ff] rounded-full shadow-[0_0_10px_#00d2ff]"></div>
                  <div className="absolute top-0 -left-8 w-4 h-1.5 bg-[#00d2ff] rounded-full shadow-[0_0_10px_#00d2ff]"></div>
                  <div className="absolute top-1/2 -left-9 w-4 h-1.5 bg-[#00d2ff] rounded-full rotate-45 shadow-[0_0_10px_#00d2ff]"></div>

                  {/* Dark Background Speech Bubble */}
                  <div className="absolute right-[-24px] bottom-[-10px] w-28 h-24 md:w-32 md:h-28 rounded-3xl rounded-br-sm bg-[#12253b] border border-[#1b3a5c] shadow-2xl transform rotate-3"></div>

                  {/* Front Vibrant Cyan Speech Bubble */}
                  <div className="relative w-32 h-28 md:w-36 md:h-32 rounded-3xl rounded-bl-sm bg-gradient-to-tr from-[#00c6ff] via-[#0099ff] to-[#0072ff] p-1 flex items-center justify-center shadow-[0_15px_40px_rgba(0,180,255,0.45)] border border-cyan-300/30">
                    {/* Inner 3 Chat Dots */}
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 md:w-3.5 md:h-3.5 bg-white rounded-full shadow-sm"></span>
                      <span className="w-3 h-3 md:w-3.5 md:h-3.5 bg-white rounded-full shadow-sm"></span>
                      <span className="w-3 h-3 md:w-3.5 md:h-3.5 bg-white rounded-full shadow-sm"></span>
                    </div>
                  </div>
                </div>

                {/* Heading Typography */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
                  Welcome to{" "}
                  <span className="bg-gradient-to-r from-[#00d2ff] via-[#38bdf8] to-[#00b4d8] bg-clip-text text-transparent">
                    QuickConnect
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-slate-300/90 text-sm sm:text-base md:text-lg max-w-md font-normal leading-relaxed mb-8">
                  Open or make a new room to continue chatting with your team.
                </p>

                {/* Create New Room CTA Button Container with Hand-Drawn Annotation */}
                <div className="relative flex flex-col items-center">
                  <button
                    onClick={() => setIsNewRoomOpen(true)}
                    className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#00c6ff] via-[#0099ff] to-[#0072ff] text-white font-semibold text-base shadow-[0_6px_25px_rgba(0,180,255,0.4)] hover:shadow-[0_8px_35px_rgba(0,180,255,0.6)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                  >
                    <HiPlus size={20} className="text-white group-hover:rotate-90 transition-transform duration-300" />
                    <span>Create New Room</span>
                  </button>

                  {/* Hand-Drawn Arrow & Cursive Annotation Note */}
                  <div className="absolute -bottom-20 -left-36 md:-left-44 hidden sm:flex items-start gap-2 pointer-events-none select-none -rotate-6">
                    {/* Curved Hand-Drawn Arrow SVG */}
                    <svg
                      className="w-14 h-14 text-slate-400 mt-1"
                      viewBox="0 0 60 60"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 50C10 25 35 15 50 12"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeDasharray="1 0"
                      />
                      <path
                        d="M42 8L52 12L46 22"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <div className="flex flex-col text-slate-400 leading-tight">
                      <span className="font-caveat text-xl font-medium">Create a room</span>
                      <span className="font-caveat text-xl font-medium">to get started!</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default Home;

