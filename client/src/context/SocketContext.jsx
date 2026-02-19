import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import io from "socket.io-client";
import { useAuth } from "./AuthProvider.jsx";

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]); // initialize with empty array
    const { authUser } = useAuth();

    useEffect(() => {
        if (authUser) {
            const socketConnection = io("http://localhost:5001", {
                query: {
                    userId: authUser.user._id,
                },
            });
            
            setSocket(socketConnection);

            socketConnection.on("getOnlineUsers", (users) => {
                console.log("Online users received:", users);
                setOnlineUsers(users || []); // ensure it's always an array
            });

            return () => {
                socketConnection.close();
                setSocket(null);
            };
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
            setOnlineUsers([]); // reset online users when logged out
        }
    }, [authUser]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};