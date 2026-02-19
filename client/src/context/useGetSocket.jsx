import { useEffect } from "react";
import { useSocketContext } from "./SocketContext.jsx";
import useConversation from "../stateManage/UseConversation.js";
import notificationSound from "../assets/noti.mp3";

const useGetSocketMessage = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (newMessage) => {
          
            if (selectedConversation?._id === newMessage.senderId || 
                selectedConversation?._id === newMessage.receiverId) {
                
                setMessages([...messages, newMessage]);
                
                
                const authUser = JSON.parse(localStorage.getItem("messenger"));
                if (newMessage.senderId !== authUser?.user?._id) {
                    const audio = new Audio(notificationSound);
                    audio.play().catch(err => console.log("Audio play failed:", err));
                }
            }
        };

        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("newMessage", handleNewMessage);
        };
    }, [socket, messages, setMessages, selectedConversation]);
};

export default useGetSocketMessage;
