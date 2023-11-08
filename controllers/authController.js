import User from "../models/UserModel.js";
import { failedResponse, successResponse } from "../utils/response.js";
import generateToken from "../utils/generateJWT.js";
import bcrypt, { genSalt } from "bcrypt";
import { uploadMultipleImage, uploadSingleImage } from '../utils/uploadImage.js';
import userEmail from "../utils/email.js";
import generateRandomCode from "../utils/generateRandomCode.js";
import { sendEmailReset } from "../utils/passwordResetEmail.js";
import ResetPassword from "../models/ResetPassModel.js";

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

const getUser = async(req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    return successResponse(res, 200, 'user is retrieved successfully.', true, user);
  } catch (error) {
    return failedResponse(res, 500, 'failed to get user.', false);
  }
}

const removeFavorite = async (req, res) => {
  const ad = await User.findByIdAndUpdate({ _id: req.params.id }, { $set: { favAdIds: [] } }, { new: true });
  return successResponse(res, 200, 'favorite removed successfully.', true, ad);
}

const getUserAds = async(req, res) => {
  try {
    const getUserAds = await User.findById({ _id: req.params.id }).populate('adIds');
    const ads = getUserAds.adIds.sort((a,b) => b.createdAt - a.createdAt);
    return successResponse(res, 200, 'All user ads are sent.', true, ads)
  } catch (error) {
    return failedResponse(res, 500, 'unable to get ads', false);
  }
}

const getFavroiteAds = async(req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id }).select('favAdIds');
    const favAds = await user.populate('favAdIds');
    // Sort favorite ads based on creation date in descending order (latest first)
    const sortedFavAds = favAds?.favAdIds.sort((a, b) => favAds?.favAdIds.indexOf(b) - favAds?.favAdIds.indexOf(a));
    return successResponse(res, 200, 'favorite ads of user is sent successfully.', true, sortedFavAds);
  } catch (error) {
    return failedResponse(res, 500, 'unable to get favorite ads', false);
  }
}

const updateProfile = async (req, res) => {
  function isNullOrNullOrEmpty(value) {
    return value === null || value === undefined || value === "";
  }
  const { firstName, lastName, phoneNumber } = req.body;
  const userId = req.params.id;

  try {
    const updates = {};

    if (!isNullOrNullOrEmpty(firstName)) updates.firstName = firstName;
    if (!isNullOrNullOrEmpty(lastName)) updates.lastName = lastName;
    if (!isNullOrNullOrEmpty(phoneNumber)) updates.phoneNumber = phoneNumber;

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
  if(req.files === undefined){
    try {
      const sentEmail = await userEmail(subject, message, '', email);
      console.log(sentEmail);
      return successResponse(res, 200, 'Email is sent successfully', true, sentEmail)
    } catch (error) {
      return failedResponse(res, 400, 'Email is not sent', false);
    }
  }else{
    const { file } = req.files;
    let image;
    if(file.length > 1){
      image = await uploadMultipleImage(file);
    }else{
      image = await uploadSingleImage(file);
    }
    try {
      const sentEmail = await userEmail(subject, message, image, email, fullName, make, model, year, description, phoneNo);
      return successResponse(res, 200, 'Email is sent successfully', true, sentEmail)
    } catch (error) {
      return failedResponse(res, 400, 'Email is not sent', false);
    }
  }

};
const changePassword=async (req, res) => {
  const { userId } = req.params;
  const { oldPassword, newPassword } = req.body;
  try {
    
      const user = await User.findById(userId).select('+password');

      if (!user) {
          return failedResponse(res, 404, 'User not found', false);
      }

      // Check if the old password matches
      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
      if (!isPasswordValid) {
          return failedResponse(res, 400, 'Old password is incorrect', false);
      }

      // Hash the new password
      const hash = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(newPassword, hash);

      // Update the user's password
      user.password = encryptedPassword;
      await user.save();
      return successResponse(res, 200, 'Password changed successfully', true);
  } catch (error) {
      return failedResponse(res, 500, 'Unable to change password', false);
  }
}

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({email});
  try {
    if(!user){
      return failedResponse(res, 400, 'Provided email is not registered. Please! enter valid email', false);
    }else{
      const resetCode = await generateRandomCode();
      const token = await generateToken(user._id, user?.email, user?.userName, req, res);
      const resetModel = await ResetPassword.create({ resetCode, token });
      await sendEmailReset(email, 'This is email for reset.', resetCode);
      return successResponse(res, 200, 'email is sent successfully', true, token);
    }
  } catch (error) {
    return failedResponse(res, 500, 'something went wrong.', false);
  }
}

const checkToken = async (req, res) => {
  const { token } = req.query;
  const verifyToken = await ResetPassword.findOne({token: token});
  try {
    if(!verifyToken){
      return failedResponse(res, 400, 'token doesn`t exist', false);
    }else{
      return successResponse(res, 200, 'token is verified.', true);
    }
  } catch (error) {
    return failedResponse(res, 500, 'something went wrong.', false);
  }
}

const verifyCode = async(req, res) => {
  const { code } = req.params;
  const verifyCode = await ResetPassword.findOne({ resetCode: code });
  try {
    if(!verifyCode){
      return failedResponse(res, 400, 'code is not verified', false);
    }else{
      return successResponse(res, 200, 'code is verified successfully.', true);
    }
  } catch (error) {
    return failedResponse(res, 500, 'something went wrong.', false)
  }
}

const emptyToken = async (req, res) => {
  const { token } = req.query;
  try {
    await ResetPassword.findOneAndDelete({ token })
    return successResponse(res, 200, 'user token and code is expired.', true)
  } catch (error) {
    return failedResponse(res, 500, 'something went wrong.', false);
  }
}

const resetPassword = async(req, res) => {
  const { password, email, token } = req.body;
  const user = await User.findOne({ email: email });

  try {
    if(!user){
      return failedResponse(res, 400, 'User with the provided doesn`t exists.', false);
    }
    const hash = await genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, hash);
    user.password = encryptedPassword;
    await user.save();
    await ResetPassword.findOneAndDelete({ token });
    return successResponse(res, 200, `${email} password reset successfully.`, true);
  } catch (error) {
    return failedResponse(res, 500, 'something wrong.', false);
  }

}

export {
    register,
    login,
    logout,
    updateProfile,
    getUserAds,
    getFavroiteAds,
    removeFavorite,
    sendEmail,
    getUser,
    changePassword,
    forgotPassword,
    checkToken,
    emptyToken,
    verifyCode,
    resetPassword
}