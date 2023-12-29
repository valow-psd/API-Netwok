const express = require("express");
const {getUser, getUserById, isEnter, isExit, add_user,delete_user_by_id} = require("./controllers");

const router = express.Router()

router.get("/users",getUser)
router.get("/users/:_id",getUserById)

router.get("/enter",isEnter)
router.get("/exit",isExit)

router.post("/add_user",add_user)
router.delete("/delete_user_by_id/:_id",delete_user_by_id)


module.exports = router