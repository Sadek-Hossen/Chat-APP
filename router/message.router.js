import express from "express";
import { getMessage, sendMessage } from "../controller/message.controller.js";
import protect from "../medlewer/midlewer.js";
const router = express.Router();

router.post('/send/:id',protect,sendMessage);
router.get('/get/:id',protect,getMessage);



export default router;