import mongoose from "mongoose";

const MotorcycleSchema = new mongoose.Schema({
    make:{
        type: String,
    },
    model:[{
        type: String,
    }],
}, { timestamps: true });

const Motorcycles = mongoose.model('Motorcycles', MotorcycleSchema);
export default Motorcycles;