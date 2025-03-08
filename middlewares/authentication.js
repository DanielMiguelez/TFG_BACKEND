const User = require("../models/User")
const Activity = require("../models/Activity")
const jwt = require("jsonwebtoken")

require("dotenv").config();

const authentication = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const payload = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findOne({ _id: payload._id, tokens: token })

        if (!user) {
            res.status(401).send({ msg: "You have no permission" })
        }


        // IMPORTANTE  ! Asignamos el user que posee el token al req.user para poder 
        // ser accedido despues desde el activity, y lo relaciono con el user que creo la actividad.

        req.user = user;
        next();

    } catch (error) {
        console.error(error)
        return res.status(500).send({ error, message: 'There was a problem with the token' })
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
    const activity = await Activity.findById(req.params._id)
    if(activity.userId.toString() !== req.user._id.toString()){
        return res.status(400).send({msg:"You are not the activity creator, you cannot modify it."});
    }
    next();
   } catch (error) {
    console.error(error)
    return res.status(500).send({error, msg:"could not check the creator..."})
   }
}


module.exports = { authentication, isAdmin, isAuthor }