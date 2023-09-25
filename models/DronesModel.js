import mongoose from "mongoose";

const DronesModel = new mongoose.Schema({
    makes: [
        {
            type: String
        }
    ]
}, { timestamps: true });

const Drones = mongoose.model('Drone', DronesModel);
export default Drones;