// whenever we try to communicate with database, problems might occur so,
// try-catch/ promise me wrap kro.
// database is in another continent.. use async await for this..

import mongoose from 'mongoose'
import {DB_NAME} from '../constants.js'
console.log("🔑 MONGODB_URI being used:", process.env.MONGODB_URI);

const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MONGODB Connected !! DB HOST :${connectionInstance.connection.host}`);
    }
    catch(error){
        console.log("MongoDB Connection ERROR: ",error)
        process.exit(1)
    }
    
}

export default connectDB