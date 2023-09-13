import epxress from "express";
import { addView, createAd, fetchAllAds, fetchFeaturedAds, fetchTopAds, getSpecificAd, addToFavorite, removeFromFavorite, testApi } from "../controllers/adController.js";
const router = epxress.Router();

router.get('/', fetchAllAds).
        post('/test', testApi).
        get('/fetchFeatured', fetchFeaturedAds).
        get('/fetchTopAds', fetchTopAds).
        post('/adPost', createAd).
        patch('/addView', addView)
        .get('/getSpecific/:id', getSpecificAd).
        post('/addFavorite', addToFavorite).
        delete('/removeFavorite', removeFromFavorite);
export default router