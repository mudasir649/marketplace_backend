import User from "../models/UserModel.js";
import { failedResponse, successResponse } from "../utils/response.js";
import generateToken from "../utils/generateJWT.js";
import bcrypt from "bcrypt";

const login = async(req, res) => {
    const { email, password } = req.body;

    console.log(req.body);

    const user = await User.findOne({ email });

    console.log(user);

    // return res.status(200).json("this is working")
  
    if (user && (await bcrypt.compare(password, user.password))) {
      generateToken(res, user._id);

      const userDetails = {
        id: user?._id,
        image: user?.image,
        email: user?.email,
        username: user?.userName,
        firstname: user?.firstname,
        lastName: user?.lastName
      }

      return successResponse(res, 200, 'You are loggedin.', true, userDetails);
    } else {
      return failedResponse(res, 401, 'Invalid email or password.', false);
    }
}

const register = async(req, res) => {
    const { email, userName, password } = req.body
    try {
        const existingUser = await User.findOne({email});
        if(existingUser?.email == email){
            return failedResponse(res, 400, 'Alert! email already exists please enter someother email.', false);
        }

        const hash = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, hash);
        const user = await User.create({email, userName, password: encryptedPassword});


        if(user){
            generateToken(res, user?._id);
            const userDetails = {
                id: user?._id,
                image: user?.image,
                email: user?.email,
                username: user?.userName,
                firstname: user?.firstname,
                lastName: user?.lastName
              }
    
            return successResponse(res, 201, 'user created successfully.', true, userDetails); 
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


export {
    register,
    login,
    logout,
}