import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./component.css";

const MessageTag = ({ msg }) => {
  const { user_id } = useSelector((state) => state.user);
  const [sender, setsender] = useState("");
  const [msgTime, setmsgTime] = useState("");

  function set_time() {
    if (!msg.timestamp) return;
    setmsgTime(
      new Date(msg.timestamp).toLocaleTimeString("en-us", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    );
  }

  useEffect(() => {
    if (msg.user?._id === user_id || msg.user === user_id) {
      setsender("you");
    } else if (msg.user?.username) {
      setsender(msg.user.username);
    } else if (msg.sender) {
      setsender(msg.sender);
    } else {
      setsender("User");
    }

    if (msg.timestamp) {
      set_time();
    }
  }, [msg, user_id]);

  if (sender === "system") {
    return (
      <div className="flex justify-center my-2">
        <div className="bg-[#121c2b]/90 border border-slate-700/50 text-slate-400 text-xs px-4 py-1.5 rounded-full shadow-sm">
          {msg.text}
        </div>
      </div>
    );
  }

  if (sender === "you") {
    return (
      <div className="flex flex-col items-end my-1">
        <div className="max-w-[75%] sm:max-w-[60%] md:max-w-[480px] bg-gradient-to-tr from-[#0094d4] to-[#0072ff] text-white px-4 py-3 rounded-2xl rounded-tr-xs shadow-[0_4px_16px_rgba(0,180,255,0.22)] border border-cyan-300/20">
          <p className="text-[14px] leading-relaxed break-words">{msg.text}</p>
          <div className="flex justify-end items-center gap-1 mt-1">
            <span className="text-[10px] text-cyan-100/75">{msgTime || "Just now"}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start my-1">
      <div className="max-w-[75%] sm:max-w-[60%] md:max-w-[480px] bg-[#121f30] text-slate-100 px-4 py-3 rounded-2xl rounded-tl-xs shadow-md border border-slate-700/60">
        <span className="text-xs font-semibold text-[#00d2ff] block mb-1 capitalize">
          {sender}
        </span>
        <p className="text-[14px] text-slate-200 leading-relaxed break-words">{msg.text}</p>
        <div className="flex justify-end items-center gap-1 mt-1">
          <span className="text-[10px] text-slate-400">{msgTime || "Just now"}</span>
        </div>
      </div>
    </div>
  );
};

export default MessageTag;

