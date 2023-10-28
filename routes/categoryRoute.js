const express = require("express")
const { createCategory } = require("../controller/categoryCtrl")
const { authMiddleware, isAdmin } = require("../middleware/AuthMiddleware")
const router = express.Router()


router.post("/",authMiddleware,isAdmin, createCategory)

module.exports = router