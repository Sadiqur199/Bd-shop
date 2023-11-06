const express = require("express");
const { createProduct, getaProduct, getAllProduct, updateProduct, deleteProduct, addWishList} = require("../controller/productctrl");
const { isAdmin, authMiddleware } = require("../middleware/AuthMiddleware");
const router = express.Router();

router.post("/",authMiddleware,isAdmin,createProduct)
router.get("/:id",getaProduct)
router.put("/wishlist",authMiddleware,addWishList)
router.put("/:id",authMiddleware,isAdmin,updateProduct);
router.delete("/:id",authMiddleware,isAdmin,deleteProduct);
router.get("/",getAllProduct)

module.exports = router