const express = require("express")
const router = express.Router();

const PostController = require("../controllers/PostController")

router.post("/createPost", PostController.createPost)
router.get("/getAllPosts", PostController.getAllPosts)
router.get("/getPostById/:_id", PostController.getPostById)

module.exports = router;