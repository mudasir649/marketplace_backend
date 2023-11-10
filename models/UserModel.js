import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    adIds:[{ type:'ObjectId', ref:"Ad" }],
    favAdIds:[{ type:'ObjectId', ref:"Ad" }],
    image: {
        type: String,
        default: 'https://res.cloudinary.com/dlkuyfwzu/image/upload/v1695709555/profile_logo_pcsium.png'
    },
    firstName: {
        type: String,
        default: null
    },
    lastName: {
        type: String,
        default: null
    },
    userName: {
        type: String,
        default: null
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        minSelect:8,
        select: false
    },
    phoneNumber: {
        type: String,
    },
    verified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
export default User;