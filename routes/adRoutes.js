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
  adRoomId,
  editAdMobile,
  returnTypesList,
  returnData,
} from "../controllers/adController.js";
import { checkValidId, validateRequestBody } from "../middleware/adMiddleware.js";

const router = epxress.Router();

router
  .get("/", fetchAllAds)
  .get("/fetchFeatured", fetchFeaturedAds)
  .get("/fetchTopAds", fetchTopAds)
  .post("/adPost", validateRequestBody, createAd)
  .get("/get-types-list", returnTypesList)
  .get("/get-postAd-data", returnData)
  .patch("/edit-ad/:id", editAd)
  .patch("/edit-ad-mobile/:id", editAdMobile)
  .get("/getSpecific/:id", checkValidId, getSpecificAd)
  .patch("/addView", checkValidId, addView)
  .delete("/deleteAd/:id", deleteAd)
  .put("/setFavorite/:adId/:userId", toggleFavorite)
  .get("/findModels/:type/:make", findModels)
  .get("/findVehicleMake/:type", findVehicleMake)
  .get("/findVehicleSubCategory/:type", findVehicleSubCategory)
  .get("/search-title", searchTitle)
  .put("/updateChatId/:id", adRoomId)
  .put('/refreshAd/:id', refreshAd);
export default router;
