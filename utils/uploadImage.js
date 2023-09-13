import { v2 as cloudinary } from "cloudinary";

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


const uploadMultipleImage =  async (files) => {
    const uploadPromises = files.map(file => {
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
        return imageUrls;
      } catch (error) {
        return error;
    }
}

export default uploadMultipleImage;