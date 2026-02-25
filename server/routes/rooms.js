import { Router } from "express";
import auth from "../middleware/auth.js";
import roomModel from "../models/roomModel.js";
import messageModel from "../models/messageModel.js";
import user from "../models/userModel.js";

const router = Router();

router.get("/getall", auth, async (req, res) => {
  try {
    const rooms = await roomModel.find();
    if (!rooms) res.status(404).send({ message: "no rooms found" });

    res.status(200).send(rooms);
  } catch (error) {
    res.status(500).send({ message: error.message, error });
  }
});

router.get("/getone/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    const room = await roomModel.findOne({ _id: id });
    if (!room) res.status(404).send({ message: "room not found" });

    res.status(200).send(room);
  } catch (error) {
    res.status(500).send({ message: error.message, error });
  }
});

router.post("/", auth, async (req, res) => {
  const { name, id } = req.body;
  try {
    const exsistingRoom = await roomModel.findOne({ name: name });
    if (exsistingRoom)
      return res.status(400).send({ message: "room already exists!" });

    const User = await user.findOne({ _id: id });
    if (!User) return res.status(404).send({ message: "not a valid user" });

    const room = new roomModel({
      name: name,
      admin: User,
    });
    await room.save();
    res.status(200).send({ message: "room added successfully", room });
  } catch (error) {
    res.status(500).send({ message: error.message, error });
  }
});

router.get("/:roomId/messages", async (req, res) => {
  const { roomId } = req.params;
  try {
    const room = await roomModel.findOne({ _id: roomId });
    if (!room) res.status(404).send({ message: "room not found" });
    const messages = await messageModel
      .find({ room: room })
      .sort({ timestamp: 1 });
    res.send(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" , err });
  }
});

export default router;
