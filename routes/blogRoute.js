const express = require("express");
const { authMiddleware, isAdmin } = require("../middleware/AuthMiddleware");
const { createBlog, updateBlog, getBlog, getAllBlogs } = require("../controller/blogCtrl");
const router = express.Router();

router.post('/',authMiddleware,isAdmin,createBlog)
router.put('/:id',authMiddleware,isAdmin,updateBlog)
router.get('/:id',getBlog)
router.get('/',getAllBlogs)

module.exports = router;