import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./component.css";
import { AnimatePresence, motion } from "framer-motion";
import ChatSection from "./ChatSection";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchRoom, setId } from "../redux/rooms/singleroomSlice";
import useSocketRoom from "../hooks/useSocketRoom";

function ChatPage() {
  const dispatch = useDispatch();
  const { Id } = useParams();
  const { room, loading, error } = useSelector((state) => state.singleRoom);
  const { user_id, token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const { sendMessage } = useSocketRoom(room?._id, user_id, handleNewMsg);

  function handleNewMsg(newMsg) {
    setMessages((prev) => [...prev, newMsg]);
  }
  async function fetchMessages() {
    try {
      const res = await axios.get(`http://localhost:3000/rooms/${room._id}/messages`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      setMessages(res.data);
    } catch (error) {
      setMessages([]);
      console.error("Failed to fetch messages:", err);
    }
  }
  useEffect(() => {
    if (room?._id) {
      fetchMessages();
    }
  }, [room]);

  useEffect(() => {
    if (Id !== null) {
      dispatch(setId({ Id }));
      dispatch(fetchRoom());
    }
  }, [Id]);

  useEffect(() => {
    if (!room) return;
    setIsOpen(true);
  }, [room]);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      navigate("/");
    }, 300);
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen ? (
        <>
          {loading ? (
            <div className="flex flex-col overflow-hidden text-black h-screen w-[80%] bg-white">
              loading...
            </div>
          ) : error ? (
            <p>{error.message}</p>
          ) : (
            room && (
              <ChatSection
                handleClose={handleClose}
                Room={room}
                msgs={messages}
                sendMessage={sendMessage}
              />
            )
          )}{" "}
        </>
      ) : (
        <> </>
      )}
    </AnimatePresence>
  );
}

export default ChatPage;
