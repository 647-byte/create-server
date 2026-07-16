import { rateLimit } from 'express-rate-limit';
const generalLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 100,
    message: 'Too many requests, please try again later.',
})
const safeLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 10,
    message: 'Too many requests, please try again later.',
})
const middleAddDate=(req,res,next)=>{
    req.currentDate=new Date();
    next();
}
const middlePrintDate=(req,res,next)=>{
    console.log(req.currentDate);
    next();
}
export { generalLimiter, safeLimiter,middleAddDate,middlePrintDate };