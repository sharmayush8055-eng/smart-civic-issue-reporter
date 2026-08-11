const mongoose=require("mongoose");

const issueModel=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        enum:['pothole', 'garbage', 'water', 'electricity','other'],
        default:'other'
    },
    image:{
        type:String,
    },
    location:{
        lat:{
            type:Number,
            required:true
        },
        lng: {
            type: Number,
            required: true
        },
        address: {
            type: String
        }
    },
    status:{
        type:String,
        enum:['pending','in-progress','resolved'],
        default:'pending'
    },
    ReportedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'USER'
    }
},
{timestamps:true}
);

module.exports=mongoose.model("issue",issueSchema);