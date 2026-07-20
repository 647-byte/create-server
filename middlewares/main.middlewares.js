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
const middleAddDate = (req, res, next) => {
    req.currentDate = new Date();
    next();
}
const middlePrintDate = (req, res, next) => {
    console.log(req.currentDate);
    next();
}
const integrityCheck = (schema,property='body') => {
    return (req, res, next) => {
        const {error} = schema.validate(req[property], { abortEarly: false });
        if (error){
            const allError=new Error();
            allError.message=error.details.map(e=>e.message);
            allError.status=400;
            allError.type="validation error";
           return next(allError);
        }
        next();
    }
}
export { generalLimiter, safeLimiter, middleAddDate, middlePrintDate,integrityCheck };