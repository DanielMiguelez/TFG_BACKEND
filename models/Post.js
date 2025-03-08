const mongoose = require("mongoose")
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    completed: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
    image: String,
    comments: [{
        userId: { type: ObjectId, ref: 'User' },
        comment: String
    }],
    likes: [{ type: ObjectId }],
    userId: { type: ObjectId, ref: 'User', required: true }
}, { timestamps: true })

const Post = mongoose.model('Post', PostSchema)
module.exports = Post;