const mongoose = require('mongoose'); 
const bcrypt = require("bcrypt")

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
      type:String,
      required:true
  },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
});


userSchema.pre("save",async function(next){
    const salt = bcrypt.genSaltSync(saltRounds)
})

//Export the model
module.exports = mongoose.model('User', userSchema);