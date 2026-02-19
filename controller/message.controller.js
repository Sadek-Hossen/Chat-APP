import Conversation from "../model/conversetion.model.js";
import Message from "../model/message.model.js";
import { getReceiverSocketId, io } from "../socketIO/server.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([newMessage.save(), conversation.save()]);
        
        // socket real time message - সঠিক বানান ব্যবহার করুন
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', newMessage);
        }
        
        res.status(201).json(newMessage); // শুধু newMessage পাঠান, পুরো অবজেক্ট না
    } catch (error) {
        console.log("send message error:", error);
        res.status(500).json({ message: "Error sending message" });
    }
};

export const getMessage = async (req, res) => {
    try {
        const { id: chatUser } = req.params;
        const senderId = req.user._id;
        
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, chatUser] },
        }).populate("messages");
        
        if (!conversation) {
            return res.status(200).json([]);
        }
        
        res.status(200).json(conversation.messages);
    } catch (error) {
        console.log("error = ", error);
        res.status(500).json({ message: "Error getting messages" });
    }
};