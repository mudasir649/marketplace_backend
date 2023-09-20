import mongoose from "mongoose";

const BikesSubcategorySchema = new mongoose.Schema({
    subcategory: {
        type: String,
    },
    make: [
        {
            type:String
    }
]
});

const BikesSubcategory = mongoose.model('BikesSubcategory', BikesSubcategorySchema);
export default BikesSubcategory;