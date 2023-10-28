const express = require("express")
const { createCategory, updateCategory, deleteCategory } = require("../controller/categoryCtrl")
const { authMiddleware, isAdmin } = require("../middleware/AuthMiddleware")
const router = express.Router()


router.post("/",authMiddleware,isAdmin, createCategory)
router.put("/:id",authMiddleware,isAdmin, updateCategory)
router.delete("/:id",authMiddleware,isAdmin,deleteCategory)

module.exports = router