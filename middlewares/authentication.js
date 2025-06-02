const User = require("../models/User")
const Activity = require("../models/Activity")
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");

require("dotenv").config();
const authentication = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).send({ msg: "No token provided" });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).send({ msg: "Token malformed" });
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ _id: payload._id, tokens: token });

        if (!user) {
            return res.status(401).send({ msg: "You have no permission" });
        }

        req.user = user;
        next();

    } catch (error) {
        console.error(error);
        return res.status(500).send({ error, message: 'There was a problem with the token' });
    }
}


const isAdmin = async (req, res, next) => {

    const admins = ['admin', 'superadmin'];

    if (!admins.includes(req.user.role)) {
        return res.status(403).send({
            message: `${req.user.name} you are not an admin.`
        });
    }
    next();
}

const isAuthor = async (req, res, next) =>{
   try {
    const post = await Post.findById(req.params._id)

    if (post.userId.toString() !== req.user._id.toString() && req.user.role !== "admin") {
            return res.status(403).send({ msg: "You are not the post creator or an admin, you cannot modify it." });
    }
    
    next();
   } catch (error) {
    console.error(error)
    return res.status(500).send({error, msg:"could not check the creator..."})
   }
}


module.exports = { authentication, isAdmin, isAuthor }