const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId;


const ActivitySchema = new mongoose.Schema({
    title: {type:String},
    description: {type:String},
    status : {type:String, enum: ['open', 'closed', 'in-progress'], default: 'open'},
    completed: {type:Boolean, default:false},

    userId: { 
        type: ObjectId, 
        ref: 'User'
    },  

    participantIds: [{ 
        type: ObjectId, 
        ref: 'User' 
    }],  
    
    date: { type: Date },  
    location: { type: String },
    image: { type: String },
}, {timestamps:true})

const Activity = mongoose.model('Activity', ActivitySchema)

module.exports = Activity;