import mongoose from "mongoose";

const BusSchema = new mongoose.Schema({
    category: [
            {
            type: String
        }
    ],
    make: [
        {
            type: String
        }
    ]
});

const Bus = mongoose.model('Bus', BusSchema);
export default Bus;