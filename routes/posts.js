const express = require("express")
const router = express.Router();

const PostController = require("../controllers/PostController")

router.post("/createPost", PostController.createPost)
router.get("/getAllPosts", PostController.getAllPosts)
router.get("/getPostById/:_id", PostController.getPostById)
router.get("/getPostByTitle/:title", PostController.getPostByTitle)
router.delete("/deletePostById/:_id", PostController.deletePostById)
router.put("/updatePostById/:_id", PostController.updatePostById)

module.exports = router;