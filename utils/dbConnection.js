import mongoose from "mongoose";

const dbConnection = async () => {
    try {
        mongoose.connect(process.env.PUBLIC_DB_CONNECTION, {
            useNewUrlParser: true,
        }).then(() => console.log("database connected"));
        mongoose.set('strictQuery', false);
    } catch (error) {
        console.log(error);
    } 
}

export default dbConnection;