const Blog = require('../modals/blogModal');
const User = require('../modals/UserModels')
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require('../utills/validateMongodbid');


const createBlog = asyncHandler(async (req,res)=>{

  try{
    const newBlog = await Blog.create(req.body);
    res.json(newBlog)
  }
  catch(error){
    throw new Error(error)
  }

});

const updateBlog = asyncHandler(async (req,res)=>{
   const {id} = req.params;
  try{
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body,{new:true});
    res.json(updatedBlog)

  }
  catch(error){
    throw new Error(error)
  }
});



module.exports = {createBlog,updateBlog}