import User from "../models/UserModel.js";
import { failedResponse, successResponse } from "../utils/response.js";
import generateToken from "../utils/generateJWT.js";
import bcrypt from "bcrypt";
import { uploadSingleImage } from '../utils/uploadImage.js';
import Ad from "../models/AdModel.js";

const login = async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // return res.status(200).json("this is working")
  
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = await generateToken(user?._id, user?.email, user?.userName, req,res);
      const userDetails = {
        id: user?._id,
        image: user?.image,
        email: user?.email,
        username: user?.userName,
        firstName: user?.firstName,
        lastName: user?.lastName
      }
      return successResponse(res, 200, 'You are loggedin.', true, {token, userDetails});
    } else {
      return failedResponse(res, 401, 'Invalid email or password.', false);
    }
}

const register = async(req, res) => {
    const { firstName, lastName, email, userName, password } = req.body;
    const existingUser = await User.findOne({email});
    if(existingUser?.email){
        return failedResponse(res, 400, 'Alert! email already exists please enter someother email.', false);
    }    // console.log(user);
    try {
        const existingUser = await User.findOne({email});
        if(existingUser?.email){
            return failedResponse(res, 400, 'Alert! email already exists please enter someother email.', false);
        }

        const hash = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, hash);
        const user = await User.create({firstName, lastName, email, userName, password: encryptedPassword});
        if(user){
            const token = await generateToken(user?._id, user?.email, user?.userName, req,res);
            const userDetails = {
                id: user?._id,
                image: user?.image,
                email: user?.email,      
                username: user?.userName,
                firstName: user?.firstName,
                lastName: user?.lastName,
              }
    
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
      const ads = await Ad.findById({_id: allFavAds[i].adId });
      favAdsArr.push(ads)
    }
    return successResponse(res, 200, 'favorite ads of user is sent successfully.', true, favAdsArr);
  } catch (error) {
    return failedResponse(res, 500, 'unable to get favorite ads', false);
  }
}

const updateProfile = async(req, res) => {
  const { firstName, lastName, phoneNo, website, viber, whatsapp } = req.body;
  const userId = req.params.id;
  try {
    if(!req.files){
      const user = await User.findByIdAndUpdate({_id: userId}, { firstName, lastName, phoneNo, website, viber, whatsapp }, { new: true });
      if(user){
        return successResponse(res, 200, 'user profile updated successfully', true, user);
      }
    }else{
      const image = await uploadSingleImage(req.files.file);
      const user = await User.findByIdAndUpdate({_id: userId}, { image, firstName, lastName, phoneNo, website, viber, whatsapp }, { new: true });
      if(user){
        const token = await generateToken(user?._id, user?.email, user?.userName, req,res);
        const userDetails = {
          id: user?._id,
          image: user?.image,
          email: user?.email,      
          username: user?.userName,
          firstName: user?.firstName,
          lastName: user?.lastName,
        }
        return successResponse(res, 200, 'user profile updated successfully', true, { token, userDetails });
      }   
    }
  } catch (error) {
    return failedResponse(res, 500, 'something went wrong.', false)
  }
}

export {
    register,
    login,
    logout,
    updateProfile,
    getUserAds,
    getFavroiteAds
}