// // const express = require("express");
// // const multer = require("multer");
// // const cloudinary = require("cloudinary").v2;

import multer from "multer";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import express from 'express'

dotenv.config();

const router = express.Router();

// Set up Cloudinary configuration
const cloud_name = 'dlkuyfwzu';
const api_key = '573974714511519';
const api_secret = 'FKTt8caSw6fXPU7sfD9maqMWuUA'


cloudinary.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret: api_secret,
    secure: true
});

// Set up Multer storage (memory storage keeps the file data in a buffer)
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

router.post("/upload", async (req, res) => {
    console.log("this route is fired");
    if (!req.files) {
        return res.status(400).send("No file uploaded.");
    }

    const uploadPromises = req.files.file.map(file => {
        const imageBuffer = file.data;
        const uploadOptions = {
          resource_type: 'image',
        };
    
        // Return a promise for each image upload
        return new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result.url);
            }
          }).end(imageBuffer);
        });
      });
    
      try {
        // Upload all images and wait for results
        const imageUrls = await Promise.all(uploadPromises);
        res.send({ imageUrls });
      } catch (error) {
        res.status(500).send('Error uploading one or more images.');
      }
});

export default router;