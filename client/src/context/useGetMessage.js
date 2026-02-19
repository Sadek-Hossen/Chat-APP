import { useEffect, useState } from "react";
import useConversation from "../stateManage/UseConversation.js";
import axios from "axios";

function useGetMessage() {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            if (!selectedConversation?._id) return;

            setLoading(true);
            try {
                const response = await axios.get(
                    `/api/message/get/${selectedConversation._id}`,
                    { withCredentials: true }
                );
                setMessages(response.data); // response.data সরাসরি messages array
            } catch (error) {
                console.log("error :", error);
            } finally {
                setLoading(false);
            }
        };

        getMessages();
    }, [selectedConversation, setMessages]);

    return { loading, messages };
}

export default useGetMessage;