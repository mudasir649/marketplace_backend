import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    adIds:[{ type:'ObjectId', ref:"Ad" }],
    favAdIds:[{ type:'ObjectId', ref:"FavoriteAd" }],
    image: {
        type: String,
        default: null
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
        minSelect:8
    },
    phoneNumber: {
        type: Number,
        default: null
    },
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
export default User;