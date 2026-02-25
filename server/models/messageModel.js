import mongoose from "mongoose";
import { roomSchema } from "./roomModel.js";
import { userSchema } from "./userModel.js";

const messageModel = mongoose.model('messages' , new mongoose.Schema({
    text: {
        type: String,
        required : true
    },
    timestamp : {
        type: Date,
        required: true
    },
    room:{
        type: roomSchema,
        required : true
    },
    user: {
        type: userSchema,
        required : true
    }
}))

export default messageModel;