const mongoose = require("mongoose")
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema({

    title: { type: String, required: true },
    content: { type: String, required: true },
    completed: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
    image: String,

    reviews: [{
        userId: { type: ObjectId, ref: 'User' },
        comment: { type: String, required: true },
        date: { type: Date, default: Date.now }
    }],
    
    likes: [{ type: ObjectId, ref: 'User'}],
    userId: { type: ObjectId, ref: 'User', }
}, { timestamps: true });

// Middleware para asegurar que los likes sean únicos
PostSchema.pre('save', function(next) {
    this.likes = [...new Set(this.likes)]; // Elimina duplicados
    next();
});

const Post = mongoose.model('Post', PostSchema)
module.exports = Post;