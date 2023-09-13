import mongoose from 'mongoose';

const FavoriteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    adId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "favoriteads"
    },
    favorite: {
        type: Boolean,
        default: true
    }
});

const FavoriteAd = mongoose.model('FavoriteAd', FavoriteSchema);
export default FavoriteAd;