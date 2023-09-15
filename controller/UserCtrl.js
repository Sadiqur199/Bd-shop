const User= require('../modals/UserModels')

const createUser = async(req , res) =>{
  const email = req.body.email;
  const findUser = await User.findOne(email)

  if(!findUser){
    //create a new user
    const newUser = User.create(req.body);
    res.json(newUser)

  }

  else{
    //user already exist
    res.json({
      mg:'User Already Exist',
      success:false
    })
  }
}

module.exports={createUser}