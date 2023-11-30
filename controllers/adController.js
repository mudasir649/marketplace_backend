import Ad from "../models/AdModel.js";
import BikesSubcategory from "../models/BikesSubcategory.js";
import Cars from "../models/CarsModel.js";
import Motorcycles from "../models/MotorcycleModel.js";
import User from "../models/UserModel.js";
import Van from "../models/VanModel.js";
import Trailer from "../models/TrailerModel.js";
import ConstructionMachine from "../models/ConstructionMachineModel.js";
import { successResponse, failedResponse } from "../utils/response.js";
import {
  uploadMultipleImage,
  uploadSingleImage,
} from "../utils/uploadImage.js";
import Truck from "../models/TrucksModel.js";
import Bus from "../models/BussesModel.js";
import Boats from "../models/BoatsModel.js";
import Drones from "../models/DronesModel.js";
import { types_list, gearBox, conditionList, exteriorColor, interiorColor, AutosBodyShape, fuelType, kilometers } from "../utils/PostAdTypes.js";

const fetchTopAds = async (req, res) => {
  try {
    const ad = await Ad.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("userId");

    return successResponse(
      res,
      200,
      "Top ads are sent successfully.",
      true,
      ad
    );
  } catch (error) {
    return failedResponse(res, 500, "Unable to sent ads.", false);
  }
};

const fetchAllAds = async (req, res) => {
  function isNullOrNullOrEmpty(value) {
    return value === null || value === undefined || value === "";
  }
  const {
    address,
    category,
    subCategory,
    bodyShape,
    gearBox,
    km,
    fuelType,
    title,
    page,
    condition,
    brand,
    model,
    year,
    minPrice,
    maxPrice,
    sortBy,
  } = req.query;

  const addressRegex = new RegExp(address, "i");
  const titleRegex = new RegExp(title, "i");
  const skip = (page - 1) * 10;
  try {
    let query = {};
    let sortOptions = {};

    if (!isNullOrNullOrEmpty(category)) query.category = category;
    if (!isNullOrNullOrEmpty(subCategory)) query.subCategory = subCategory;
    if (!isNullOrNullOrEmpty(fuelType)) query.fuelType = fuelType;
    if (!isNullOrNullOrEmpty(gearBox)) query.gearBox = gearBox;
    if (!isNullOrNullOrEmpty(km)) query.km = km;
    if (!isNullOrNullOrEmpty(bodyShape)) query.bodyShape = bodyShape;
    if (!isNullOrNullOrEmpty(address)) query.address = addressRegex;
    if (!isNullOrNullOrEmpty(title)) query.title = titleRegex;
    if (!isNullOrNullOrEmpty(condition)) query.condition = condition;
    if (!isNullOrNullOrEmpty(brand)) query.brand = brand;
    if (!isNullOrNullOrEmpty(model)) query.model = model;
    if (!isNullOrNullOrEmpty(year)) query.year = year;
    if (!isNullOrNullOrEmpty(minPrice)) query.price = { $lte: minPrice };
    if (!isNullOrNullOrEmpty(maxPrice)) query.price = { $gte: maxPrice };
    if (!isNullOrNullOrEmpty(maxPrice) && !isNullOrNullOrEmpty(minPrice))
      query.price = { $gte: maxPrice, $lte: minPrice };

    switch (sortBy) {
      case "Old":
        sortOptions = { createdAt: 1 };
        break;
      case "A to Z (title)":
        sortOptions = { title: 1 };
        break;
      case "Z to A (title)":
        sortOptions = { title: -1 };
        break;
      case "Price (low to high)":
        sortOptions = { price: 1 };
        break;
      case "Price (high to low)":
        sortOptions = { price: -1 };
        break;
      default:
        sortOptions = { createdAt: -1 };
        break;
    }

    console.log(sortBy);
    console.log(query);

    const ad = await Ad.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(10)
      .populate("userId");

    const totalAds = await Ad.find(query).count();
    if (totalAds > 0) {
      return successResponse(res, 200, "All records are sent.", true, {
        ad,
        totalAds,
      });
    } else {
      return successResponse(res, 200, "No record found.", true, {
        ad,
        totalAds,
      });
    }
  } catch (error) {
    return failedResponse(res, 400, "Unable to search record.", false);
  }
};

const fetchFeaturedAds = async (req, res) => {
  try {
    const ad = await Ad.find().sort({ createdAt: -1 }).limit(12);
    return successResponse(res, 200, "All ads are sent.", true, ad);
  } catch (error) {
    return failedResponse(res, 500, "Unable to sent ads.", false);
  }
};

const createAd = async (req, res) => {
  const { file } = req.files;
  try {
    if (file.length > 1) {
      const data = req.body;
      const imageData = await uploadMultipleImage(file);
      data.images = imageData;
      const ad = await Ad.create(data);
      const user = await User.findByIdAndUpdate(
        { _id: data.userId },
        { $push: { adIds: ad?._id } },
        { new: true }
      );
      if (ad) {
        return successResponse(
          res,
          201,
          "Ad is posted successfully.",
          true,
          ad
        );
      } else {
        return failedResponse(
          res,
          500,
          "ad post with single file failed",
          false
        );
      }
    } else {
      const data = req.body;
      const imageData = await uploadSingleImage(file);
      data.images = imageData;
      const ad = await Ad.create(data);
      const user = await User.findByIdAndUpdate(
        { _id: data.userId },
        { $push: { adIds: ad?._id } },
        { new: true }
      );
      if (ad) {
        return successResponse(
          res,
          201,
          "Ad is posted successfully.",
          true,
          ad
        );
      } else {
        return failedResponse(
          res,
          500,
          "ad post with multiple file failed",
          false
        );
      }
    }
  } catch (error) {
    return failedResponse(res, 500, "something went wrong", false);
  }
};

const editAd = async (req, res) => {
  function isNullOrNullOrEmpty(value) {
    return value === null || value === undefined || value === "";
  }
  const { id } = req.params;

  const {
    title,
    category,
    subCategory,
    price,
    condition,
    brand,
    videoUrl,
    description,
    phone,
    whatsapp,
    viber,
    address,
    model,
    year,
    bodyShape,
    gearBox,
    fuelType,
    exteriorColor,
    interiorColor,
    engineCapacity,
    cylinder,
    km,
    axelType,
    latitude,
    longitude,
    images
  } = req.body;
  
  const fieldToUpdate = {};

  if (!isNullOrNullOrEmpty(title)) fieldToUpdate.title = title;
  if (!isNullOrNullOrEmpty(category)) fieldToUpdate.category = category;
  if (!isNullOrNullOrEmpty(subCategory)) fieldToUpdate.subCategory = subCategory;
  if (isNullOrNullOrEmpty(price)) fieldToUpdate.price = price;
  if (!isNullOrNullOrEmpty(condition)) fieldToUpdate.condition = condition;
  if (!isNullOrNullOrEmpty(brand)) fieldToUpdate.brand = brand;
  if (!isNullOrNullOrEmpty(videoUrl)) fieldToUpdate.videoUrl = videoUrl;
  if (!isNullOrNullOrEmpty(description)) fieldToUpdate.description = description;
  if (!isNullOrNullOrEmpty(phone)) fieldToUpdate.phone = phone;
  if (!isNullOrNullOrEmpty(whatsapp)) fieldToUpdate.whatsapp = whatsapp;
  if (!isNullOrNullOrEmpty(viber)) fieldToUpdate.viber = viber;
  if (!isNullOrNullOrEmpty(model)) fieldToUpdate.model = model;
  if (!isNullOrNullOrEmpty(year)) fieldToUpdate.year = year;
  if (!isNullOrNullOrEmpty(km)) fieldToUpdate.km = km;
  if (!isNullOrNullOrEmpty(address)) fieldToUpdate.address = address;
  if (!isNullOrNullOrEmpty(bodyShape)) fieldToUpdate.bodyShape = bodyShape;
  if (!isNullOrNullOrEmpty(gearBox)) fieldToUpdate.gearBox = gearBox;
  if (!isNullOrNullOrEmpty(fuelType)) fieldToUpdate.fuelType = fuelType;
  if (!isNullOrNullOrEmpty(exteriorColor)) fieldToUpdate.exteriorColor = exteriorColor;
  if (!isNullOrNullOrEmpty(interiorColor)) fieldToUpdate.interiorColor = interiorColor;
  if (!isNullOrNullOrEmpty(engineCapacity)) fieldToUpdate.engineCapacity = engineCapacity;
  if (!isNullOrNullOrEmpty(cylinder)) fieldToUpdate.cylinder = cylinder;
  if (!isNullOrNullOrEmpty(axelType)) fieldToUpdate.axelType = axelType;
  if (!isNullOrNullOrEmpty(longitude)) fieldToUpdate.longitude = longitude;
  if (!isNullOrNullOrEmpty(latitude)) fieldToUpdate.latitude = latitude;
  if (!isNullOrNullOrEmpty(images)) fieldToUpdate.images = images;



  if(!isNullOrNullOrEmpty(req.files)){
    let { file } = req.files
    if(file.length > 1){
      const imageData = await uploadMultipleImage(file);
      await Ad.findByIdAndUpdate(id, {$push: { images: imageData }}, { new: true });
    }else{
      const imageData = await uploadSingleImage(file);
      await Ad.findByIdAndUpdate(id, {$push: { images: imageData }}, { new: true });
    }
  }

  console.log(fieldToUpdate);

  // return 'this is working..'

  const ad = await Ad.findByIdAndUpdate({ _id: id }, fieldToUpdate, { new: true })
  if (ad) {
    return successResponse(res, 200, "Ad update successfully.", true);
  } else {
    return failedResponse(res, 404, "Unable to update ad.", false);
  }

  try {
    if(!isNullOrNullOrEmpty(req.files)){
      let { file } = req.files
      if(file.length > 1){
        const imageData = await uploadMultipleImage(file);
        images.push(imageData)
        await Ad.findByIdAndUpdate(id, {$push: { images: imageData }}, { new: true });
      }else{
        const imageData = await uploadSingleImage(file);
        images.push(imageData)
        await Ad.findByIdAndUpdate(id, {$push: { images: imageData }}, { new: true });
      }
    }

    const ad = await Ad.findByIdAndUpdate({ _id: id }, fieldToUpdate, { new: true })
    if (ad) {
      return successResponse(res, 200, "Ad update successfully.", true);
    } else {
      return failedResponse(res, 404, "Unable to update ad.", false);
    }
  } catch (error) {
    return failedResponse(res, 500, "something went wrong.", false);
  }
};

const editAdMobile = async (req, res) => {
  function isNullOrNullOrEmpty(value) {
    return value === null || value === undefined || value === "";
  }
  const { id } = req.params;

  const {
    title,
    category,
    subCategory,
    price,
    condition,
    brand,
    videoUrl,
    description,
    phone,
    whatsapp,
    viber,
    address,
    model,
    year,
    bodyShape,
    gearBox,
    fuelType,
    exteriorColor,
    interiorColor,
    engineCapacity,
    cylinder,
    km,
    axelType,
    latitude,
    longitude,
    images
  } = req.body;
  
  const fieldToUpdate = {};

  if (!isNullOrNullOrEmpty(title)) fieldToUpdate.title = title;
  if (!isNullOrNullOrEmpty(category)) fieldToUpdate.category = category;
  if (!isNullOrNullOrEmpty(subCategory)) fieldToUpdate.subCategory = subCategory;
  if (!isNullOrNullOrEmpty(price)) fieldToUpdate.price = price;
  if (!isNullOrNullOrEmpty(condition)) fieldToUpdate.condition = condition;
  if (!isNullOrNullOrEmpty(brand)) fieldToUpdate.brand = brand;
  if (!isNullOrNullOrEmpty(videoUrl)) fieldToUpdate.videoUrl = videoUrl;
  if (!isNullOrNullOrEmpty(description)) fieldToUpdate.description = description;
  if (!isNullOrNullOrEmpty(phone)) fieldToUpdate.phone = phone;
  if (!isNullOrNullOrEmpty(whatsapp)) fieldToUpdate.whatsapp = whatsapp;
  if (!isNullOrNullOrEmpty(viber)) fieldToUpdate.viber = viber;
  if (!isNullOrNullOrEmpty(model)) fieldToUpdate.model = model;
  if (!isNullOrNullOrEmpty(year)) fieldToUpdate.year = year;
  if (!isNullOrNullOrEmpty(km)) fieldToUpdate.km = km;
  if (!isNullOrNullOrEmpty(address)) fieldToUpdate.address = address;
  if (!isNullOrNullOrEmpty(bodyShape)) fieldToUpdate.bodyShape = bodyShape;
  if (!isNullOrNullOrEmpty(gearBox)) fieldToUpdate.gearBox = gearBox;
  if (!isNullOrNullOrEmpty(fuelType)) fieldToUpdate.fuelType = fuelType;
  if (!isNullOrNullOrEmpty(exteriorColor)) fieldToUpdate.exteriorColor = exteriorColor;
  if (!isNullOrNullOrEmpty(interiorColor)) fieldToUpdate.interiorColor = interiorColor;
  if (!isNullOrNullOrEmpty(engineCapacity)) fieldToUpdate.engineCapacity = engineCapacity;
  if (!isNullOrNullOrEmpty(cylinder)) fieldToUpdate.cylinder = cylinder;
  if (!isNullOrNullOrEmpty(axelType)) fieldToUpdate.axelType = axelType;
  if (!isNullOrNullOrEmpty(longitude)) fieldToUpdate.longitude = longitude;
  if (!isNullOrNullOrEmpty(latitude)) fieldToUpdate.latitude = latitude;

  try {
    if(!isNullOrNullOrEmpty(req.files)){
      let { file } = req.files
      if(file.length > 1){
        const imageData = await uploadMultipleImage(file);
        await Ad.findByIdAndUpdate(id, { images: imageData }, { new: true })
      }else{
        const imageData = await uploadSingleImage(file);
        await Ad.findByIdAndUpdate(id, { images: imageData }, { new: true })
      }
    }

    const ad = await Ad.findByIdAndUpdate({ _id: id }, fieldToUpdate, { new: true })
    if (ad) {
      return successResponse(res, 200, "Ad update successfully.", true);
    } else {
      return failedResponse(res, 404, "Unable to update ad.", false);
    }
  } catch (error) {
    return failedResponse(res, 500, "something went wrong.", false);
  }
};


const getSpecificAd = async (req, res) => {
  try {
    const getUserAd = await Ad.findById({ _id: req.params.id });
    const getRecord = await getUserAd.populate("userId");
    return successResponse(
      res,
      200,
      "specific record sent.",
      true,
      getRecord.toJSON()
    );
  } catch (error) {
    return failedResponse(res, 500, "unable to get record.", false);
  }
};

const addView = async (req, res) => {
  await Ad.findByIdAndUpdate(
    { _id: req.query.id },
    { $inc: { views: 1 } },
    { new: true }
  );
  res.status(204).send();
};

const deleteAd = async (req, res) => {
  try {
    await Ad.findByIdAndDelete({ _id: req.params.id });
    return successResponse(res, 204, "ad deleted successfully.", true);
  } catch (error) {
    return failedResponse(res, 500, "unable to delete record.", false);
  }
};

const toggleFavorite = async (req, res) => {
  const { userId, adId } = req.params;
  try {
    // Check if the user exists and retrieve their favorites
    const user = await User.findById(userId);
    if (!user) {
      return successResponse(res, 404, "User not found.", false);
    }

    // Check if the ad is already in favorites
    const isAdInFavorites = user.favAdIds.includes(adId);

    if (isAdInFavorites) {
      // Remove the ad from favorites
      const user = await User.findByIdAndUpdate(
        userId,
        { $pull: { favAdIds: adId } },
        { new: true }
      );
      return successResponse(
        res,
        200,
        "Favorite removed successfully.",
        true,
        user
      );
    } else {
      // Add the ad to favorites
      user.favAdIds.push(adId);
      await user.save();
      return successResponse(res, 201, "Ad is marked favorite.", true, user);
    }
  } catch (error) {
    return failedResponse(res, 500, "Unable to update favorites.", false);
  }
};

const findModels = async (req, res) => {
  const { type, make } = req.params;
  if (type == "Autos") {
    const cars = await Cars.find({ make: make })
      .select("model")
      .sort("model")
      .maxTimeMS("20000");
    return successResponse(res, 200, "car is created.", true, cars);
  } else if (type == "Motorcycle") {
    const motorcycle = await Motorcycles.find({ make: make })
      .select("model")
      .sort("model")
      .maxTimeMS("20000");
    return successResponse(
      res,
      200,
      "motorcycle model is sent.",
      true,
      motorcycle
    );
  } else {
    return failedResponse(res, 400, "no model exists.", true);
  }
};

const findVehicleMake = async (req, res) => {
  const type = req.params.type;

  if (type === "Autos") {
    let carArr = [];
    const cars = await Cars.find().sort("make");
    for (let i = 0; i < cars.length; i++) {
      carArr.push(cars[i].make);
    }
    return successResponse(res, 200, "car is created.", true, { make: carArr });
  } else if (type === "Motorcycles") {
    let bikeArr = [];
    const motorcycle = await Motorcycles.find().sort("make");
    for (let i = 0; i < motorcycle.length; i++) {
      bikeArr.push(motorcycle[i].make);
    }
    return successResponse(res, 200, "motorcycle make is sent.", true, {
      make: bikeArr,
    });
  } else if (type === "Bicycles") {
    const bikesSubCat = await BikesSubcategory.find({
      category: "bicycles",
    }).select("make");
    let bikesSubArr = [];
    for (let i = 0; i < bikesSubCat.length; i++) {
      const makes = bikesSubCat[i].make;
      for (let j = 0; j < makes.length; j++) {
        bikesSubArr.push(makes[j]);
      }
    }
    return successResponse(res, 200, "motorcycle make is sent.", true, {
      make: bikesSubArr,
    });
  } else if (type === "E-scooters") {
    const bikesSubCat = await BikesSubcategory.find({
      category: "eScooters",
    }).select("make");
    let bikesSubArr = [];
    for (let i = 0; i < bikesSubCat.length; i++) {
      const makes = bikesSubCat[i].make;
      for (let j = 0; j < makes.length; j++) {
        bikesSubArr.push(makes[j]);
      }
    }
    return successResponse(res, 200, "motorcycle make is sent.", true, {
      make: bikesSubArr,
    });
  } else if (type === "E-bikes") {
    const bikesSubCat = await BikesSubcategory.find({
      category: "eBikes",
    }).select("make");
    let bikesSubArr = [];
    for (let i = 0; i < bikesSubCat.length; i++) {
      const makes = bikesSubCat[i].make;
      for (let j = 0; j < makes.length; j++) {
        bikesSubArr.push(makes[j]);
      }
    }
    return successResponse(res, 200, "motorcycle make is sent.", true, {
      make: bikesSubArr,
    });
  } else if (type === "Busses") {
    const bus = await Bus.find();
    let busArr = [];
    for (let i = 0; i < bus.length; i++) {
      const makes = bus[i].make;
      for (let j = 0; j < makes.length; j++) {
        busArr.push(makes[j]);
      }
    }
    return successResponse(res, 200, "motorcycle make is sent.", true, {
      make: busArr,
    });
  } else if (type === "Vans") {
    const van = await Van.find().select("make");
    let vanArr = [];
    for (let i = 0; i < van.length; i++) {
      const makes = van[i].make;
      for (let j = 0; j < makes.length; j++) {
        vanArr.push(makes[j]);
      }
    }
    return successResponse(res, 200, "motorcycle make is sent.", true, {
      make: vanArr,
    });
  } else if (type === "Trailers") {
    const trailer = await Trailer.find().select("make");
    let trailerArr = [];
    for (let i = 0; i < trailer.length; i++) {
      const makes = trailer[i].make;
      for (let j = 0; j < makes.length; j++) {
        trailerArr.push(makes[j]);
      }
    }
    return successResponse(res, 200, "motorcycle make is sent.", true, {
      make: trailerArr,
    });
  } else if (type === "Trucks") {
    const trucks = await Truck.find().select("make");
    let trucksArr = [];
    for (let i = 0; i < trucks.length; i++) {
      const makes = trucks[i].make;
      for (let j = 0; j < makes.length; j++) {
        trucksArr.push(makes[j]);
      }
    }
    return successResponse(res, 200, "motorcycle make is sent.", true, {
      make: trucksArr,
    });
  } else if (type === "Construction Machines") {
    const constructionMachine = await ConstructionMachine.find().select("make");
    let cnArr = [];
    for (let i = 0; i < constructionMachine.length; i++) {
      const makes = constructionMachine[i].make;
      for (let j = 0; j < makes.length; j++) {
        cnArr.push(makes[j]);
      }
    }
    return successResponse(res, 200, "motorcycle make is sent.", true, {
      make: cnArr,
    });
  } else if (type === "Boats") {
    const boats = await Boats.find().select("make");
    let boatsArr = [];
    for (let i = 0; i < boats.length; i++) {
      const makes = boats[i].make;
      for (let j = 0; j < makes.length; j++) {
        boatsArr.push(makes[j]);
      }
    }
    return successResponse(res, 200, "motorcycle make is sent.", true, {
      make: boatsArr,
    });
  } else if (type === "Drones") {
    const drones = await Drones.find().select("make");
    let droneArr = [];
    for (let i = 0; i < drones.length; i++) {
      const makes = drones[i].make;
      for (let j = 0; j < makes.length; j++) {
        droneArr.push(makes[j]);
      }
    }
    return successResponse(res, 200, "motorcycle make is sent.", true, {
      make: droneArr,
    });
  } else {
    return failedResponse(res, 400, "sorry no record found.", false);
  }
};

const findVehicleSubCategory = async (req, res) => {
  const type = req.params.type;
  if (type === "Busses") {
    const bus = await Bus.find().select("category");
    return successResponse(res, 200, "motorcycle make is sent.", true, bus);
  } else if (type === "Vans") {
    const van = await Van.find().select("category");
    return successResponse(res, 200, "motorcycle make is sent.", true, van);
  } else if (type === "Trailers") {
    const trailer = await Trailer.find().select("category");
    return successResponse(res, 200, "motorcycle make is sent.", true, trailer);
  } else if (type === "Trucks") {
    const trucks = await Truck.find().select("category");
    return successResponse(res, 200, "motorcycle make is sent.", true, trucks);
  } else if (type === "Construction Machines") {
    const constructionMachine = await ConstructionMachine.find().select(
      "category"
    );
    return successResponse(
      res,
      200,
      "motorcycle make is sent.",
      true,
      constructionMachine
    );
  } else {
    return failedResponse(res, 400, "sorry no record found.", false);
  }
};

const searchTitle = async (req, res) => {
  try {
    const { searchTerm } = req.query;
    const regex = new RegExp(searchTerm, "i");

    const make = await Ad.find({ title: regex }).sort({ createdAt: -1 });
    return successResponse(res, 200, "Title found successfully.", true, make);
  } catch (error) {
    return failedResponse(res, 400, "something wrong.", false);
  }
};

const refreshAd = async (req, res) => {
  const { id } = req.params;

  try {
    const existingAd = await Ad.findById(id);

    if (!existingAd) {
      return failedResponse(res, 400, "No! record found.", false);
    }

    let ad1 = existingAd.toObject();
    delete ad1._id;
    delete ad1.createdAt;
    delete ad1.updatedAt;

    const timeDifference = new Date() - existingAd.createdAt;
    const secondsDifference = timeDifference / 1000;

    if (secondsDifference > 15) {
      const deleteAd = await Ad.findByIdAndDelete(id);

      if (!deleteAd) {
        return failedResponse(res, 400, "Ad doesn`t exists.", false);
      }

      const newAd = await Ad.create(ad1);
      await newAd.save();
      const ads = await Ad.find({ userId: ad1.userId });

      return successResponse(res, 200, "Ad timestamps updated.", true, ads);
    } else {
      return failedResponse(
        res,
        400,
        "Item was created within the last 15 seconds. 'createdAt' timestamp not refreshed.",
        false
      );
    }
  } catch (error) {}
};

const adRoomId = async (req, res) => {
  const { id, chatId } = req.params;

  try {
    const ad = await Ad.findByIdAndUpdate(
      id,
      { $push: { chatIds: chatId } },
      { new: true }
    );
    return successResponse(res, 201, "Chat room Id added", true);
  } catch (error) {
    return failedResponse(res, 500, "Unable to add chat Id.", false);
  }
};


const returnTypesList = async (req, res) => {
  try {
    return successResponse(res, 200, 'Post Ad list sent.', true, types_list);
  } catch (error) {
    return failedResponse(res, 500, 'Something went wrong.', false)
  }
}

const returnData = async (req, res) => {
  const { type } = req.query;
  if(type === "Autos"){
    const autosList = {
      conditionList,
      gearBox,
      AutosBodyShape,
      fuelType,
      kilometers,
      exteriorColor,
      interiorColor
    }
    return successResponse(res, 200, 'Post Ad list sent.', true, autosList);
  }
  try {
  } catch (error) {
    return failedResponse(res, 500, 'Something went wrong.', false)
  }
}

export {
  fetchTopAds,
  fetchFeaturedAds,
  fetchAllAds,
  createAd,
  addView,
  getSpecificAd,
  deleteAd,
  toggleFavorite,
  findModels,
  findVehicleMake,
  findVehicleSubCategory,
  searchTitle,
  editAd,
  refreshAd,
  adRoomId,
  editAdMobile,
  returnTypesList,
  returnData
};
