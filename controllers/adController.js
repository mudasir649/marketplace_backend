import Ad from '../models/AdModel.js';
import BikesSubcategory from '../models/BikesSubcategory.js';
import Cars from '../models/CarsModel.js';
import FavoriteAd from '../models/FavoriteAdModel.js';
import Motorcycles from '../models/MotorcycleModel.js';
import User from '../models/UserModel.js';
import Van from '../models/VanModel.js';
import Trailer from '../models/TrailerModel.js';
import ConstructionMachine from '../models/ConstructionMachineModel.js';
import { successResponse, failedResponse } from '../utils/response.js';
import { uploadMultipleImage, uploadSingleImage } from '../utils/uploadImage.js'
import Truck from '../models/TrucksModel.js';
import Bus from '../models/BussesModel.js';
import Boats from '../models/BoatsModel.js';
import Drones from '../models/DronesModel.js';

const fetchTopAds = async(req, res) => {
    try {
        const ad = await Ad.find().sort({createdAt: -1}).limit(4);
        return successResponse(res, 200, 'Top ads are sent successfully.', true, ad);
    } catch (error) {
        return failedResponse(res, 500, 'Unable to sent ads.', false);
    }
}

const fetchAllAds = async (req, res) => {
    try {
        const skip = (req.query.page - 1) * 10;
        const ad = await Ad.find().sort({createdAt: -1}).skip(skip).limit(10);
        const totalAds = await Ad.find().count();
        return successResponse(res, 200, 'All ads are sent.', true, {ad, totalAds});
    } catch (error) {
        return failedResponse(res, 500, 'Unable to sent ads.', false);
    }
}

const fetchFeaturedAds = async (req, res) => {
    try {
        const ad = await Ad.find().sort({createdAt: -1}).limit(12);
        return successResponse(res, 200, 'All ads are sent.', true, ad);
    } catch (error) {
        return failedResponse(res, 500, 'Unable to sent ads.', false);
    }
}

const createAd = async (req, res) => {
    const { file } = req.files;
    
    try {
        if(file.length > 1){
            const data = req.body;
            const imageData = await uploadMultipleImage(file);
            data.images = imageData;
            const ad = await Ad.create(data);
            const user = await User.findByIdAndUpdate({ _id:data.userId }, { $push: {adIds: ad?._id} }, { new: true });
            if(ad){
                return successResponse(res, 201, 'Ad is posted successfully.', true, ad)
            }else{
                return failedResponse(res, 500, 'ad post with single file failed', false);
            }
        }else{
            const data = req.body;
            const imageData = await uploadSingleImage(file);
            data.images = imageData;
            const ad = await Ad.create(data);
            const user = await User.findByIdAndUpdate({ _id:data.userId }, { $push: {adIds: ad?._id} }, { new: true });
            if(ad){
                return successResponse(res, 201, 'Ad is posted successfully.', true, ad)
            }else{
                return failedResponse(res, 500, 'ad post with multiple file failed', false);
            }        }
        
    } catch (error) {
        return failedResponse(res, 500, 'something went wrong', false);
    }
}

const getSpecificAd = async(req, res) => {
    try {
        const getUserAd = await Ad.findById({ _id: req.params.id });
        const getRecord = await getUserAd.populate('userId');
        return successResponse(res, 200, 'specific record sent.', true, getRecord.toJSON());
    } catch (error) {
        return failedResponse(res, 500, 'unable to get record.', false)
    }
}

const addView = async(req, res) => {
        await Ad.findByIdAndUpdate({_id: req.query.id}, {$inc: { views: 1 }}, {new: true});
        res.status(204).send();
}

const deleteAd = async(req, res) => {
    try {
        const ad = await Ad.findByIdAndDelete({_id: req.params.id});
        return successResponse(res, 204, 'ad deleted successfully.', true);
    } catch (error) {
        return failedResponse(res, 500, 'unable to delete record.', false)
    }
}

const filterSearch = async(req, res) => {
    const { address, category, subCategory, model, page } = req.query;
    try {
        if(category){
            const skip = (page - 1) * 10;
            const ad = await Ad.find({ category: category }).sort({ createdAt: -1 }).skip(skip).limit(10);
            const totalAds = await Ad.find({ category: category }).count();
            return successResponse(res, 200, 'All records are sent.', true, { ad, totalAds });
        }if(subCategory){
            const skip = (page - 1) * 10;
            const ad = await Ad.find({ subCategory: subCategory }).sort({ createdAt: -1 }).skip(skip).limit(10);
            const totalAds = await Ad.find({ subCategory: subCategory }).count();
            return successResponse(res, 200, 'All records are sent.', true, { ad, totalAds });
        }
        else{
            return successResponse(res, 200, 'No record found.', true)
        }
    } catch (error) {
        return failedResponse(res, 500, 'Unable to search record.', false);
    }
}

const advanceSearchFilter = async(req, res) => {
    const { condition, brand, minPrice, maxPrice, page } = req.query;
    const skip = (page - 1) * 10;
    
    let query = {};

    if(condition) query.condition = condition;
    if(brand) query.brand = brand;
    if(minPrice !== '' && maxPrice == ''){
        query.price = { $lte: minPrice }
    }else if(maxPrice !== '' && minPrice == ''){
        query.price = { $gte: maxPrice }
    }else if(maxPrice !== '' && minPrice !== ''){
        query.price = { $gte: maxPrice, $lte: minPrice }
    }

    if(Object.keys(query).length == 0){
        const ad = await Ad.find().sort({ createdAt: -1 }).skip(skip).limit(10);
        const totalAds = ad.length;
        return successResponse(res, 200, 'Record is retrieved successfully.', true, { ad, totalAds });   
    }else{
        const ad = await Ad.find(query).sort({ createdAt: -1 }).skip(skip).limit(10);
        const totalAds = ad.length;
        return successResponse(res, 200, 'Record is retrieved successfully.', true, { ad, totalAds });   
    }
}


const addToFavorite = async(req, res) => {
     const data = req.body;
    try {
        const favorite = await FavoriteAd.create(req.body);
        const user = await User.findByIdAndUpdate({ _id: data?.userId }, {$push: { favAdIds: favorite?._id }},  { new: true });
        return successResponse(res, 201, 'ad is marked favorite.', true);
    } catch (error) {
        return successResponse(res, 201, 'Unable to mark ad favorite.', false);
    }
}


const deleteFromfavorite = async(req, res) => {
    const data = req.body;
    try {
        const removeFav = await FavoriteAd.findByIdAndDelete({_id: req.params.id});
        const updatedUser = await User.findByIdAndUpdate(
            data.userId,
            { $pull: { favAdIds: req.params.id } }, // Convert req.params.id to a string
            { new: true }
          );
        return successResponse(res, 204, 'rmeoved from favorite', true);
    } catch (error) {
        return failedResponse(res, 500, 'unable to remove from favorite.', false);
    }
}

const busses = async(req, res) => {
    const bus = await Trailer.create(req.body);
    return successResponse(res, 201, 'construction machine is created successfully.', true, bus );
}


const BikesSubCategory = async (req, res) => {
    const bikesSub = await BikesSubcategory.create(req.body);
    return successResponse(res, 201, 'Bikes subcategory is created.', true,  bikesSub);
}

const motorcycles = async(req, res) => {
    const motorcycle = await Motorcycles.create(req.body);
    return successResponse(res, 201, 'motorcycle is created.', true, motorcycle );
}

const findModels = async(req, res) => {
    const { type, make } = req.params;
    if(type == 'Autos'){
        const cars = await Cars.find({make: make}).select('model').sort('model');
        return successResponse(res, 200, 'car is created.', true, cars );
    }else if(type == 'Motorcycle'){
        const motorcycle = await Motorcycles.find({ make: make }).select('model').sort('model');
        return successResponse(res, 200, 'motorcycle model is sent.', true, motorcycle );
    }else{
        return failedResponse(res, 400, 'no model exists.', true);
    }
}


const findVehicleMake = async(req, res) => {
    const type = req.params.type;
        if(type === 'Autos'){
            let carArr = [];
            const cars = await Cars.find().sort('make');
            for (let i = 0; i < cars.length; i++) {
                carArr.push(cars[i].make);
            }
            return successResponse(res, 200, 'car is created.', true, { make: carArr } );
        }else if(type === "Motorcycle"){
            let bikeArr = [];
            const motorcycle = await Motorcycles.find().sort('make');
            for (let i = 0; i < motorcycle.length; i++) {
                bikeArr.push(motorcycle[i].make);
            }
            return successResponse(res, 200, 'motorcycle make is sent.', true, { make: bikeArr} );
        }else if(type === "Bicycles"){
            const bikesSubCat = await BikesSubcategory.find({category: 'bicycles'}).select('make');
            let bikesSubArr = []
            for (let i = 0; i < bikesSubCat.length; i++) {
                const makes = bikesSubCat[i].make;
                for (let j = 0; j < makes.length; j++) {
                    bikesSubArr.push(makes[j]);
                }
            }
            return successResponse(res, 200, 'motorcycle make is sent.', true,  { make: bikesSubArr});
        }else if(type === "E-scooter"){
            const bikesSubCat = await BikesSubcategory.find({category: 'eScooters'}).select('make');
            let bikesSubArr = []
            for (let i = 0; i < bikesSubCat.length; i++) {
                const makes = bikesSubCat[i].make;
                for (let j = 0; j < makes.length; j++) {
                    bikesSubArr.push(makes[j]);
                }
            }
            return successResponse(res, 200, 'motorcycle make is sent.', true,  { make: bikesSubArr});
        }else if(type === "E-bikes"){
            const bikesSubCat = await BikesSubcategory.find({category: 'eBikes'}).select('make');
            let bikesSubArr = []
            for (let i = 0; i < bikesSubCat.length; i++) {
                const makes = bikesSubCat[i].make;
                for (let j = 0; j < makes.length; j++) {
                    bikesSubArr.push(makes[j]);
                }
            }
            return successResponse(res, 200, 'motorcycle make is sent.', true,  { make: bikesSubArr});
        }else if(type === "Busses"){
            const bus = await Bus.find();
            let busArr = []
            for (let i = 0; i < bus.length; i++) {
                const makes = bus[i].make;
                for (let j = 0; j < makes.length; j++) {
                    busArr.push(makes[j]);
                }
            }
            return successResponse(res, 200, 'motorcycle make is sent.', true, {make: busArr} );
        }else if(type === "Vans"){
            const van = await Van.find().select('make');
            let vanArr = []
            for (let i = 0; i < van.length; i++) {
                const makes = van[i].make;
                for (let j = 0; j < makes.length; j++) {
                    vanArr.push(makes[j]);
                }
            }
            return successResponse(res, 200, 'motorcycle make is sent.', true, { make: vanArr } );
        }else if(type === "Trailers"){
            const trailer = await Trailer.find().select('make');
            let trailerArr = []
            for (let i = 0; i < trailer.length; i++) {
                const makes = trailer[i].make;
                for (let j = 0; j < makes.length; j++) {
                    trailerArr.push(makes[j]);
                }
            }
            return successResponse(res, 200, 'motorcycle make is sent.', true, { make: trailerArr } );
        }else if(type === "Trucks"){
            const trucks = await Truck.find().select('make');
            let trucksArr = []
            for (let i = 0; i < trucks.length; i++) {
                const makes = trucks[i].make;
                for (let j = 0; j < makes.length; j++) {
                    trucksArr.push(makes[j]);
                }
            }
            return successResponse(res, 200, 'motorcycle make is sent.', true, { make: trucksArr} );
        }else if(type === "Construction Machine"){
            const constructionMachine = await ConstructionMachine.find().select('make');
            let cnArr = []
            for (let i = 0; i < constructionMachine.length; i++) {
                const makes = constructionMachine[i].make;
                for (let j = 0; j < makes.length; j++) {
                    cnArr.push(makes[j]);
                }
            }
            return successResponse(res, 200, 'motorcycle make is sent.', true, {make: cnArr} );
        }else if(type === "Boats"){
            const boats = await Boats.find().select('make');
            let boatsArr = []
            for (let i = 0; i < boats.length; i++) {
                const makes = boats[i].make;
                for (let j = 0; j < makes.length; j++) {
                    boatsArr.push(makes[j]);
                }
            }
            return successResponse(res, 200, 'motorcycle make is sent.', true, { make: boatsArr} );
        }else if(type === "Drones"){
            const drones = await Drones.find().select('make');
            let droneArr = []
            for (let i = 0; i < drones.length; i++) {
                const makes = drones[i].make;
                for (let j = 0; j < makes.length; j++) {
                    droneArr.push(makes[j]);
                }
            }
            return successResponse(res, 200, 'motorcycle make is sent.', true, { make: droneArr} );
        }else{
            return failedResponse(res, 400, 'sorry no record found.', false)
        }   
}

const findVehicleSubCategory = async(req, res) => {
    const type = req.params.type;
        if(type === "Busses"){
            const bus = await Bus.find().select('category');
            return successResponse(res, 200, 'motorcycle make is sent.', true, bus );
        }else if(type === "Vans"){
            const van = await Van.find().select('category');
            return successResponse(res, 200, 'motorcycle make is sent.', true, van );
        }else if(type === "Trailers"){
            const trailer = await Trailer.find().select('category');
            return successResponse(res, 200, 'motorcycle make is sent.', true, trailer );
        }else if(type === "Trucks"){
            const trucks = await Truck.find().select('category');
            return successResponse(res, 200, 'motorcycle make is sent.', true, trucks );
        }else if(type === "Construction Machine"){
            const constructionMachine = await ConstructionMachine.find().select('category');
            return successResponse(res, 200, 'motorcycle make is sent.', true, constructionMachine );
        }else{
            return failedResponse(res, 400, 'sorry no record found.', false)
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
    addToFavorite,
    filterSearch,
    motorcycles,
    BikesSubCategory,
    findModels,
    findVehicleMake,
    findVehicleSubCategory,
    deleteFromfavorite,
    busses,
    advanceSearchFilter
}
