import User from "../models/UserModel.js";
import { failedResponse, successResponse } from "../utils/response.js";
import generateToken from "../utils/generateJWT.js";
import bcrypt from "bcrypt";
import { uploadMultipleImage, uploadSingleImage } from '../utils/uploadImage.js';
import Ad from "../models/AdModel.js";
import Sib from "sib-api-v3-sdk";
import userEmail from "../utils/email.js";



const login = async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('password');
    if (user && (await bcrypt.compare(password, user.password))) {
      const userDetails = await User.findOne({ email });
      const token = await generateToken(user?._id, user?.email, user?.userName, req,res);
      return successResponse(res, 200, 'You are loggedin.', true, {token, userDetails});
    } else {
      return failedResponse(res, 401, 'Invalid email or password.', false);
    }
}

const register = async(req, res) => {
    const { firstName, lastName, email, userName, password, phoneNumber } = req.body;
    const existingUser = await User.findOne({email});
    if(existingUser?.email){
        return failedResponse(res, 400, 'Alert! email already exists please enter someother email.', false);
    }   
    try {
        const existingUser = await User.findOne({email});
        if(existingUser?.email){
            return failedResponse(res, 400, 'Alert! email already exists please enter someother email.', false);
        }

        const hash = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, hash);
        const userDetails = await User.create({firstName, lastName, email, phoneNumber, userName, password: encryptedPassword});
        if(userDetails){
            const token = await generateToken(userDetails?._id, userDetails?.email, userDetails?.userName, req,res);
            return successResponse(res, 201, 'user created successfully.', true, { token, userDetails}); 
        }
    } catch (error) {
        return failedResponse(res, 400, 'Unable to create user! please try again.', false);
    }
}

const logout = (req, res) => {
  
        const rs = res.clearCookie('jwt');
        return successResponse(
            res,
            200,
            "Your are logged out successfully.",
            true
        )
}

const removeFavorite = async (req, res) => {
  const ad = await User.findByIdAndUpdate({ _id: req.params.id }, { $set: { favAdIds: [] } }, { new: true });
  return successResponse(res, 200, 'favorite removed successfully.', true, ad);
}

const getUserAds = async(req, res) => {
  try {
    const getAds = await User.findById({ _id: req.params.id });
    const ads = await getAds.populate('adIds');
    return successResponse(res, 200, 'All user ads are sent.', true, ads)
  } catch (error) {
    return failedResponse(res, 500, 'unable to get ads', false);
  }
}

const getFavroiteAds = async(req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id }).select('favAdIds');
    const favAds = await user.populate('favAdIds');
    let allFavAds = favAds?.favAdIds;
    const favAdsArr = [];
    for (let i = 0; i < allFavAds.length; i++) {
      const adId = allFavAds[i].adId;
      const ad = await Ad.findById(adId);
      if(ad){
        const adObject = ad.toObject();
        adObject.favAdId = allFavAds[i]._id;
        favAdsArr.push(adObject);
      }
    }
    return successResponse(res, 200, 'favorite ads of user is sent successfully.', true, favAdsArr);
  } catch (error) {
    return failedResponse(res, 500, 'unable to get favorite ads', false);
  }
}

const updateProfile = async (req, res) => {
  const { firstName, lastName, phoneNumber } = req.body;
  const userId = req.params.id;

  try {
    const updates = {};

    if (firstName !== undefined) updates.firstName = firstName;
    if (lastName !== undefined) updates.lastName = lastName;
    if (phoneNumber !== undefined) updates.phoneNumber = phoneNumber;

    if (req.files) {
      const image = await uploadSingleImage(req.files.file);
      if (image) updates.image = image;
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, updates, { new: true });

    if (user) {
      const userDetails = await User.findById({ _id: userId });
      return successResponse(res, 200, 'User updated successfully', true, { userDetails });
    }

    return failedResponse(res, 404, 'User not found', false);
  } catch (error) {
    return failedResponse(res, 500, 'Something went wrong.', false);
  }
};

const sendEmail = async (req, res) => {
  const { subject, message, email, fullName, make, model, year, description, phoneNo } = req.body;

  if(req.files !== undefined){
    const { file } = req.files;
    let image;
    if(file.length > 1){
      image = await uploadMultipleImage(file);
    }else{
      image = await uploadSingleImage(file);
    }
    try {
      const sentEmail = await userEmail(subject, message, image, email, fullName, make, model, year, description, phoneNo);
      return successResponse(res, 200, 'Email is sent successfully', true)
    } catch (error) {
      return failedResponse(res, 400, 'Email is not sent', false);
    }
  }else{
    try {
      const sentEmail = await userEmail(subject, message, email);
      return successResponse(res, 200, 'Email is sent successfully', true)
    } catch (error) {
      return failedResponse(res, 400, 'Email is not sent', false);
    }
  }
};




export {
    register,
    login,
    logout,
    updateProfile,
    getUserAds,
    getFavroiteAds,
    removeFavorite,
    sendEmail
}