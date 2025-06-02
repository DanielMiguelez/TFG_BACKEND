const express = require("express")
const router = express.Router();

// Middlewares para autenticar usuarios.

const { authentication, isAdmin, isAuthor } = require("../middlewares/authentication");

const PostController = require("../controllers/PostController");

const upload = require('../middlewares/multer');

router.post("/createPost", authentication, upload.single('image'), PostController.createPost)
router.get("/getAllPosts", PostController.getAllPosts)
router.get("/getPostById/:_id", PostController.getPostById)
router.get("/getPostByTitle/:title", PostController.getPostByTitle)
router.delete("/deletePostById/:_id", authentication, isAdmin, PostController.deletePostById)
router.put("/updatePostById/:_id", authentication, isAuthor, PostController.updatePostById)
router.put("/insertComment/:_id", authentication, PostController.insertComment)
router.put("/like/:_id", authentication, PostController.likePost)
router.put("/unlike/:_id", authentication, PostController.unlikePost)

module.exports = router;