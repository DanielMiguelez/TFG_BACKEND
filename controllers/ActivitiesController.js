const Activity = require ("../models/Activity")
const User = require("../models/User")

const ActivityController = {

    async createActivity(req, res) {
        try {
          const { title, description, status, date, location, participantIds = [] } = req.body;
      
          const image = req.file ? `/uploads/${req.file.filename}` : null;
      
          const activity = await Activity.create({
            title,    
            description,
            status: status || "open",
            userId: req.user._id,
            participantIds: [req.user._id, ...participantIds],
            date: date || Date.now(),
            location,
            image,
          });
      
          await User.findByIdAndUpdate(req.user._id, {
            $push: { activitiesIds: activity._id },
          });
      
          console.log("Actividad creada:", activity);
          res.status(201).send({ msg: `${req.user.name} ha creado la actividad!`, activity });
      
        } catch (error) {
          console.error(error);
          res.status(500).send({
            msg: "Not possible to create the activity, yet...",
            error,
          });
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
            console.error(error);
            res.status(500).send({ msg: "Not possible to update the activity, yet...", error });
        }
    },

    async getAllActivities (req, res){
        try {
            const activities = await Activity.find()
             if(!activities){
                return res.status(400).send({msg:"There are no activities for now"})
             }
             return res.status(200).send({msg:"Your activities", activities})
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Not possible to get them, yet...", error });
        }
    },

    async deleteActivity (req, res){
        try {
            const activity = await Activity.findByIdAndDelete(req.params._id)

            if(!activity){
                return res.status(200).send({msg:"The activity does not exist"})
            }

            res.send({msg:"Activity deleted", activity})

        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Couldn't delete", error });
        }
    },

    async markAsCompleted (req, res){
        try {
            const activity = await Activity.findById(req.params._id);

            if(!activity){
                return res.status(200).send({msg:"The activity does not exist"})
            }

            activity.completed = true;
            activity.status = 'closed';

            await activity.save()

            res.status(200).send({ msg: "Activity marked as completed", activity });


        } catch (error) {
            console.error(error);
            return res.status(500).send({ msg: "Could not mark the activity as completed", error });
        }
    }


}

module.exports = ActivityController;