import epxress from "express";
import { createAd, fetchAllAds, fetchFeaturedAds, fetchTopAds, addView, getSpecificAd, 
        deleteAd, addToFavorite, filterSearch, car, findCars, findCarModels } from "../controllers/adController.js";

const router = epxress.Router();

router.get('/', fetchAllAds).
        get('/fetchFeatured', fetchFeaturedAds).
        get('/fetchTopAds', fetchTopAds).
        post('/adPost', createAd).
        get('/getSpecific/:id', getSpecificAd).
        patch('/addView', addView).
        delete('/deleteAd/:id', deleteAd).
        post('/adFavorite', addToFavorite).
        post('/searchRecord', filterSearch).
        post('/car', car).
        get('/allCars', findCars).
        get('/findModels/:model', findCarModels);
export default router