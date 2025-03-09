const express = require("express")
const router = express.Router();

// Middlewares para autenticar usuarios.

const { authentication, isAdmin } = require("../middlewares/authentication");

const PostController = require("../controllers/PostController");

router.post("/createPost", authentication, PostController.createPost)
router.get("/getAllPosts", PostController.getAllPosts)
router.get("/getPostById/:_id", PostController.getPostById)
router.get("/getPostByTitle/:title", PostController.getPostByTitle)
router.delete("/deletePostById/:_id", authentication, isAdmin, PostController.deletePostById)
router.put("/updatePostById/:_id", authentication, PostController.updatePostById)
router.put("/insertComment/:_id", authentication, PostController.insertComment)
router.put("/like/:_id", authentication, PostController.likePost)

module.exports = router;