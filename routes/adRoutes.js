import epxress from "express";
import {
  createAd,
  fetchAllAds,
  fetchFeaturedAds,
  fetchTopAds,
  addView,
  getSpecificAd,
  deleteAd,
  findModels,
  findVehicleMake,
  findVehicleSubCategory,
  searchTitle,
  toggleFavorite,
  editAd,
  refreshAd,
} from "../controllers/adController.js";
import { checkValidId, validateRequestBody } from "../middleware/adMiddleware.js";

const router = epxress.Router();

router
  .get("/", fetchAllAds)
  .get("/fetchFeatured", fetchFeaturedAds)
  .get("/fetchTopAds", fetchTopAds)
  .post("/adPost", createAd)
  .patch("/edit-ad/:id", editAd)
  .get("/getSpecific/:id", checkValidId, getSpecificAd)
  .patch("/addView", checkValidId, addView)
  .delete("/deleteAd/:id", deleteAd)
  .put("/setFavorite/:adId/:userId", toggleFavorite)
  .get("/findModels/:type/:make", findModels)
  .get("/findVehicleMake/:type", findVehicleMake)
  .get("/findVehicleSubCategory/:type", findVehicleSubCategory)
  .get("/search-title", searchTitle)
  .put('/refreshAd/:id', refreshAd);
export default router;
