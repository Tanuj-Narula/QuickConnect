import { Router } from "express";
import user from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const router = Router();

router.post("/signup", async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const existingUser =
      (await user.findOne({ username })) || (await user.findOne({ email }));
    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new user({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res
      .status(200)
      .send({
        message: "new user created",
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      });
  } catch (error) {
    res.status(500).send({ message: error.message, error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password, rememberMe } = req.body;

  try {
    let token = null;
    const User = await user.findOne({ email });
    if (!User)
      return res.status(400).send({ error: "user Not exists \nSign Up first" });

    const isMatch = await bcrypt.compare(password, User.password);
    if (!isMatch)
      return res.status(400).send({ error: "Invalid email or password" });

    if (rememberMe) {
      token = jwt.sign(
        { id: User._id, email: User.email, username: User.username },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
      );
    }else{
      token = jwt.sign(
            { id: User._id, email: User.email , username : User.username},
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
    }

    res.status(200).send({
      message: "Login successful",
      token,
      user: { id: User._id, username: User.username, email: User.email },
    });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
});

export default router;
