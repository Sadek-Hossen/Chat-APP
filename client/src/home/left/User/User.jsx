import React from "react";
import { FaUser } from "react-icons/fa"; // human icon
import useConversation from "../../../stateManage/UseConversation.js";
import { useSocketContext } from "../../../context/SocketContext.jsx";

function User({ user }) {
  const { onlineUsers } = useSocketContext();

  if (!user || !user._id) return null;

  const isOnline = onlineUsers && Array.isArray(onlineUsers)
    ? onlineUsers.includes(user._id)
    : false;

  const { name, _id: userId, image } = user;
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === userId;

  const handleUserClick = () => setSelectedConversation(user);

  return (
    <div
      onClick={handleUserClick}
      className={`flex mt-2 items-center gap-4 p-3 rounded-lg cursor-pointer transition
        ${isSelected ? "bg-slate-600" : "hover:bg-gray-800"}`}
    >
      {/* Avatar with online status */}
      <div className="relative">
        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-700 text-white text-2xl overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={name || "User"}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = ""; // fail-safe, icon will show
              }}
            />
          ) : (
            <FaUser />
          )}
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
