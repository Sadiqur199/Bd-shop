const mongoose = require('mongoose'); 
const bcrypt = require("bcrypt")
const crypto = require("crypto");
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
    role:{
        type: String,
        default:"user"
    },
    isBlocked:{
     type:Boolean,
     default:false,
    },
    cart:{
        type: Array,
        default: [],
    },
    address:[{ type:mongoose.Schema.Types.ObjectId, ref: "Address"}],
    wishlist:[{type:mongoose.Schema.Types.ObjectId, ref:"Product"}],
    refreshToken:{
        type:String,
    },
    passWordChangeAt: Date,
    passWordResetToken: String,
    passWordResetExpires: Date,
},
{
   timestamps:true ,
});


userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSaltSync(10)
    this.password = await bcrypt.hash(this.password , salt)
})

userSchema.methods.isPasswordMatched =async  function(enterPassword){
    return await bcrypt.compare(enterPassword , this.password)
}

userSchema.methods.createPasswordResetToken = async function(){
    const resettoken = crypto.randomBytes(32).toString("hex");
    this.passWordResetToken = crypto.createHash('sha256').update(resettoken).digest("hex");
    this.passWordResetExpires = Date.now()+ 30 * 60 * 1000; //10minutes
}

//Export the model
module.exports = mongoose.model('User', userSchema);