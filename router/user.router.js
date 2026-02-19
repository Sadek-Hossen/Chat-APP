import { Router } from "express";
import { createUser, getUser, getUserProfile, login, logout } from "../controller/user.controller.js";
import protect from "../medlewer/midlewer.js";
const router = Router();

router.post("/signUp", createUser);
router.post("/login", login);
router.post("/logout", logout)
router.get('/me', protect, getUser);
router.get('/allUsers', protect, getUserProfile)

export default router;
