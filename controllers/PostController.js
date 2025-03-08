const Post = require("../models/Post")

const PostController = {

    async createPost (req,res){
        try {
            const post = await Post.create({...req.body})
            res.status(201).send({msg:"Post created !", post})
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"Could not create the post", error})
        }
    },

    async getAllPosts (req, res){
        try {
            const posts = await Post.find()
            res.status(200).send({msg:"Posts list", posts})
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"Could not bring posts", error})
        }
    },

    async getPostById (req, res){
        try {
            const post = await Post.findById(req.params._id)
            res.status(200).send({msg:"Here is your post", post})
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"Could not find your post", error})
        }
    },

    async getPostByName (req, res){
        try {
            const name = new RegExp(req.params.name, "i");
            const posts = await Post.find({name})
            res.status(200).send({posts})
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"Could not find your posts", error})
        }
    }
}

module.exports = PostController;