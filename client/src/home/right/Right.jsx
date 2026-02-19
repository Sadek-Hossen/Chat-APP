import React, { useEffect } from "react";
import ChatUser from "./ChatUser";
import Message from "./Message";
import Send from "./Input/Send";
import useConversation from "../../stateManage/UseConversation.js";
import { useAuth } from "../../context/AuthProvider.jsx";
import { MessageSquare } from "lucide-react";

function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();

  // cleanup on unmount
  useEffect(() => {
    return () => {
      setSelectedConversation(null);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen mt-4 w-[70%] bg-gray-700 text-white border-l border-gray-600">
      
      {/* EMPTY STATE */}
      {!selectedConversation && <NoChat />}

      {/* CHAT STATE */}
      {selectedConversation && (
        <>
          {/* Header */}
          <div className="shrink-0">
            <ChatUser />
            <hr className="border-gray-600" />
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-2">
            <Message />
          </div>

          {/* Input */}
          <div className="shrink-0 border-t border-gray-600">
            <Send />
          </div>
        </>
      )}
    </div>
  );
}

export default Right;





/* =======================
   EMPTY CHAT COMPONENT
======================= */

const NoChat = () => {
  const { authUser } = useAuth();
  //console.log("this auth :", authUser.user.name)

  return (
    <div className="flex flex-1 items-center justify-center bg-linear-to-br from-gray-800 via-gray-700 to-gray-900">
      <div className="text-center max-w-md px-6 py-10 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-blue-500/20 text-blue-400">
            <MessageSquare size={42} />
          </div>
        </div>
        
        <h1 className="text-2xl font-semibold tracking-wide">
        Welcome   {authUser.user.name}
        </h1>
        {/* Title */}
        <h1 className="text-2xl font-semibold tracking-wide">
          No Conversation Selected
        </h1>

        {/* Subtitle */}
        <p className="text-gray-300 mt-3 text-sm leading-relaxed">
          Choose a chat from the left panel and start a conversation.
        </p>

        {/* User */}
        {authUser?.name && (
          <p className="mt-6 text-sm text-gray-400">
            👋 Hello{" "}
            <span className="text-white font-medium">
              {authUser.user.name}
            </span>
            , ready to chat?
          </p>
        )}
      </div>
    </div>
  );
};
