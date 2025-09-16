// 
// require('dotenv').config({path:'./.env'})

import dotenv from 'dotenv'
import app from "./app.js";
import connectDB from "./db/index.js";
// this is used to load the environment variables from the .env file.
// it is used to set the environment variables in process.env object.
dotenv.config({
    path:'./.env'
})
// HERE THE CONNECT DB ASYNCHRONOUS FUNCTION IS CALLED.. IT RETURNS A PROMISE
connectDB().then(()=>{
    app.listen(process.env.PORT||3000,"0.0.0.0",()=>{
        console.log(`SERVER IS RUNNING AT PORT: ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("MONGODB CONNECTION FAILED!",err)
})

















/*
import mongoose from 'mongoose'
import {DB_NAME} from './constants';
import express from 'express'

const app = express();

;(async ()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("ERROR: ",error)
            throw err
        })
        app.listen(process.env.PORT||3000,()=>{
            console.log(`App is running on Port: "${process.env.PORT}`)
        })
    }
    catch(error){
        console.log("ERROR: ",error)
        throw err
    }
})()

*/