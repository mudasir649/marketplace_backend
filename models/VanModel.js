import mongoose from "mongoose";

const VanSchema = new mongoose.Schema({
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

const Van = mongoose.model('Van', VanSchema);
export default Van;