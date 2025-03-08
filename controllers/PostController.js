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
    }
}

module.exports = PostController;