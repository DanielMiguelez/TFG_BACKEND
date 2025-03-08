const User = require("../models/User")
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
    }
    
}

module.exports = UserController;