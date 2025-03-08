const express = require("express");
const ActivityController = require("../controllers/ActivitiesController");
const { authentication, isAuthor } = require("../middlewares/authentication");
const router = express.Router();

router.post("/createActivity", authentication, ActivityController.createActivity)
router.put("/updateActivity/:_id", authentication,isAuthor, ActivityController.updateActivity)

module.exports = router;