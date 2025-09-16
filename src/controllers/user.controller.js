import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";    
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// register user controller

const registerUser = asyncHandler( async (req, res, next) =>{
    // register user logic :-
    // 1.get user details from frontend
    // 2.validate user details - not empty, valid email, password length
    // 3.check if user already exists - username or email
    // 4.check for images, check for avatar
    // 5.upload to cloudinary, avatar = url from cloudinary
    // 6.create user object - create entry in db
    // remove password from response refresh token, access token
    // check for user creation success
    // 4.hash the password
    // 5.store the user in db
    // 6.send response
    console.log("req.body",req.body)
    console.log("req.files",req.files)
    // step 1 and 2
    // destructuring the req.body object to get the user details
    // fullname, email, username, password are the fields in the req.body object
    const {fullname,email, username,password} = req.body 
    console.log("email",email)
    console.log("username",username)
    // if(fullName === ""){
    //     throw new ApiError(400,"Fullname is required")
    // }

    if(
        [fullname,email,username,password].some((field) => 
            field?.trim()==="")
        ){
    
            throw new ApiError(400,"All fields are required");
        }
        // check if user already exists how ? - username or email
        //findOne is async function that returns a promise which resolves to the first document that matches the query or null if no document matches. 
        const existedUser = await User.findOne({
            $or:[{ email },{ username }]
        });
        if(existedUser){
            throw new ApiError(409,"User already exists");
        }
    // check for images, check for avatar 
    // req.files is an object that contains the files uploaded via multer middleware.
    // avatar is the name of the field in the form that contains the avatar image.
    // req.files.avatar is an array of files uploaded via the avatar field.
    // req.files.avatar[0] is the first file in the array.
    // req.files.avatar[0].path is the path of the file on the server.
    // if no file is uploaded, req.files.avatar will be undefined.
    // optional chaining operator ?. is used to avoid errors if req.files or req.files.avatar is undefined. 
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath =  req.files?.coverImage[0]?.path;

    // avatar is required
    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar is required")
    }
    // upload to cloudinary, avatar = url from cloudinary
    // why await ? - because uploadOnCloudinary is an async function that returns a promise.
    // we need to wait for the promise to resolve before we can use the result.

    const uploadAvatarResult = await uploadOnCloudinary(avatarLocalPath)
    const uploadCoverImageResult = await uploadOnCloudinary(coverImageLocalPath)
    if(!uploadAvatarResult){
        throw new ApiError(500,"Error while uploading avatar image")
    }

    // create user object - create entry in db
    const user = await User.create({
        fullname,
        email,
        username: username.toLowerCase(),
        password,
        avatar: uploadAvatarResult?.url,
        coverImage: uploadCoverImageResult?.url || ""
    })
    // fetch the user from db to remove password and tokens
    // remove password from response refresh token, access token
    //how ? - by using select method of mongoose. select method is used to include or exclude fields from the result.
    // -password means exclude password field.
    // -refreshToken means exclude refreshToken field.
    // -accessToken means exclude accessToken field.
    // what is select method ? - select method is a mongoose method that is used to include or exclude fields from the result.
    // what is findById method ? - findById method is a mongoose method that is used to find a document by its id.
    // user._id is the id of the user that we just created.
    // why do we need to fetch the user again ? - because we need to remove the password and tokens from the response.
    // we can also use toObject method of mongoose to convert the mongoose document to a plain javascript object and then delete the fields we don't want.
    // but using select method is more efficient because it only fetches the fields we want from the database.
    // why remove password and tokens ? - because we don't want to expose sensitive information in the response.

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken -accessToken"
    )
    if(!createdUser){
        throw new ApiError(500,"Error while creating user")
    }

    // send response
    // what is apiResponse ? - ApiResponse is a class that is used to standardize the response format.
    // why use ApiResponse ? - to have a consistent response format for all the APIs.
    // how to use ApiResponse ? - create an instance of ApiResponse class and pass the message, statusCode and data.
    // then send the instance as json response.
    // what is status code ? - status code is a number that indicates the status of the response.
    // 200 means success, 400 means bad request, 401 means unauthorized, 403 means forbidden, 404 means not found, 500 means internal server error.
    // we use 201 for resource creation success.
    // what is data ? - data is the actual data that we want to send in the response.
    // it can be an object, array, string, number, boolean or null.
    // in this case, we are sending the createdUser object as data.
    return res.status(201).json((new ApiResponse(200,"User created successfully",createdUser))
    )

})
export {registerUser}