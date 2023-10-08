const express = require("express");
const { authMiddleware, isAdmin } = require("../middleware/AuthMiddleware");
const { createBlog, updateBlog } = require("../controller/blogCtrl");
const router = express.Router();

router.post('/',authMiddleware,isAdmin,createBlog)
router.put('/:id',authMiddleware,isAdmin,updateBlog)

module.exports = router;