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
  removeImage,
  editAdMobile,
  returnTypesList,
} from "../controllers/adController.js";
import { checkValidId, validateRequestBody } from "../middleware/adMiddleware.js";

const router = epxress.Router();

router
  .get("/", fetchAllAds)
  .get("/fetchFeatured", fetchFeaturedAds)
  .get("/fetchTopAds", fetchTopAds)
  .post("/adPost", createAd)
  .get("/get-types-list", returnTypesList)
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
  .put("/removeImage/:id", removeImage)
  .put('/refreshAd/:id', refreshAd);
export default router;
