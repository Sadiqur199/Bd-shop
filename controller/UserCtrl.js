const { generateToken } = require('../config/jwtToken');
const User= require('../modals/UserModels')
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utills/validateMongodbid');
const { generateRefreshToken } = require('../config/refreshToken');


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

})

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
})


module.exports={createUser,loginUserCtrl, getallUser,getaUser,deleteaUser,updatedUser,blockUser,unblockUser,handleRefreshToken}