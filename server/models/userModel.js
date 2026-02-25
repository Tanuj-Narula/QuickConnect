import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username : {
        type: String,
        required: true,
        trim: true
    },
    password : {
        type: String,
        required : true,
    },
})

const userModel = mongoose.model('users' , userSchema  );

export {userSchema};
export default userModel;