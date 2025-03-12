const Post = require("../models/Post")
const User = require ("../models/User")

const PostController = {

    async createPost(req, res) {
    try {

        if (!req.user || !req.user._id) {
            return res.status(400).json({ msg: "User not authenticated" });
        }

        const newPost = {
            title: req.body.title,
            content: req.body.content,
            userId: req.user._id,  
            image: req.body.image,
            date: req.body.date
        };
        const post = await Post.create(newPost);


        await User.findByIdAndUpdate(
            req.user._id,
            { $push: { postsIds: post._id } }, 
            { new: true } 
        );

       
        res.status(201).json({ msg: "Post created!", post });
    } catch (error) {
        console.error("Error al crear post:", error);
        res.status(500).json({ msg: "Could not create the post", error });
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
            res.send(posts)
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

            res.status(200).send({msg:"post deleted", id:req.params._id})
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
    },

    async likePost (req, res){
        try {
            const post = await Post.findByIdAndUpdate(
                req.params._id, 
                {$push: {likes: req.user._id}},
                {new:true}
            );
             await User.findByIdAndUpdate(
                req.user._id,
                {$push:{likedPosts: req.params._id}},
                {new:true}
             )

             res.status(200).send({msg:"Post liked", post})
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"Could not Like the post", error})
        }
    }
}

module.exports = PostController;