import mongoose from "mongoose";

const E_BikesSchema = new mongoose.Schema({
    makes: {
            type: String,
    }
});

const E_Bikes = mongoose.model('E_Bikes', E_BikesSchema);
export default E_Bikes;