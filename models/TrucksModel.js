import mongoose from "mongoose";

const TruckSchema = new mongoose.Schema({
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

const Truck = mongoose.model('Truck', TruckSchema);
export default Truck;