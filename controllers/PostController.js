const Post = require("../models/Post")
const User = require("../models/User")

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
                date: req.body.date || Date.now(),
                image: req.file ? req.file.filename : undefined
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


    async getAllPosts(req, res) {
        try {
            const posts = await Post.find()
            res.status(200).send({ msg: "Posts list", posts })
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Could not bring posts", error })
        }
    },

    async getPostById(req, res) {
        try {
            const post = await Post.findById(req.params._id)
            res.status(200).send({ msg: "Here is your post", post })
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Could not find your post", error })
        }
    },

    async getPostByTitle(req, res) {
        try {

            if (req.params.title.length > 35) {
                return res.status(400).send("Search too long")
            }
            const title = new RegExp(req.params.title, "i");
            const posts = await Post.find({ title })
            res.send(posts)
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Could not find your posts", error })
        }
    },

    async deletePostById(req, res) {
        try {
            const post = await Post.findByIdAndDelete(req.params._id)

            if (!post) {
                return res.status(400).send("your post does not exist")
            }

            res.status(200).send({ msg: "post deleted", id: req.params._id })
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Could not delete the post", error })
        }
    },

    async updatePostById(req, res) {
        try {
            const newPost = await Post.findByIdAndUpdate(req.params._id, req.body, { new: true })
            res.status(200).send({ msg: "product updated", newPost })
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Could not update the post", error })
        }
    },

    async insertComment(req, res) {
        try {
            // Verificar que existe el comentario
            if (!req.body.comment || req.body.comment.trim() === '') {
                return res.status(400).send({ msg: "Comment cannot be empty" });
            }

            // Verificar que existe el post
            const existingPost = await Post.findById(req.params._id);
            if (!existingPost) {
                return res.status(404).send({ msg: "Post not found" });
            }

            const post = await Post.findByIdAndUpdate(
                req.params._id,
                {
                    $push: {
                        reviews: {
                            comment: req.body.comment.trim(),
                            userId: req.user._id,
                            date: new Date()
                        }
                    }
                },
                { new: true }
            ).populate({
                path: 'reviews.userId',
                select: 'name email'
            });

            res.status(201).send({ msg: "Comment added successfully", post })
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Could not create a comment", error })
        }
    },

    async likePost(req, res) {
        try {
            // Verificamos si el usuario ya dio like
            const post = await Post.findOne({
                _id: req.params._id,
                likes: req.user._id
            });

            if (post) {
                return res.status(400).send({ msg: "You already liked this post" });
            }

            const updatedPost = await Post.findByIdAndUpdate(
                req.params._id,
                { $addToSet: { likes: req.user._id } },
                { new: true }
            );

            await User.findByIdAndUpdate(
                req.user._id,
                { $addToSet: { likedPosts: req.params._id } }, // También usamos $addToSet aquí
                { new: true }
            );

            res.status(200).send({ msg: "Post liked", post: updatedPost })
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Could not Like the post", error })
        }
    },

    async unlikePost(req, res) {
        try {
            const post = await Post.findByIdAndUpdate(
                req.params._id,
                { $pull: { likes: req.user._id } },
                { new: true }
            );

            await User.findByIdAndUpdate(
                req.user._id,
                { $pull: { likedPosts: req.params._id } },
                { new: true }
            );

            res.status(200).send({ msg: "Post unliked", post })
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Could not unlike the post", error })
        }
    }
}

module.exports = PostController;