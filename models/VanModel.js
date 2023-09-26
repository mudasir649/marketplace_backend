import mongoose from "mongoose";

const VanSchema = new mongoose.Schema({
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

const Van = mongoose.model('Van', VanSchema);
export default Van;