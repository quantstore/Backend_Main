import cloudinary from "cloudinary"
import { v2 as cloudinaryV2 } from "cloudinary"
import {fs} from 'fs' // to delete the file after uploading it to cloudinary; this is file system module of node js;
import dotenv from 'dotenv'
dotenv.config();

cloudinaryV2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localfilePath) =>{
    try{
        if(!localfilePath){
            throw new Error("File Path is required")
        }
        //uploading the file to cloudinary
        const response = cloudinaryV2.uploader.upload(localfilePath, {resource_type: "auto"})
        console.log("File uploaded successfully");
        console.log(response.url);
        return response;
    }catch(error){
        // unlinking the file from the local system
        fs.unlinkSync(localfilePath);// this will delete the file from local system in case of error in asyncronous way 
        return null
        console.log("Error while uploading the file to cloudinary", error);
    }
}

// const uploadResult = await cloudinaryV2.uploader
//        .upload(
//            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//                public_id: 'shoes',
//            }
//        )
//        .catch((error) => {
//            console.log(error);
//        });

export {uploadOnCloudinary};