import mongoose, { model } from "mongoose";
const messageSchema = new mongoose.Schema({
  senderId: {
     type: mongoose.Schema.Types.ObjectId, 
     ref: "User",
     required: true },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true },
        message:{
            type: String,
            required: true,
            maxlength: 1000,
            trim:true,
            validate:[
                {
                validator:(varlue)=>varlue.length >0,
                message:"Message cannot be empty"
            },
            {
                validator:(value)=>/^[\w\s.,!?]+$/.test(value),
                message:"Message contains invalid characters"

            }
            ]

        },
        createAt:{
            type: Date,
            default: Date.now

        }
},{timestamps:true});
const Message = model("Message",messageSchema);
export default Message;
