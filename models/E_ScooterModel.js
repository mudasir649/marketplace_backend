import mongoose from "mongoose";

const E_ScooterSchema = new mongoose.Schema({
    makes: {
            type: String,
    }
});

const E_Scooters = mongoose.model('E_Scooters', E_ScooterSchema);
export default E_Scooters;