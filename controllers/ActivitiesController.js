const Activity = require ("../models/Activity")

const ActivityController = {

    async createActivity (req, res) {

        try {
            const activity = await Activity.create({
                title: req.body.title,
                description: req.body.description,
                status: 'open',
                userId: req.user._id,
                participantIds: req.body.participantIds || [],
                date: req.body.date,
                location: req.body.location,
                image: req.body.image,
            });

            res.status(201).send({msg: `${req.user.name}  has creado la actividad !`, activity})
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Not possible to create the activity, yet...", error });
        }
    },

    async updateActivity (req, res) {
        try {
            const activity = await Activity.findByIdAndUpdate(
                req.params._id,
                {
                    ...req.body, userId:req.user._id
                },
                {new:true}
            );
            res.status(200).send({msg: `${req.user.name} you updated your activity !`, activity})
        } catch (error) {
            
        }
    }
}

module.exports = ActivityController;