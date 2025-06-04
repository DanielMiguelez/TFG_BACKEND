const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");
const { authentication, isAdmin } = require("../middlewares/authentication");

router.post("/createUser", UserController.createUser)
router.post("/login", UserController.login)
router.delete("/logout", authentication, UserController.logout)
router.get("/getAllUsers", authentication, UserController.getAllUsers)
router.get("/getProfile/:_id", authentication, UserController.getProfile)
router.put("/joinActivity/:_id", authentication, UserController.joinActivity);
router.put("/leaveActivity/:_id", authentication, UserController.leaveActivity);
router.delete("/deleteUser/:_id", authentication, isAdmin, UserController.deleteUser)

module.exports = router;