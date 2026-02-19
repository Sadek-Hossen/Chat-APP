import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './router/user.router.js';
import messageRouter from './router/message.router.js';
import cookieParser from 'cookie-parser';
import { app, server } from './socketIO/server.js';
import path from 'path';

dotenv.config();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());

// mongodb connection
const URI = process.env.MONGO_URI;
try {
    await mongoose.connect(URI);
    console.log('mongodb connected successfully');
} catch (error) {
    console.log('mongodb connection error:', error);
}

// routers
app.use('/api/user', userRouter);
app.use('/api/message', messageRouter);

// production code here=========================================================

if (process.env.NODE_ENV === "production") {
    const dirPath = path.resolve();

    app.use(express.static(path.join(dirPath, "client/dist")));

    // Express 5 safe fallback
    app.use((req, res) => {
        res.sendFile(
            path.join(dirPath, "client/dist", "index.html")
        );
    });
}
// production code end here=========================================================



server.listen(port, () => {
    console.log(`server running from ${port}`);
});