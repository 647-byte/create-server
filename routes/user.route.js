import { Router } from "express";
import { generalLimiter,safeLimiter } from "../middlewares/mainMiddlewares.js";
const router =Router();
import {register,connect,getAllUsers} from '../controllers/user.controller.js';
router.post('/signup',safeLimiter,register);
router.post('/login',safeLimiter,connect);
router.get('/',generalLimiter,getAllUsers);
export default router; 