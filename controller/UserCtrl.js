const { generateToken } = require('../config/jwtToken');
const User= require('../modals/UserModels')
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utills/validateMongodbid');
const { generateRefreshToken } = require('../config/refreshToken');
const jwt = require("jsonwebtoken");
const sendEmail = require('./emailctrl');
const crypto = require('crypto');



//create a user
const createUser = asyncHandler(async(req , res) =>{
  const email = req.body.email;
  const findUser = await User.findOne({ email: email})

  if(!findUser){
    //create a new user
    const newUser = await User.create(req.body);
    res.json(newUser)

  }

  else{
    //user already exist
    throw new Error("User Already Exist")
  }
})

//Login User

const loginUserCtrl = asyncHandler(async (req, res) =>{
  const {email , password} =req.body
  const findUser = await User.findOne({email});
  if(findUser && await findUser.isPasswordMatched(password)){

    const refreshToken = await generateRefreshToken(findUser?._id)
     const updateuser = await User.findByIdAndUpdate(findUser.id,{
      refreshToken:refreshToken,
    },{new:true});
    res.cookie('refreshToken',refreshToken,{
      httpOnly:true,
      maxAge:72*60*60*1000,
    })

   res.json({
    _id: findUser?._id,
    firstname: findUser?.firstname,
    lastname: findUser?.lastname,
    email: findUser?.email,
    mobile: findUser?.mobile,
    token: generateToken(findUser?._id)
   })
  }
  else{
    throw new Error("Invalid User")
  }
})


//handle refresh token
const handleRefreshToken = asyncHandler(async (req,res)=>{
const cookie = req.cookies;
if(!cookie?.refreshToken) throw new Error ('No Refresh Token In Cookies');
const refreshToken = cookie.refreshToken;
const user = await User.findOne({ refreshToken })
if(!user) throw new Error('No Refresh Token Present in db or not matched');
jwt.verify(refreshToken,process.env.JWT_Secret,(err,decode) =>{
  if(err || user.id !== decode.id){
    throw new Error("There is something wrong with refresh token")
  }
const accessToken = generateRefreshToken(user?._id)
res.json({accessToken})
})
})

//logout functionality
const logout = asyncHandler(async (req,res) =>{
const cookie = req.cookies
if (!cookie?.refreshToken) throw new Error("No Refresh Token In Cookies");
const refreshToken = cookie.refreshToken;
const user = await User.findOne({ refreshToken })
if(!user){
  res.clearCookie("refreshToken",{
    httpOnly:true,
    secure:true,
  });
  return res.sendStatus(204) //forbidden
}
const updateuser = await User.findByIdAndUpdate(user.id, {
  refreshToken: "",
}, { new: true });

res.clearCookie("refreshToken",{
  httpOnly:true,
  secure:true,
});
 res.sendStatus(204)
});


//Update User
const updatedUser = asyncHandler(async (req,res)=>{
  // console.log(req.user)
  const {_id} = req.user;
  validateMongoDbId(_id)
  try{
     const updatedUser =await User.findByIdAndUpdate(_id,{
      firstname: req?.body?.firstname,
      lastname: req?.body?.lastname,
      email: req?.body?.email,
      mobile: req?.body?.mobile,
      password: req?.body?.password
     },
     {
      new:true,
     });
     res.json(updatedUser)
  }
  catch(error){
    throw new Error(error)
  }
})


//Get All User
const getallUser = asyncHandler(async (req,res)=>{
 try{
  const getUser = await User.find();
  res.json(getUser)
 }
 catch(error){
  throw new Error(error) 
 }
})


//Get A Single User
const getaUser = asyncHandler(async(req,res)=>{
  const {id} = req.params;
  validateMongoDbId(id)
  try{
    const getaUser = await User.findById(id);
    res.json({
      getaUser,
    })
  }
  catch (error){
    throw new Error(error) 
  }
});

//Get delete Single User
const deleteaUser = asyncHandler(async(req,res)=>{
  const {id} = req.params;
  validateMongoDbId(id)
  try{
    const deleteaUser = await User.findByIdAndDelete(id);
    res.json({
      deleteaUser,
    })
  }
  catch (error){
    throw new Error(error) 
  }
});

const blockUser = asyncHandler(async (req, res) =>{
 const {id} = req.params;
 validateMongoDbId(id)
 
 try{
  const block = await User.findByIdAndUpdate(id,{
   isBlocked:true,
  },
  {
    new:true,
  })

  res.json({
    message:"User blocked"
  })

 }
 catch(error){
   throw new Error(error)
 }
})

const unblockUser = asyncHandler(async (req,res) =>{
  const {id} = req.params;
  validateMongoDbId(id)
  try{
   const unblock = await User.findByIdAndUpdate(id,{
    isBlocked:false,
   },
   {
     new:true,
   })

   res.json({
    message:"User unblocked"
  })

  }
  catch(error){
    throw new Error(error)
  }
});

const updatePassword = asyncHandler (async (req , res) =>{
  const { _id } = req.user;
  const {password} = req.body;
  validateMongoDbId(_id);
  const user = await User.findById(_id);
  if(password) {
    user.password = password;
    const updatedPassword = await user.save();
    res.json(updatedPassword)
  }
  else{
    res.json(user);
  }
})

const forgotPasswordToken = asyncHandler(async(req, res) =>{
const {email} = req.body;
const user = await User.findOne({email});
if (!user) throw new Error ("User not found with this email")

try{
const token = await user.createPasswordResetToken();
await user.save();
const resetURL = `Hi please follow this link to reset your password.This link valid till 10 minutes form now. <a href='http://localhost:5000/api/user/reset-password/${token}'>Click Here</a>`;
const data = {
  to:email,
  text:"Hey User",
  subject:"Forgot Password Link",
  htm:resetURL,
};
sendEmail(data);
res.json(token);
}
catch(error){
throw new Error(error)
}
})

const resetPassword = asyncHandler (async (req,res) =>{
  const {password} = req.body;
  const {token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passWordResetToken: hashedToken,
    passWordResetExpires:{$gt:Date.now()},
  });
  if(!user) throw new Error("Token Expired,Please Try Again");
  user.password = password;
  user.passWordResetToken = undefined;
  user.passWordResetExpires = undefined;
  await user.save();
  res.json(user)
}) ;



module.exports={createUser,loginUserCtrl, getallUser,getaUser,deleteaUser,updatedUser,blockUser,unblockUser,handleRefreshToken,logout,updatePassword,forgotPasswordToken,resetPassword}