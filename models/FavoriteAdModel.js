import mongoose from 'mongoose';

const FavoriteSchema = new mongoose.Schema({
    userId: { type:'ObjectId', ref:"User" },
    adId: { type:'ObjectId', ref:"Ad" },
    favorite: {
        type: Boolean,
        default: false
    }
});

const FavoriteAd = mongoose.model('FavoriteAd', FavoriteSchema);
export default FavoriteAd;