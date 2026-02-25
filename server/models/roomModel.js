import mongoose from "mongoose";
import {userSchema} from "./userModel.js";

const roomSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    admin: {
        type: userSchema,
    }
})

const roomModel = mongoose.model('rooms' , roomSchema )

export {roomSchema};
export default roomModel;