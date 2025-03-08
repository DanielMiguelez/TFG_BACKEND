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

            res.status(201).send({msg:"Activity created !", activity})
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Not possible to create the activity, yet...", error });
        }
    }
}

module.exports = ActivityController;