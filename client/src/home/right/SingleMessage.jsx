import React from "react";

function SingleMessage({ message }) {
    const authUser = JSON.parse(localStorage.getItem("messenger")) || {};
    const itsMe = message.senderId === authUser?.user?._id;

    const chatAlign = itsMe ? "chat-end" : "chat-start";
    const bubbleStyle = itsMe ? "chat-bubble-primary" : "chat-bubble-info";
    
    const createdAt = new Date(message.createdAt);
    const formatDateTime = createdAt.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div className="p-2">
            <div className={`chat ${chatAlign}`}>
                <div className={`chat-bubble ${bubbleStyle}`}>
                    {message.message}
                </div>
                <div className="text-xs text-gray-400">{formatDateTime}</div>
            </div>
        </div>
    );
}

export default SingleMessage;