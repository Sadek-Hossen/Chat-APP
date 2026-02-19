import React, { useEffect, useRef } from "react";
import SingleMessage from "./SingleMessage";
import useGetMessage from "../../context/useGetMessage.js";
import Loading from "../../components/Loding.jsx";
import useConversation from "../../stateManage/UseConversation.js";
import useGetSocketMessage from "../../context/useGetSocket.jsx";

function Message() {
  const { loading, messages } = useGetMessage();
  const { selectedConversation } = useConversation();
  useGetSocketMessage(); // socket messages listen

  const lastMessageRef = useRef(null);

  // messages
  const messageList = Array.isArray(messages) ? messages : [];

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messageList]);

  if (!selectedConversation) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loading />
      </div>
    );
  }

  return (
    <div className="max-h-[calc(95vh-128px)] pb-10 overflow-y-auto">
      {loading && <Loading />}

      {!loading && messageList.length === 0 && (
        <p className="text-center mt-4">Say Hi 👋</p>
      )}

      {!loading &&
        messageList.map((message, index) => (
          <div
            key={message._id}
            ref={index === messageList.length - 1 ? lastMessageRef : null}
          >
            <SingleMessage message={message} />
          </div>
        ))}
    </div>
  );
}

export default Message;
