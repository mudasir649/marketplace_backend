import epxress from "express";
// import { addView, createAd, fetchAllAds, fetchFeaturedAds, fetchTopAds, getSpecificAd, addToFavorite, removeFromFavorite, testApi } from "../controllers/adController.js";
import { createAd, fetchAllAds, fetchFeaturedAds, fetchTopAds, addView, getSpecificAd, deleteAd } from "../controllers/adController.js";

const router = epxress.Router();

// router.get('/', fetchAllAds).
//         get('/fetchFeatured', fetchFeaturedAds).
//         get('/fetchTopAds', fetchTopAds).
//         post('/adPost', createAd).
//         patch('/addView', addView)
//         .get('/getSpecific/:id', getSpecificAd).
//         post('/addFavorite', addToFavorite).
//         delete('/removeFavorite', removeFromFavorite);

router.get('/', fetchAllAds).
        get('/fetchFeatured', fetchFeaturedAds).
        get('/fetchTopAds', fetchTopAds).
        post('/adPost', createAd).
        get('/getSpecific/:id', getSpecificAd).
        patch('/addView', addView).
        delete('/deleteAd/:id', deleteAd);
export default router