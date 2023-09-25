import mongoose from "mongoose";

const BusSchema = new mongoose.Schema({
    category: [
            {
            type: String
        }
    ],
    makes: [
        {
            type: String
        }
    ]
});

const Bus = mongoose.model('Bus', BusSchema);
export default Bus;