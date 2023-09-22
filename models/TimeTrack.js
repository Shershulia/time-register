import mongoose, {model, Schema,models} from "mongoose";

const TimeTrackSchema = new Schema({
    desc:{
        type:String,
    },
    time:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    category: {
        type:String,
    },
    gitHub: [String]
},
    {timestamps:true});
export const TimeTrack = models?.TimeTrack || model('TimeTrack',TimeTrackSchema)