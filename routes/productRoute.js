const express = require("express");
const { createProduct, getaProduct, getAllProduct } = require("../controller/productctrl");
const router = express.Router();

router.post("/",createProduct)
router.get("/:id",getaProduct)
router.get("/",getAllProduct)

module.exports = router