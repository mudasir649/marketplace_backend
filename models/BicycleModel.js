import mongoose from "mongoose";

const BicycleSchema = new mongoose.Schema({
    makes: {
            type: String,
    }
});

const Bicycles = mongoose.model('Bicycles', BicycleSchema);
export default Bicycles;