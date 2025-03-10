const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId;


const ActivitySchema = new mongoose.Schema({
    title: {type:String, required:true},
    description: {type:String, required:true},
    status : {type:String, enum: ['open', 'closed', 'in-progress'], default: 'open'},
    completed: {type:Boolean, default:false},

    userId: { 
        type: ObjectId, 
        ref: 'User', 
        required: true 
    },  

    participantIds: [{ 
        type: ObjectId, 
        ref: 'User' 
    }],  
    
    date: { type: Date, required: true },  
    location: { type: String, required: true },
    image: { type: String },
}, {timestamps:true})

const Activity = mongoose.model('Activity', ActivitySchema)

module.exports = Activity;