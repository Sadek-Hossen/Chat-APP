import mongoose from "mongoose";
import User from '../model/model.js'
import Message from "./message.model.js";
import { model } from "mongoose";
const conversationSchema = new mongoose.Schema({
    participants:[
        { type: mongoose.Schema.Types.ObjectId,
         ref: User }
    ],
    messages:[
        { type: mongoose.Schema.Types.ObjectId,
         ref: Message,
        default:[]
        },
        
    ]
    
},{timestamps:true});
const Conversation = model("Conversation",conversationSchema);
export default Conversation;