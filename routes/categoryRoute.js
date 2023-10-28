const express = require("express")
const { createCategory, updateCategory, deleteCategory, getCategory } = require("../controller/categoryCtrl")
const { authMiddleware, isAdmin } = require("../middleware/AuthMiddleware")
const router = express.Router()


router.post("/",authMiddleware,isAdmin, createCategory)
router.put("/:id",authMiddleware,isAdmin, updateCategory)
router.delete("/:id",authMiddleware,isAdmin,deleteCategory)
router.get('/:id',getCategory)

module.exports = router