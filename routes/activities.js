const express = require("express");
const ActivityController = require("../controllers/ActivitiesController");
const { authentication, isAuthor } = require("../middlewares/authentication");
const router = express.Router();

const upload = require('../middlewares/multer');

router.post("/createActivity", authentication,upload.single('image'), ActivityController.createActivity)
router.put("/updateActivity/:_id", authentication,isAuthor, ActivityController.updateActivity)
router.get("/getAllActivities", ActivityController.getAllActivities)
router.delete("/deleteActivity/:_id", authentication, isAuthor, ActivityController.deleteActivity)
router.put("/markAsCompleted/:_id", authentication, isAuthor, ActivityController.markAsCompleted)

module.exports = router;