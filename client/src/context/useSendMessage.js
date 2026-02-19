import { useState } from "react";
import useConversation from "../stateManage/UseConversation.js";
import axios from "axios";

function useSendMessage() {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessages = async (message) => {
        if (!selectedConversation?._id) return;

        setLoading(true);
        try {
            const response = await axios.post(
                `/api/message/send/${selectedConversation._id}`,
                { message },
                { withCredentials: true }
            );
            
            setMessages([...messages, response.data]); // response.data সরাসরি newMessage
        } catch (error) {
            console.log("send message error :", error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, sendMessages };
}

export default useSendMessage;