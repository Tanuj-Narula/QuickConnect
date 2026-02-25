import React, { useState, useEffect } from "react";
import "./component.css";
import { useSelector } from "react-redux";

const MessageTag = ({ msg }) => {
  const { user_id } = useSelector((state) => state.user);
  const [sender, setsender] = useState("");
  const [msgTime, setmsgTime] = useState("");

  function set_time(){
    setmsgTime(
      new Date(msg.timestamp).toLocaleTimeString("en-us", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    );
  }

  useEffect(() => {
    if (msg.user._id === user_id) {
      setsender("you");
    } else {
      setsender(msg.user.username);
    }

    if(msg.timestamp){
      set_time();
    }
  }, [msg]);

  return (
    <>
      {sender === "you" ? (
        <div
          id="message-invert"
          className="bg-[#22666D] text-white font-[500] w-[300px] min-h-fit pr-2 pb-2 rounded-l-md ml-auto"
        >
          <div className="px-4">
            <h2 className="text-sm text-right">{sender}</h2>
            <p className="text-lg">{msg.text}</p>
            <p className="text-xs text-right mt-2 ">{msgTime}</p>
          </div>
        </div>
      ) : sender == "system" ? (
        <div className="bg-[#22282d] text-white  min-h-fit px-6 py-2 rounded-md text-center text-xs m-auto">
          <p>{msg.text}</p>
        </div>
      ) : (
        <div
          id="message"
          className="bg-[#324049] text-white w-[300px] min-h-fit pl-2 pb-2 rounded-r-md mr-auto"
        >
          <div className="px-4">
            <h2 className="text-sm">{sender}</h2>
            <p className="text-lg mt-1">{msg.text}</p>
            <p className="text-xs text-right mt-2 ">{msgTime}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default MessageTag;
