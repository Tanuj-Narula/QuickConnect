import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userModel from "./models/userModel.js";
import messageModel from "./models/messageModel.js";
import roomModel from "./models/roomModel.js";
import User from "./routes/users.js";
import auth from "./routes/auth.js";
import rooms from "./routes/rooms.js";
import { Server } from "socket.io";
import { createServer } from "node:http";
import jwt from "jsonwebtoken";

dotenv.config();
const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {},
  cors: {
    origin: "http://localhost:5173",
  },
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error("No token"));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded;
    next();
  } catch (err) {
    console.error("Socket auth error:", err.message);
    next(new Error("Invalid token"));
  }
});
app.use(cors());
app.use(json());
app.use("/users", User);
app.use("/auth", auth);
app.use("/rooms", rooms);

mongoose
  .connect(process.env.MongoDB_URI)
  .then(() => console.log("connection successfull"))
  .catch((e) => console.log("couldn't connect to MongoDB", e));

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("join_room", async (room_id, user_id) => {
    try {
      const user = await userModel.findById(user_id);
      if (!user) return socket.emit("error", "user not found");

      const room = await roomModel.findById(room_id);
      if (!room) return socket.emit("error", "room not found");

      socket.join(room._id.toString());


      if (!socket.recovered) {
        io.to(room?._id.toString()).emit("receiveMessage", {
          text: `${user.username} joined the room`,
          user: {
            username: "system",
          },
        });
      }
    } catch (err) {
      console.error("Join error:", err.message);
    }
  });

  socket.on("leave_room", async (roomId, userId) => {
    const room = await roomModel.findById(roomId);
    if (!room) return socket.emit("error", "room not found");
    const user = await userModel.findById(userId);
    if (!user) return socket.emit("error", "user not found");
    io.to(room?._id.toString()).emit("receiveMessage", {
      text: `${user.username} left the room`,
      user: {
        username: "system",
      },
    });
    socket.leave(roomId);
  });

  socket.on("sendMessage", async (data) => {
    const { text, room_id, user_id } = data;
    try {
      const user = await userModel.findById(user_id);
      if (!user) return socket.emit("error", "user not found");
      const room = await roomModel.findById(room_id);
      if (!room) return socket.emit("error", "room not found");
      const message = new messageModel({ 
        text: text,
        timestamp: new Date(),
        room: room,
        user: user  
      });
      await message.save();
      io.to(room._id.toString()).emit("receiveMessage", {
      _id: message._id,
      text: message.text,
      timestamp: message.timestamp,
      user: {
        _id: user._id,
        username: user.username,
      },
      room: room._id,
    });
    } catch (err) {
      console.error("send message error:", err.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`server is running on port http://localhost:${port}`);
});
