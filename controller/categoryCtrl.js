const Category = require("../modals/categoryModal")
const asyncHandler = require("express-async-handler")
const validateMongoDbId = require('../utills/validateMongodbid');

const createCategory = asyncHandler(async(req,res) =>{
  try{
   const newCategory = await Category.create(req.body);
   res.json(newCategory)
  }
  catch(error){
    throw new Error(error)
  }
})

const updateCategory = asyncHandler(async(req,res) =>{
  try{
   const newCategory = await Category.create(req.body);
   res.json(newCategory)
  }
  catch(error){
    throw new Error(error)
  }
})


module.exports = {createCategory,updateCategory}