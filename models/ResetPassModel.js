import mongoose from "mongoose";

const ResetPasswordSchema = new mongoose.Schema({
    resetCode: {
        type: String
    },
    token: {
        type: String
    },
});

const ResetPassword = mongoose.model('ResetPassword', ResetPasswordSchema);
export default ResetPassword;