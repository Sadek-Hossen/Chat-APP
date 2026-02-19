import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "https://chat-app-9110.onrender.com",
        methods: ['GET', 'POST'],
        credentials: true
    }
});

// real time message code
const users = {};

export const getReceiverSocketId = (receiverId) => {
    return users[receiverId];
};

io.on('connection', (socket) => {
    //console.log('User connected', socket.id);
    
    const userId = socket.handshake.query.userId;
    
    if (userId) {
        users[userId] = socket.id;
        console.log("users from socket :", users);
    }
    
    //
    io.emit('getOnlineUsers', Object.keys(users));

    socket.on('disconnect', () => {
        console.log("User disconnect", socket.id);
        delete users[userId];
        io.emit('getOnlineUsers', Object.keys(users));
    });
});

export { app, io, server };