import {mongoose,Schema,model} from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// user schema
// direct encryption is not possible in mongoose schema so we use mongoose middleware called as hooks
// we can use pre and post hooks
// pre hook is used to perform some operations before saving the document
// post hook is used to perform some operations after saving the document
const userSchema = new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        fullname:{
            type:String,
            required:true,
            trim:true,
            index:true
        },
        avatar:{
            type:String,
            required:true,
        },
        coverImage:{
            type:String
        },
        watchHistory:[
            {
                type: Schema.Types.ObjectId,
                ref: 'Video'
            }
        ],
        password:{
            type:String,
            required:[true,'Password is required'],
        },
        refreshToken:{
            type:String
        }
    },
    {timestamps:true}
)

// here we are using pre hook to hash the password before saving the user
// we are using bcryptjs to hash the password
// we are using async await to handle the asynchronous code
userSchema.pre('save',async function(next){
    if (!this.isModified('password')) return next();// if password is not modified then return next
    this.password = await bcrypt.hash(this.password,10);// hash the password with salt round 10
    next();
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password);// compare the password with the hashed password
}

//access token is used to authenticate the user
// we are using access token to authenticate the user
// method to generate access token and refresh token
// we are using jwt to generate the token
// we are using async await to handle the asynchronous code 
userSchema.methods.generateAccessToken = function(){
    // sign method is used to generate the token
    jwt.sign({ // payload data to be sent in the token 
        _id:this._id,
        username:this.username,
        email:this.email,
        fullname:this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    })
}
// Refresh token is used to generate a new access token when the access token expires
// we are using refresh token to generate a new access token
//  method to generate refresh token
// we are using jwt to generate the token
// we are using async await to handle the asynchronous code
userSchema.methods.generateRefreshToken = function(){
    jwt.sign({
        _id:this._id
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    })
}

export const User = model('User',userSchema);




// jwt is a bearer token which is used to authenticate the user
// we are using jwt to generate the token
// we are using async await to handle the asynchronous code 