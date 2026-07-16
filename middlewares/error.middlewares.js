const errorHandler = (err, req, res, next) => {
    const { status = 500, type = "server error" } = err;
    const errorForClient = {
        message: err.message,
        type: type,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    }
    res.status(status).json({ error: errorForClient });
}
const notFoundURLHandler=(req,res,next)=>{
    res.status(404).json({error:"the page not found"});
}
export {errorHandler,notFoundURLHandler}