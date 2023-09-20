import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    adIds:[{ type:'ObjectId', ref:"Ad" }],
    favAdIds:[{ type:'ObjectId', ref:"FavoriteAd" }],
    image: {
        type: String,
        default: 'https://res.cloudinary.com/dlkuyfwzu/image/upload/v1695098467/zqm4qqydona42g7vi3hu.png'
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
        type: String,
    },
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
export default User;