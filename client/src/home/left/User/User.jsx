import React from "react";
import useConversation from "../../../stateManage/UseConversation.js";
import { useSocketContext } from "../../../context/SocketContext.jsx";

function User({ user }) {
  const { onlineUsers } = useSocketContext(); // onlineUser না, onlineUsers হবে
  
  // safety check - if user is undefined, don't render
  if (!user || !user._id) {
    console.log("Invalid user object:", user);
    return null;
  }

  // Check if onlineUsers exists and is an array before using includes
  const isOnline = onlineUsers && Array.isArray(onlineUsers) 
    ? onlineUsers.includes(user._id) 
    : false;

  const { name, _id: userId, image } = user;

  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === userId;

  const handleUserClick = () => {
    setSelectedConversation(user);
  };

  return (
    <div
      onClick={handleUserClick}
      className={`flex mt-2 items-center gap-4 p-3 rounded-lg cursor-pointer transition
        ${isSelected ? "bg-slate-600" : "hover:bg-gray-800"}`}
    >
      {/* Avatar with online status */}
      <div className="relative">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src={
              image ||
              "https://img.daisyui.com/images/profile/demo/gordon@192.webp"
            }
            alt={name || "User"}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://img.daisyui.com/images/profile/demo/gordon@192.webp";
            }}
          />
        </div>
        {/* Online status indicator */}
        {isOnline && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></span>
        )}
      </div>

      {/* User Info */}
      <div className="flex-1">
        <h1 className="text-white font-semibold">{name || "Unknown User"}</h1>
        <p className="text-sm text-gray-400">
          {isOnline ? "Online" : "Offline"}
        </p>
      </div>
    </div>
  );
}

export default User;