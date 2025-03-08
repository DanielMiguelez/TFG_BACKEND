const mongoose = require("mongoose")
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema({
    title : String,
    content : String,
    completed : Boolean,
    date : Date,
    image: String,
    comments:[{
        userId: {thpe:ObjectId, ref: 'User'},
        comment:String
    }],
    likes : [{type:ObjectId}]
}, {timestamps:true})

const Post = mongoose.model('Post', PostSchema)
module.exports = Post;