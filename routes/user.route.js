import { Router } from "express";
import { generalLimiter, safeLimiter, integrityCheck } from "../middlewares/main.middlewares.js";
import { bookSchema, registerSchema, connsectSchema } from "../validators/joi.schemas.js";
const router = Router();
import { register, connect, getAllUsers } from '../controllers/user.controller.js';
router.post('/signup', safeLimiter, integrityCheck(registerSchema), register);
router.post('/login', safeLimiter, integrityCheck(connsectSchema), connect);
router.get('/', generalLimiter, getAllUsers);
export default router; 