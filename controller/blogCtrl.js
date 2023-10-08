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
   validateMongoDbId(id)
  try{
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body,{new:true});
    res.json(updatedBlog)

  }
  catch(error){
    throw new Error(error)
  }
});


const getBlog = asyncHandler(async (req,res)=>{
  const {id} = req.params;
  validateMongoDbId(id)
 try{
   const getBlog = await Blog.findById(id);
  const updateViews = await Blog.findByIdAndUpdate(id,{
    $inc:{ numViews: 1 }
   },
   {
    new:true
  });
   res.json(updateViews)
 }
 catch(error){
   throw new Error(error)
 }
});

const getAllBlogs = asyncHandler (async (req, res)=>{
  try{
    const getBlogs = await Blog.find()
    res.json(getBlogs)

  }
  catch(error){
    throw new Error(error)
  }
});

const deleteBlog = asyncHandler(async (req,res)=>{
  const {id} = req.params;
  validateMongoDbId(id)
 try{
   const deletedBlog = await Blog.findByIdAndDelete(id);
   res.json(deletedBlog)

 }
 catch(error){
   throw new Error(error)
 }
});


//Like Functionality
const likeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
validateMongoDbId(blogId)
  // Find the blog post by its ID
  const blog = await Blog.findById(blogId);
  const loginUserId = req?.user?._id;
  const isLiked = blog?.isLiked;

  // Check if the user has disliked the post
  const alreadyDisliked = blog.dislikes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );

  if (alreadyDisliked) {
    // Update the blog with dislikes removed and isDisliked set to false
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    );
    res.json(updatedBlog);
  } else if (isLiked) {
    // Update the blog with likes removed and isLiked set to false
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(updatedBlog);
  } else {
    // Update the blog with likes added and isLiked set to true
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      { new: true }
    );
    res.json(updatedBlog);
  }
});


//disLike Functionality
const disLikeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongoDbId(blogId);
  // Find the blog which you want to be liked
  const blog = await Blog.findById(blogId);
  // find the login user
  const loginUserId = req?.user?._id;
  // find if the user has liked the blog
  const isDisLiked = blog?.isDisLiked;
  // find if the user has disliked the blog
  const alreadyLiked = blog?.likes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );
  if (alreadyLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(blog);
  }
  if (isDisLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisLiked: false,
      },
      { new: true }
    );
    res.json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { dislikes: loginUserId },
        isDisLiked: true,
      },
      { new: true }
    );
    res.json(blog);
  }
});


module.exports = {createBlog,updateBlog,getBlog,getAllBlogs,deleteBlog,likeBlog,disLikeBlog}