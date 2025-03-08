const express = require("express")
const router = express.Router();

const PostController = require("../controllers/PostController")

router.post("/createPost", PostController.createPost)
router.get("/getAllPosts", PostController.getAllPosts)
router.get("/getPostById/:_id", PostController.getPostById)
router.get("/getPostByTitle/:title", PostController.getPostByTitle)

module.exports = router;