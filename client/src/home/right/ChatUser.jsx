import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../stateManage/UseConversation";

function ChatUser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  if (!selectedConversation) return null;

  const isOnline =
    onlineUsers &&
    Array.isArray(onlineUsers) &&
    onlineUsers.includes(selectedConversation._id);

  return (
    <div className="flex mt-2 items-center gap-4 p-3 rounded-lg hover:bg-gray-800 transition cursor-pointer">
      
      {/* Dynamic avatar */}
      <div className={`avatar ${isOnline ? "avatar-online" : "avatar-offline"}`}>
        <div className="w-14 rounded-full">
          <img
            src={
              selectedConversation.image ||
              "https://img.daisyui.com/images/profile/demo/gordon@192.webp"
            }
            alt="user avatar"
          />
        </div>
      </div>

      <div>
        <h1 className="text-white font-semibold leading-tight">
          {selectedConversation.name}
        </h1>
        <p className="text-sm text-gray-400">
          {isOnline ? "Online" : "Offline"}
        </p>
      </div>
    </div>
  );
}

export default ChatUser;
