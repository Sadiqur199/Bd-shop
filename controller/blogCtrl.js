const Blog = require('../modals/blogModal');
const User = require('../modals/UserModels')
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require('../utills/validateMongodbid');


const createBlog = asyncHandler(async (req,res)=>{

  try{
    const newBlog = await Blog.create(req.body);
    res.json({
      status:"Success",
      newBlog,
    })
  }
  catch(error){
    throw new Error(error)
  }

})

module.exports = {createBlog}