import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { IoSend, IoCloseCircle } from "react-icons/io5";
import MessageTag from "./MessageTag";
import { useState } from "react";
import { useSelector } from "react-redux";

function ChatSection({ Room, handleClose, msgs, sendMessage }) {
  const [input, setInput] = useState("");
  const { user_id } = useSelector((state) => state.user);
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  useEffect(() => {
    document.title = "QuickConnect | chat | " + Room.name;
  }, [Room]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      sendMessage({
        text: input.trim(),
        room_id: Room._id,
        user_id: user_id,
      });
    }
    setInput("");
  };

  return (
    <motion.div
      key={Room}
      className="flex flex-col overflow-hidden h-screen  w-[80%]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <div className="shadow-border-bottom bg-[#3E505B] text-white fixed z-40 left-[20%] w-[80%] h-[55px] p-2">
        <h1 className="text-3xl transition-all ml-3">{Room.name}</h1>
        <span
          className="cursor-pointer"
          onClick={handleClose}
          title="close window"
        >
          <IoCloseCircle size={30} className="absolute top-4 right-4" />
        </span>
      </div>
      <div className="flex flex-col fixed ml-[20vw] w-[80vw] h-screen p-2 mt-[54px] bg-[url(/email-pattern.webp)] ">
        <div className="flex flex-col flex-grow gap-2 pb-[150px] overflow-y-auto">
          {msgs.map((msg, index) => {
            return <MessageTag key={index} msg={msg} />;
          })}
          <div ref={scrollRef} />
        </div>

        <div className="flex justify-between fixed bottom-0 left-[20%] mt-auto w-[80%] py-2 px-4 bg-[#3E505B] shadow-[0px_-1px_1px_black]">
          <form className="flex w-full" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Type your message here..."
              className="border-l border-y outline-none act border-neutral-800 bg-white w-full p-2 rounded-l-xl"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              className="bg-[#22666D] text-white cursor-pointer hover:*:scale-125 p-4 border-r border-y border-neutral-800 w-auto  rounded-r-xl"
            >
              <IoSend size={20} />
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default ChatSection;
