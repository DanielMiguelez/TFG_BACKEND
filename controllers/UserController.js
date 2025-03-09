const User = require("../models/User")
const Activity = require("../models/Activity")
const Post = require("../models/Post")

const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

require("dotenv").config();

const UserController = {
    
    async createUser(req,res){
        try {
            const passwordHashed = await bcrypt.hash(req.body.password, 10)
            const user = await User.create({...req.body, password:passwordHashed})

            res.status(201).send({msg:"user created", user})
        } catch (error) {
            console.log("Not able to create user:", error);
        }
    },

    async getAllUsers (req, res){
        try {
            const users = await User.find()
                .populate({
                    path: "activitiesIds",
                })
                .populate({
                    path:"postsIds"
                })
                .limit(req.query.limit)
                .skip((req.query.page -1)* req.query.limit)

            if(users.length === 0){
                return res.status(400).send({msg:"there are no users"})
            }

            res.status(200).send({msg:"users obtained", users})
        } catch (error) {
            res.status(500).send({ msg: "There was an error retrieving the users", error });
        }
    },

    async login (req, res){
        try {
            const user = await User.findOne({
                email: req.body.email
            })
            if(!user){
                return res.status(400).send("user or password not correct")
            }

            const isMatch = await bcrypt.compare(req.body.password, user.password)

            if (!isMatch) {
                return res.status(400).send("User or password not correct")
            }

            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

            if (user.tokens.length > 4) user.tokens.shift();
            user.tokens.push(token);

            await user.save();

            res.send({ msg: "Welcome " + user.name + "  " , token, user })

        } catch (error) {
            console.error(error);
            return res.status(500).send({ msg: "Could not log in" });
        }
    },

    async logout (req,res){
        try {
            await User.findByIdAndUpdate(req.user._id, {
                $pull : {tokens:req.headers.authorization}
            })
            res.status(200).send({msg:"Logout successful"})
        } catch (error) {
            console.error(error);
            return res.status(500).send({ msg: "Could not log out" });
        }
    },

    async deleteUser (req, res){
        try {

            await Activity.deleteMany({userId: req.user._id})

            await Post.deleteMany({userId:req.user._id})

            await User.findByIdAndDelete(req.user._id);

            res.status(200).send({ msg: "User and their activities and posts have been deleted" });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ msg: "Could not delete" });
        }
    },

    async getProfile (req, res){
        try {
            const user = await User.findById(req.user._id)
                .populate("activitiesIds")
                .populate("postsIds")

            if(!user){
                return res.status.send({msg:"user not found"})
            }
            
            res.status(200).send({msg:"the user connected", user})
        } catch (error) {
            console.error(error);
            return res.status(500).send({ msg: "Could not delete" });
        }
    }
    
}

module.exports = UserController;