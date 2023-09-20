import mongoose from "mongoose";

const CarsSchema = new mongoose.Schema({
    make:{
        type: String,
    },
    model:[{
        type: String,
    }],
}, { timestamps: true });

const Cars = mongoose.model('Car', CarsSchema);
export default Cars;