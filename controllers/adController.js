import Ad from '../models/AdModel.js';
import FavoriteAd from '../models/FavoriteAdModel.js';
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
        console.log(user);
        return successResponse(res, 201, 'ad is marked favorite.', true);
    } catch (error) {
        return successResponse(res, 201, 'Unable to mark ad favorite.', false);
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
}
