const express = require("express");
const ActivityController = require("../controllers/ActivitiesController");
const { authentication } = require("../middlewares/authentication");
const router = express.Router();

router.post("/createActivity", authentication, ActivityController.createActivity)

module.exports = router;