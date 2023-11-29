import mongoose from "mongoose";
const AdSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    images: [
      {
        type: String,
        default: null,
      },
    ],
    category: {
      type: String,
      default: null,
    },
    subCategory: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    price: {
      type: Number,
      default: null,
    },
    minPrice: {
      type: Number,
      default: 0,
    },
    maxPrice: {
      type: Number,
      default: 0,
    },
    condition: {
      type: String,
      default: null,
    },
    brand: {
      type: String,
      default: null,
    },
    videoUrl: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    phone: {
      type: Boolean,
      default: false,
    },
    whatsapp: {
      type: String,
    },
    viber: {
      type: String,
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      default: null,
    },
    model: {
      type: String,
      default: null,
    },
    year: {
      type: Number,
      default: null,
    },
    bodyShape: {
      type: String,
      default: null,
    },
    gearBox: {
      type: String,
      default: null,
    },
    fuelType: {
      type: String,
      default: null,
    },
    exteriorColor: {
      type: String,
      default: null,
    },
    interiorColor: {
      type: String,
      default: null,
    },
    engineCapacity: {
      type: String,
      default: null,
    },
    cylinder: {
      type: String,
      default: null,
    },
    km: {
      type: String,
      default: null,
    },
    axeltype: {
      type: String,
      default: null,
    },
    views: {
      type: Number,
      default: 0,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    chatIds: [
      {
        type: String,
        default: null
      }
    ]
  },
  { timestamps: true }
);

const Ad = mongoose.model("Ad", AdSchema);

export default Ad;
