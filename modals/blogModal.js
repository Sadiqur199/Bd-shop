const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    numViews:{
        type:Number,
        default: 0,
    },
    isLiked:{
        type:Boolean,
        default:false,
    },
    isDisLiked:{
      type:Boolean,
      default:false,
    },
    likes:[
      {
      type:mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
    dislikes:[
      {
      type:mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  image:{
    type:String,
    default:"https://img.freepik.com/premium-photo/how-start-blog-blogging-beginners-ways-monetize-your-blog-blog-word-table-with-laptop_72482-5630.jpg",
  },
  author:{
    type:String,
    default:"Admin",
  }
},{
  toJSON: {
    virtuals:true,
  },
  toObject:{
    virtuals:true,
  },
  timestamps:true,
});

//Export the model
module.exports = mongoose.model('Blog', blogSchema);