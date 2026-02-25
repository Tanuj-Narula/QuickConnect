// hooks/useSocketRoom.js
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export default function useSocketRoom(roomId, userId, onMessage) {
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!roomId || !userId) return;

    const socket = io("http://localhost:3000", {
      auth: {
        token: localStorage.getItem("token"),
      },
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Socket connected");
      setConnected(true);
      socket.emit("join_room", roomId, userId);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Socket error:", err.message);
    });

    socket.on("receiveMessage", (data) => {
      if (onMessage) {
        console.log(data)
        onMessage(data);
      } else {
        console.log("📩 Message received:", data);
      }
    });

    return () => {
      if (socket.connected) {
        socket.emit("leave_room", roomId , userId);
      }
      socket.disconnect();
      setConnected(false);
      console.log("🔌 Socket disconnected");
    };
  }, [roomId, userId]);

  const sendMessage = (messageData) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit("sendMessage", messageData);
    }
  };

  return { socket: socketRef.current, sendMessage };
}
