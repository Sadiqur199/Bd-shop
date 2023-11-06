const Brand = require("../modals/brandModal")
const asyncHandler = require("express-async-handler")
const validateMongoDbId = require('../utills/validateMongodbid');

const createBrand = asyncHandler(async(req,res) =>{
  try{
   const newBrand = await Brand.create(req.body);
   res.json(newBrand)
  }
  catch(error){
    throw new Error(error)
  }
})

const updateBrand = asyncHandler(async(req,res) =>{
  const {id} = req.params;
  validateMongoDbId(id)
  try{
   const updatedBrand = await Brand.findByIdAndUpdate(id, req.body , {new:true}) 
   res.json(updatedBrand)
  }
  catch(error){
    throw new Error(error)
  }
})

const deleteBrand = asyncHandler(async(req,res) =>{
  const {id} = req.params;
  validateMongoDbId(id)
  try{
   const deletedBrand = await Brand.findByIdAndDelete(id) 
   res.json(deletedBrand)
  }
  catch(error){
    throw new Error(error)
  }
})

const getBrand = asyncHandler(async(req,res) =>{
  const {id} = req.params;
  validateMongoDbId(id)
  try{
   const getABrand = await Brand.findById(id);
   res.json(getABrand)
  }
  catch(error){
    throw new Error(error)
  }
})

const getallBrand = asyncHandler(async(req,res) =>{

  try{
   const getAllBrand = await Brand.find();
   res.json(getAllBrand)
  }
  catch(error){
    throw new Error(error)
  }
})

module.exports = {createBrand,updateBrand,deleteBrand,getBrand,getallBrand}