const jwt = require('jsonwebtoken');

const generateToken = (id) =>{
  return jwt.sign({id},process.env.JWT_Secret , {expiresIn: "2d"})
}

module.exports={generateToken}