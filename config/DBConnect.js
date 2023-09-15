const {default: mongoose} = require("mongoose")

const DBConnect = () =>{
  try{
   const conn=mongoose.connect(process.env.mongodb_url);
   console.log('DB Connect')
  }

  catch (e){
   console.log("DB error")
  }
}

module.exports=DBConnect