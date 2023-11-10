import mongoose from "mongoose";

const OTPSchema = new mongoose.Schema({
    resetCode: {
        type: String
    },
    token: {
        type: String
    },
});

const OTP = mongoose.model('OTP', OTPSchema);
export default OTP;