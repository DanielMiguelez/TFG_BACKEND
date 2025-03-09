const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");
const { authentication } = require("../middlewares/authentication");

router.post("/createUser", UserController.createUser)
router.post("/login", UserController.login)
router.delete("/logout", authentication, UserController.logout)
router.get("/getAllUsers", authentication, UserController.getAllUsers)
router.get("/getProfile/:_id", authentication, UserController.getProfile)
router.put("/joinActivity/:_id", authentication, UserController.joinActivity);


module.exports = router;