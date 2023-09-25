import mongoose from "mongoose";

const BoatsModel = new mongoose.Schema({
    makes: [
        {
            type: String
        }
    ]
}, { timestamps: true });

const Boats = mongoose.model('Boats', BoatsModel);
export default Boats;