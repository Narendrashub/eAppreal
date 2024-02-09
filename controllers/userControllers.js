import expressAsyncHandler from "express-async-handler";
import User from "../models/User.js";
import { genToken } from "../utils/genTokens.js";

//@desc  Register user
//path   /api/v1/users/register
//@access public

export const registerUser=expressAsyncHandler(async (req,res,next)=>{
    {
        
        const {fullname,email,password}=req.body
        const existingUser=await User.findOne({email:email})
        if(existingUser){
            // return res.json({
            //     message:"user exists already please login"
            // })
            throw new Error('user exists already please login')
        }
        const user=await User.create({
            fullname,
            email,
            password
        })
        res.status(201).json({
            status:"success",
            message:"user registered",
            user
        })
    } 
})

export const loginUser=expressAsyncHandler(async (req,res,next)=>{
     {
        const {email,password}=req.body
        const existingUser=await User.findOne({email:email})
        if(!existingUser || (!(await existingUser.verifyPwd(password,existingUser.password)))){
            // return res.json({
            //     message:"username and password do not match"
            // })
            throw new Error("username and password do not match")
        }
  
         const token=await genToken(existingUser._id)
            
        res.status(201).json({
            status:"success",
            message:"user logged in",
            token,
            existingUser
        })
    }
})