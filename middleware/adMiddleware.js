import { failedResponse } from "../utils/response.js";
import { validationResult, body } from "express-validator";

export const checkValidId = async (req, res, next) => {
  const validProductIdPattern = /^[0-9a-fA-F]{24}$/;
  const productId = req.params.id;
  const productId1 = req.query.id;
  if (
    !validProductIdPattern.test(productId) &&
    productId?.length !== 24 &&
    productId1?.length !== 24
  ) {
    return failedResponse(res, 400, "Invalid product", false);
  }
  next();
};

export const validateRequestBody = (req, res, next) => {
  const { category } = req.body;
  console.log(req.body);
  if (category === "Autos") {
    const AutosValidationRules = [
      body("category").isString(),
      body("userId").isMongoId(), // Assuming userId is a MongoDB ObjectId
      body("title").isString(),
      body("price").isNumeric(),
      body("brand").isString(),
      body("model").isString(),
      body("description").isString(),
      body("videoUrl").isString(),
      body("address").isString(),
      body("feature_list").isString().optional(),
      body("howToContact").isString(),
      body("condition").isString(),
      body("whatsapp").isString().optional(),
      body("viber").isString(),
      body("year").isNumeric(),
      body("bodyShape").isString(),
      body("gearBox").isString(),
      body("fuelType").isString(),
      body("exteriorColor").isString(),
      body("interiorColor").isString(),
      body("km").isString(), // You may need custom validation for this field
      body("latitude").isNumeric().optional(),
      body("longitude").isNumeric().optional(),
    ];
    // Run the validation rules on the request body
    validatePostAd(AutosValidationRules, req, res, next);
  } else if (category === "Bikes") {
    const AutosValidationRules = [
      body("category").isString(),
      body("subCategory").isString(),
      body("userId").isMongoId(), // Assuming userId is a MongoDB ObjectId
      body("title").isString(),
      body("price").isNumeric(),
      body("brand").isString(),
      body("model").isString(),
      body("description").isString(),
      body("videoUrl").isString(),
      body("address").isString(),
      body("feature_list").isString().optional(),
      body("howToContact").isString(),
      body("condition").isString(),
      body("whatsapp").isString().optional(),
      body("viber").isString(),
      body("year").isNumeric(),
      body("bodyShape").isString(),
      body("gearBox").isString(),
      body("fuelType").isString(),
      body("exteriorColor").isString(),
      body("interiorColor").isString(),
      body("km").isString(), // You may need custom validation for this field
      body("latitude").isNumeric().optional(),
      body("longitude").isNumeric().optional(),
    ];
    // Run the validation rules on the request body
    validatePostAd(AutosValidationRules, req, res, next);
  } else if (category === "Boats") {
    const BoatsValidationRules = [
      body("category").isString(),
      body("userId").isMongoId(), // Assuming userId is a MongoDB ObjectId
      body("title").isString(),
      body("price").isNumeric(),
      body("brand").isString(),
      body("model").isString(),
      body("description").isString(),
      body("videoUrl").isString(),
      body("address").isString(),
      body("feature_list").isString().optional(),
      body("howToContact").isString(),
      body("condition").isString(),
      body("whatsapp").isString().optional(),
      body("viber").isString(),
      body("year").isNumeric(),
      body("km").isString(), // You may need custom validation for this field
      body("latitude").isNumeric().optional(),
      body("longitude").isNumeric().optional(),
    ];
    validatePostAd(BoatsValidationRules, req, res, next);
  } else if (category === "Busses") {
    const BusValidationRules = [
      body("category").isString(),
      body("userId").isMongoId(), // Assuming userId is a MongoDB ObjectId
      body("title").isString(),
      body("price").isNumeric(),
      body("brand").isString(),
      body("model").isString(),
      body("description").isString(),
      body("videoUrl").isString(),
      body("address").isString(),
      body("feature_list").isString().optional(),
      body("howToContact").isString(),
      body("condition").isString(),
      body("whatsapp").isString().optional(),
      body("viber").isString(),
      body("year").isNumeric(),
      body("bodyShape").isString(),
      body("gearBox").isString(),
      body("fuelType").isString(),
      body("km").isString(), // You may need custom validation for this field
      body("latitude").isNumeric().optional(),
      body("longitude").isNumeric().optional(),
    ];
    // Run the validation rules on the request body
    validatePostAd(BusValidationRules, req, res, next);
  } else if (category === "Construction Machines") {
    const CNValidationRules = [
      body("category").isString(),
      body("userId").isMongoId(), // Assuming userId is a MongoDB ObjectId
      body("title").isString(),
      body("price").isNumeric(),
      body("brand").isString(),
      body("model").isString(),
      body("description").isString(),
      body("videoUrl").isString(),
      body("address").isString(),
      body("feature_list").isString().optional(),
      body("howToContact").isString(),
      body("condition").isString(),
      body("whatsapp").isString().optional(),
      body("viber").isString(),
      body("year").isNumeric(),
      body("bodyShape").isString(),
      body("gearBox").isString(),
      body("fuelType").isString(),
      body("km").isString(), // You may need custom validation for this field
      body("latitude").isNumeric().optional(),
      body("longitude").isNumeric().optional(),
    ];
    // Run the validation rules on the request body
    validatePostAd(CNValidationRules, req, res, next);
  } else if (category === "Drones") {
    const DroneValidationRules = [
      body("category").isString(),
      body("userId").isMongoId(), // Assuming userId is a MongoDB ObjectId
      body("title").isString(),
      body("price").isNumeric(),
      body("brand").isString(),
      body("model").isString(),
      body("description").isString(),
      body("videoUrl").isString(),
      body("address").isString(),
      body("feature_list").isString().optional(),
      body("howToContact").isString(),
      body("condition").isString(),
      body("whatsapp").isString().optional(),
      body("viber").isString(),
      body("year").isNumeric(),
      body("km").isString(), // You may need custom validation for this field
      body("latitude").isNumeric().optional(),
      body("longitude").isNumeric().optional(),
    ];
    // Run the validation rules on the request body
    validatePostAd(DroneValidationRules, req, res, next);
  }else if (category === "Trailers" || category === "Trucks" || category === "Vans" || category === 'Others') {
    const TrailerValidationRules = [
      body("category").isString(),
      body("userId").isMongoId(), // Assuming userId is a MongoDB ObjectId
      body("title").isString(),
      body("price").isNumeric(),
      body("brand").isString(),
      body("model").isString(),
      body("description").isString(),
      body("videoUrl").isString(),
      body("address").isString(),
      body("feature_list").isString().optional(),
      body("howToContact").isString(),
      body("condition").isString(),
      body("whatsapp").isString().optional(),
      body("viber").isString(),
      body("year").isNumeric(),
      body("km").isString().optional(), // You may need custom validation for this field
      body("latitude").isNumeric().optional(),
      body("longitude").isNumeric().optional(),
    ];
    // Run the validation rules on the request body
    validatePostAd(TrailerValidationRules, req, res, next);
  }else if (category === "Parts") {
    const TrailerValidationRules = [
      body("category").isString(),
      body("subCategory").isString(),
      body("userId").isMongoId(), // Assuming userId is a MongoDB ObjectId
      body("title").isString(),
      body("price").isNumeric(),
      body("description").isString(),
      body("videoUrl").isString(),
      body("address").isString(),
      body("feature_list").isString().optional(),
      body("howToContact").isString(),
      body("condition").isString(),
      body("whatsapp").isString().optional(),
      body("viber").isString(),
      body("latitude").isNumeric().optional(),
      body("longitude").isNumeric().optional(),
    ];
    // Run the validation rules on the request body
    validatePostAd(TrailerValidationRules, req, res, next);
  }
};

const validatePostAd = (dataValidationRules, req, res, next) => {
  Promise.all(
    dataValidationRules.map((validationRule) => validationRule.run(req))
  ).then(() => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  });
};
