import mongoose from "mongoose";

const TrailerSchema = new mongoose.Schema({
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

const Trailer = mongoose.model('Trailer', TrailerSchema);
export default Trailer;