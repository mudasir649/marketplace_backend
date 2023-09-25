import epxress from "express";
import { createAd, fetchAllAds, fetchFeaturedAds, fetchTopAds, addView, getSpecificAd, 
        deleteAd, addToFavorite, filterSearch, findCarModels, motorcycles, 
        BikesSubCategory, findMotorcycleModel, findVehicle, deleteFromfavorite, busses, createDrones, createBoats } from "../controllers/adController.js";

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
        post('/bikesSubcategory', BikesSubCategory).
        post('/motorcycles', motorcycles).
        get('/findModels/:model', findCarModels).
        get('/motorcycleModels/:model', findMotorcycleModel).
        get('/findVehicle/:type', findVehicle).
        get('/createDrone', createDrones).
        get('/createBoats', createBoats).
        delete('/removeFavorite/:id', deleteFromfavorite).
        post('/createBus', busses);
export default router