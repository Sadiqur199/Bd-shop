const {default: mongoose} = require("mongoose")

const DBConnect = () =>{
  try{
   const conn=mongoose.connect('mongodb+srv://BD-Shop:xVudvgPSUrciW56W@cluster0.ab4114m.mongodb.net/');
   console.log('DB Connect')
  }

  catch (e){
   console.log("DB error")
  }
}

module.exports=DBConnect