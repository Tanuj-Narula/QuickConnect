import React, { useEffect } from 'react'
import { useLocation } from 'react-router';
import ChatPage from '../components/ChatPage';
import Sidebar from '../components/Sidebar.jsx';
import { Outlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { PiChatsFill } from "react-icons/pi";

function Home() {
  const location = useLocation();
  
  useEffect(()=>{
    if(location.pathname == '/'){
      document.title = 'QuickConnect';
    }
  }, [location])

  return (
    <div>
      <Sidebar/>
      <Outlet />
      <AnimatePresence mode="wait">
        <motion.div
          key="placeholder"
          className="flex flex-col gap-3 justify-center items-center shadow-border-bottom bg-[#22666D] text-white fixed z-40 left-[20%] w-[80%] h-screen p-2"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <PiChatsFill size={200} />
          <h1 className="text-7xl text-center">QuickConnect</h1>
          <h2 className="text-xl text-neutral-200">
            Open or make new room to continue Chatting
          </h2>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default Home
