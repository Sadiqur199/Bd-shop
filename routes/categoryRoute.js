const express = require("express")
const { createCategory } = require("../controller/categoryCtrl")
const router = express.Router()


router.post("/",createCategory)

module.exports = router