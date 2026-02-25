import express, { Router } from "express";
import userModel from "../models/userModel.js";
import auth from "../middleware/auth.js";
import bcrypt from 'bcrypt';

const router = Router();

router.get("/", auth, async (req, res) => {
  const user = req.user;
  res.send(user);
});

router.get("/:id", auth, async (req, res) => {
  const id = req.params.id;
  if (req.user.id !== id) {
    return res
      .status(403)
      .send({ message: "Forbidden: You can't Access other users' data" });
  }
  try {
    let user = await userModel.findOne({ _id: id });
    if(!user) res.status(404).send({message: "user not found"});
    res.send({
      _id: user._id,
      email: user.email,
      username: user.username,
      __v: user.__v,
    });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
});

router.put("/update/:id", auth, async (req, res) => {
  const id = req.params.id;
  if (req.user.id !== id) {
    return res
      .status(403)
      .send({ message: "Forbidden: You can't update other users' data" });
  }
  const { email, password, username } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: id },
      { username: username, email: email, password: hashedPassword },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: "User Data updated", updatedUser });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
});

router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;
  if (req.user.id !== id) {
    return res
      .status(403)
      .send({ message: "Forbidden: You can't delete other users' data" });
  }
  try {
    const deletedUser = await userModel.findByIdAndDelete({ _id: id });
    if (!deletedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    res
      .status(200)
      .send({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
});

export default router;
