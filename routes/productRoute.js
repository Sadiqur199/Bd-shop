const express = require("express");
const { createProduct } = require("../controller/productctrl");
const router = express.Router();

router.post("/",createProduct)

module.exports = router