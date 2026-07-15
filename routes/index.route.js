import { Router } from "express";
import bookRouter from './book.route.js';
import userRouter from './user.route.js';
const router=Router();
router.use('/books',bookRouter);
router.use('/users',userRouter);
export default router;