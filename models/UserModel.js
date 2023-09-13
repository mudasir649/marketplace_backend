import mongoose, { mongo } from "mongoose";

const UserSchema = {
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
    whatsapp: {
        type: Number,
        default: null
    },
    viber: {
        type: Number,
        default: null
    },
    website: {
        type: String,
        default: null
    }
};

const User = mongoose.model('User', UserSchema);
export default User;