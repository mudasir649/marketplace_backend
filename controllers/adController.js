import Ad from '../models/AdModel.js';
import FavoriteAd from '../models/FavoriteAdModel.js';
import User from '../models/UserModel.js';
import { successResponse, failedResponse } from '../utils/response.js';
import { uploadMultipleImage } from '../utils/uploadImage.js'

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
        const ad = await Ad.find().sort({createdAt: 1}).skip(skip).limit(10);
        const totalAds = await Ad.find().count();
        return successResponse(res, 201, 'All ads are sent.', true, {ad, totalAds});
    } catch (error) {
        return failedResponse(res, 500, 'Unable to sent ads.', false);
    }
}

const fetchFeaturedAds = async (req, res) => {
    try {
        const ad = await Ad.find().sort({createdAt: -1}).limit(12);
        return successResponse(res, 201, 'All ads are sent.', true, ad);
    } catch (error) {
        return failedResponse(res, 500, 'Unable to sent ads.', false);
    }
}

const createAd = async (req, res) => {
    try {
        if(Object.keys(req.query).length === 0){
            const data = req.body
            const imageData = await uploadMultipleImage(req.files.file);
            data.image = imageData;
            const ad = await Ad.create(data);
            const user = await User.findByIdAndUpdate({ _id:data.userId }, { $push: {adIds: ad?._id} }, { new: true });
            if(ad){
            return successResponse(res, 201, 'Ad is posted successfully.', true, ad)
            }else{
                return failedResponse(res, 500, 'something went wrong', false);
            }
        }else{
            const data = JSON.parse(req.body.data);
            const imageData = await uploadMultipleImage(req.files.file);
            data.image = imageData;
            const ad = await Ad.create(data);
            const user = await User.findById({ _id:data.userId }, { adIds: ad?._id });
            console.log(user);
            if(ad){
                return successResponse(res, 201, 'Ad is posted successfully.', true, ad)
            }else{
                return failedResponse(res, 500, 'something went wrong', false);
            }
        }
    } catch (error) {
        return failedResponse(res, 500, 'something went wrong', false);
    }
}

const getSpecificAd = async(req, res) => {
    try {
        const record = await Ad.findById({ _id: req.params.id });
        return successResponse(res, 200, 'specific record sent.', true, record);
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


// const addToFavorite = async(req, res) => {
//     try {
//         const favorite = await FavoriteAd.findOneAndUpdate({})
//     } catch (error) {
        
//     }
// }


export {
    fetchTopAds,
    fetchFeaturedAds,
    fetchAllAds,
    createAd,
    addView,
    getSpecificAd,
    deleteAd,
}
