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
module.exports={createUser,loginUserCtrl}