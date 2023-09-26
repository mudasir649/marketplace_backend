import epxress from "express";
import { createAd, fetchAllAds, fetchFeaturedAds, fetchTopAds, addView, getSpecificAd, 
        deleteAd, addToFavorite, filterSearch, findCarModels, motorcycles, 
        BikesSubCategory, findMotorcycleModel, deleteFromfavorite, busses, findVehicleMake, findVehicleCategory } from "../controllers/adController.js";

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
        get('/CarModels/:model', findCarModels).
        get('/motorcycleModels/:model', findMotorcycleModel).
        get('/findVehicleMake/:type', findVehicleMake).
        get('/findVehicleCategory/:type', findVehicleCategory).
        delete('/removeFavorite/:id', deleteFromfavorite).
        post('/createBus', busses);
export default router