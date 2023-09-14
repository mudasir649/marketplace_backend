import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/authRoutes.js";
import fileUpload from 'express-fileupload';
import dbConnection from './utils/dbConnection.js'
import adRoutes from './routes/adRoutes.js';
import googleRoutes from './routes/gogoleRoutes.js';

const app = express();

// body parser middleware to handle request body
app.use(bodyParser.json({ extended:true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload())
app.use(cookieParser())
dotenv.config({ path:".env" })

// cors to allow cross origin access
app.use(cors({ origin: true }));
app.options("*", cors());
  

//database connection
app.use(async (req, res, next) => {
    await dbConnection();
    next();
});

app.use('/googleRoutes', googleRoutes)
app.use('/auth', authRoutes);
app.use('/ad', adRoutes)

const PORT = process.env.BACK_END_PORT || 4000;

app.listen(PORT,() => {
    console.log(`App running on port ${PORT}`);
})
