import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()// this is a method by which all the properties are transfered to app.

// req.params :- data from url
// req.body :- data in form of forms/json.

// this .use() method is used for middlewares and configurations.
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))


app.use(express.json({limit:"16kb"}))// this is used to parse the incoming json data.
app.use(express.urlencoded({extended:true}))// this is used to parse the incoming form data.
app.use(express.static('public'))// this is used to serve static files like images,css files.
app.use(cookieParser())// this is used to parse the cookies from the request.





export default {app}

