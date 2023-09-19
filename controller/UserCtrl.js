const { generateToken } = require('../config/jwtToken');
const User= require('../modals/UserModels')
const asyncHandler = require('express-async-handler')


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

const loginUserCtrl = asyncHandler(async (req, res) =>{
  const {email , password} =req.body
  const findUser = await User.findOne({email});
  if(findUser && await findUser.isPasswordMatched(password)){
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

//Get A Single User
const deleteaUser = asyncHandler(async(req,res)=>{
  const {id} = req.params;
  try{
    const deleteaUser = await User.findById(id);
    res.json({
      deleteaUser,
    })
  }
  catch (error){
    throw new Error(error) 
  }
});


module.exports={createUser,loginUserCtrl, getallUser,getaUser,deleteaUser}