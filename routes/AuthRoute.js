const express = require("express")
const { createUser, loginUserCtrl, getallUser, getaUser, deleteaUser, updatedUser, blockUser, unblockUser, handleRefreshToken } = require("../controller/UserCtrl")
const { authMiddleware, isAdmin } = require("../middleware/AuthMiddleware")

const router = express.Router()

router.post("/register",createUser)
router.post("/login",loginUserCtrl)
router.get("/all-users",getallUser)
router.get("/:id",authMiddleware,isAdmin,getaUser)
router.delete("/:id",deleteaUser)
router.put("/edit-user",authMiddleware,updatedUser)
router.put("/block-user/:id",authMiddleware,isAdmin,blockUser)
router.put("/unblock-user/:id",authMiddleware,isAdmin,unblockUser)
router.put("/refresh",handleRefreshToken)

module.exports=router