import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { IoSend, IoClose } from "react-icons/io5";
import { HiBriefcase, HiHashtag, HiUsers, HiChatBubbleLeftRight } from "react-icons/hi2";
import MessageTag from "./MessageTag";
import { useSelector } from "react-redux";
import "./component.css";

function ChatSection({ Room, handleClose, msgs, sendMessage }) {
  const [input, setInput] = useState("");
  const { user_id } = useSelector((state) => state.user);
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  useEffect(() => {
    document.title = "QuickConnect | " + Room.name;
  }, [Room]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      sendMessage({
        text: input.trim(),
        room_id: Room._id,
        user_id: user_id,
      });
      setInput("");
    }
  };

  const getHeaderIcon = (name) => {
    const lower = (name || "").toLowerCase();
    if (lower.includes("office") || lower.includes("work")) {
      return <HiBriefcase className="text-cyan-400 text-lg" />;
    }
    if (lower.includes("formal") || lower.includes("team")) {
      return <HiUsers className="text-indigo-400 text-lg" />;
    }
    if (lower.includes("unofficial") || lower.includes("general")) {
      return <HiHashtag className="text-emerald-400 font-bold text-lg" />;
    }
    return <HiChatBubbleLeftRight className="text-sky-400 text-lg" />;
  };

  return (
    <motion.div
      key={Room._id || Room.name}
      className="flex flex-col h-screen w-full bg-[#080E18] text-slate-100 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute -top-32 right-0 w-96 h-96 bg-[#00d2ff]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-[#0072ff]/10 rounded-full blur-[100px]"></div>
      </div>

      {/* Top Header Bar */}
      <header className="h-[68px] px-6 bg-[#0A121F]/90 backdrop-blur-md border-b border-slate-800/80 flex items-center justify-between z-20 select-none">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#122236] border border-cyan-500/20 flex items-center justify-center shadow-sm">
            {getHeaderIcon(Room.name)}
          </div>
          <div>
            <h1 className="text-base font-semibold text-white capitalize tracking-wide flex items-center gap-2">
              {Room.name}
              <span className="w-2 h-2 rounded-full bg-[#00e599] shadow-[0_0_8px_#00e599]"></span>
            </h1>
            <p className="text-xs text-slate-400">
              Active Room • End-to-end connected
            </p>
          </div>
        </div>

        <button
          onClick={handleClose}
          className="p-2 rounded-xl bg-[#121f30] hover:bg-[#1a2c42] border border-slate-700/50 text-slate-400 hover:text-white transition-all cursor-pointer shadow-sm active:scale-95"
          title="Close room"
        >
          <IoClose size={20} />
        </button>
      </header>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 custom-scrollbar z-10">
        {msgs.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 space-y-2 select-none">
            <div className="w-12 h-12 rounded-2xl bg-[#122236] border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-xl mb-1">
              <HiChatBubbleLeftRight />
            </div>
            <p className="text-sm font-medium text-slate-300">No messages in this room yet</p>
            <p className="text-xs text-slate-500">Say hello to kick off the conversation!</p>
          </div>
        ) : (
          msgs.map((msg, index) => <MessageTag key={index} msg={msg} />)
        )}
        <div ref={scrollRef} />
      </div>

      {/* Bottom Floating Input Bar */}
      <div className="p-4 bg-[#0A121F]/90 backdrop-blur-md border-t border-slate-800/80 z-20">
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2.5 max-w-4xl mx-auto"
        >
          <div className="flex-1 flex items-center bg-[#121c2b] border border-slate-700/60 rounded-2xl px-4 py-3 focus-within:border-[#00d2ff]/60 focus-within:ring-1 focus-within:ring-[#00d2ff]/30 transition-all shadow-inner">
            <input
              type="text"
              placeholder={`Message in #${Room.name}...`}
              className="bg-transparent border-none outline-none w-full text-sm text-slate-100 placeholder:text-slate-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={!input.trim()}
            className="p-3.5 rounded-2xl bg-gradient-to-r from-[#00c6ff] to-[#0072ff] hover:from-[#22dbff] hover:to-[#1a85ff] text-white shadow-[0_4px_18px_rgba(0,180,255,0.35)] disabled:opacity-40 disabled:pointer-events-none hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center flex-shrink-0"
            title="Send message"
          >
            <IoSend size={17} />
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default ChatSection;

