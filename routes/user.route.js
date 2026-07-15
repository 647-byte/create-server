import { Router } from "express";
const router =Router();
import {register,connect,getAllUsers} from '../controllers/user.controller.js';
router.post('/signup',register);
router.post('/login',connect);
router.get('/',getAllUsers);
export default router; 