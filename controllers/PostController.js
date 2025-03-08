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

    async getPostByTitle (req, res){
        try {

            if(req.params.title.length > 35){
                return res.status(400).send("Search too long")
            }
            const title = new RegExp(req.params.title, "i");
            const posts = await Post.find({title})
            res.send({msg: "Posts by title", posts})
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"Could not find your posts", error})
        }
    },

    async deletePostById(req, res) {
        try {
            const post = await Post.findByIdAndDelete(req.params._id)

            if(!post){
                return res.status(400).send("your post does not exist")
            }

            res.status(200).send({msg:"post deleted", post})
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"Could not delete the post", error})
        }
    },

    async updatePostById (req, res) {
        try {
            const newPost = await Post.findByIdAndUpdate(req.params._id, req.body, {new:true})
            res.status(200).send({msg:"product updated", newPost})
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"Could not update the post", error})
        }
    },

    async insertComment(req, res){
        try {
            const post = await Post.findByIdAndUpdate(req.params._id, 
                {
                    $push:{
                        reviews:{
                            comment : req.body.comment, userId:req.user._id
                        }
                    }
                },
                {new:true}
            );
            res.status(201).send({msg:"comment sent", post})
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"Could not create a review", error})
        }
    }
}

module.exports = PostController;