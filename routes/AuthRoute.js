const express = require("express")
const { createUser, loginUserCtrl, getallUser, getaUser, deleteaUser, updatedUser } = require("../controller/UserCtrl")
const router = express.Router()

router.post("/register",createUser)
router.post("/login",loginUserCtrl)
router.get("/all-users",getallUser)
router.get("/:id",getaUser)
router.delete("/:id",deleteaUser)
router.put("/:id",updatedUser)

module.exports=router