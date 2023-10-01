import epxress from "express";
import { createAd, fetchAllAds, fetchFeaturedAds, fetchTopAds, addView, getSpecificAd, 
        deleteAd, addToFavorite, filterSearch, motorcycles, 
        BikesSubCategory, findModels, deleteFromfavorite, busses, findVehicleMake, findVehicleSubCategory, advanceSearchFilter, searchMake } from "../controllers/adController.js";

const router = epxress.Router();

router.get('/', fetchAllAds).
        get('/fetchFeatured', fetchFeaturedAds).
        get('/fetchTopAds', fetchTopAds).
        post('/adPost', createAd).
        get('/getSpecific/:id', getSpecificAd).
        patch('/addView', addView).
        delete('/deleteAd/:id', deleteAd).
        post('/adFavorite', addToFavorite).
        get('/searchRecord', filterSearch).
        post('/bikesSubcategory', BikesSubCategory).
        post('/motorcycles', motorcycles).
        get('/findModels/:type/:make', findModels).
        get('/findVehicleMake/:type', findVehicleMake).
        get('/findVehicleSubCategory/:type', findVehicleSubCategory).
        delete('/removeFavorite/:id', deleteFromfavorite).
        get('/advance-search-filter', advanceSearchFilter).
        post('/createBus', busses).
        get('/search-make', searchMake);
export default router