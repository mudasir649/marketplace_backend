import mongoose from "mongoose";
const AdSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    image: [
        {
            type: String,
            default: null
        }
    ], 
    category: {
        type: String,
        default: null
    },
    subCategory: {
        type: String,
        default: null
    }, 
    title: {
        type: String,
        default: null
    },
    price:{
        type: Number,
        default: null
    },
    condition: {
        type: String,
        default: null
    },
    brand: {
        type: String,
        default: null
    },
    videoUrl: {
        type: String,
        default: null
    },
    description: {
        type: String,
        default: null
    },
    email: {
        type: String,
        default: null
    },
    phoneNumber: {
        type: Number,
        default: null
    },
    whatsApp: {
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
    },
    address: {
        type: String,
        default: null
    },
    feature_list: {
        type: String,
        default: null
    },
    howToContact: {
        type: String,
        default: null
    },
    model: {
        type: String,
        default: null
    },
    year: {
        type: Number,
        default: null
    },
    bodyShape: {
        type: String,
        default: null
    },
    gearBox: {
        type: String,
        default: null
    },
    fuelType: {
        type: String,
        default: null
    },
    exteriorColor: {
        type: String,
        default: null
    },
    interiorColor: {
        type: String,
        default: null
    },
    engineCapacity: {
        type: String,
        default: null
    },
    cylinders: {
        type: String,
        default: null
    },
    kiloMeters: {
        type: Number,
        default: null
    },
    views: {
        type: Number,
        default:0
    }
});

const Ad = mongoose.model('Ad', AdSchema);

export default Ad;
