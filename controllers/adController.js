import Ad from '../models/AdModel.js';
import BikesSubcategory from '../models/BikesSubcategory.js';
import Cars from '../models/CarsModel.js';
import FavoriteAd from '../models/FavoriteAdModel.js';
import Motorcycles from '../models/MotorcycleModel.js';
import User from '../models/UserModel.js';
import { successResponse, failedResponse } from '../utils/response.js';
import { uploadMultipleImage, uploadSingleImage } from '../utils/uploadImage.js'

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
            console.log(user);
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
    const { address, category, subcategory, model }= req.body;
    try {
        if(address && category && model){
            const ad = await Ad.find({ address: address, category: category, model: model });
            return successResponse(res, 200, 'All records are sent.', true, ad);
        }else if(address && category && subcategory && model){
            const ad = await Ad.find({ address: address, category: category, subCategory: subcategory, model: model });
            return successResponse(res, 200, 'All records are sent.', true, ad);
        }else if(address && category && subcategory){
            const ad = await Ad.find({ address: address, category: category, subCategory: subcategory });
            return successResponse(res, 200, 'All records are sent.', true, ad);
        }else if(address && category){
            const ad = await Ad.find({ address: address, category: category });
            return successResponse(res, 200, 'All records are sent.', true, ad);
        }else if(category){
            const ad = await Ad.find({ category: category });
            return successResponse(res, 200, 'All records are sent.', true, ad);
        }else if(address){
            const ad = await Ad.find({ address: address });
            return successResponse(res, 200, 'All records are sent.', true, ad);
        }else{
            return successResponse(res, 200, 'No record found.', true)
        }
    } catch (error) {
        return failedResponse(res, 500, 'Unable to search record.', false);
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

const car = async(req, res) => {
    const cars = await Cars.create(req.body);
    return successResponse(res, 201, 'car is created.', true, cars );
}

const BikesSubCategory = async (req, res) => {
    const bikesSub = await BikesSubcategory.create(req.body);
    return successResponse(res, 201, 'Bikes subcategory is created.', true,  bikesSub);
}

const motorcycles = async(req, res) => {
    const motorcycle = await Motorcycles.create(req.body);
    return successResponse(res, 201, 'motorcycle is created.', true, motorcycle );
}

const findCars = async(req, res) => {
    const cars = await Cars.find().select('make').sort('make');
    return successResponse(res, 200, 'car is created.', true, cars );
}

const findCarModels = async(req, res) => {
    const cars = await Cars.find({make: req.params.model}).select('model').sort('model');
    return successResponse(res, 200, 'car is created.', true, cars );
}

const findMotorcycle = async(req, res) => {
    const motorcycle = await Motorcycles.find().select('make').sort('model');
    return successResponse(res, 200, 'motorcycle make is sent.', true, motorcycle );
}

const findMotorcycleModel = async(req, res) => {
    const motorcycle = await Motorcycles.find({ make: req.params.model }).select('model').sort('model');
    return successResponse(res, 200, 'motorcycle model is sent.', true, motorcycle );
}

const findBikeSubcategory = async(req, res) => {
    const bikeSubcategory = await BikesSubcategory.find().sort('category');
    return successResponse(res, 200, 'bike subcategory is sent.', true, bikeSubcategory);
}

const findbikeSubcategoryMake = async(req, res) => {
    const bikeSubcategory = await BikesSubcategory.find({subcategory: req.params.subcategory}).select('make').sort('make');
    return successResponse(res, 200, 'bike subcategory is sent.', true, bikeSubcategory);
}

const findVehicle = async(req, res) => {
    const type = req.params.type;
        if(type === 'autos'){
            const cars = await Cars.find().select('make').sort('make');
            return successResponse(res, 200, 'car is created.', true, cars );
        }else if(type === "Bikes"){
            const motorcycle = await Motorcycles.find().select('make');
            return successResponse(res, 200, 'motorcycle make is sent.', true, motorcycle );
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
    car,
    findCars,
    findCarModels,
    motorcycles,
    BikesSubCategory,
    findMotorcycle,
    findMotorcycleModel,
    findBikeSubcategory,
    findbikeSubcategoryMake,
    findVehicle,
    deleteFromfavorite
}
