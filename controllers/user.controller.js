import User from '../models/user.model.js';
const register = async (req, res, next) => {
    try {
        const { userName, email, phone, password } = req.body;
        const newUser = new User({
            userName: userName,
            email: email,
            phone: phone,
            password: password,
            booksInBorrow: [],
        })
        const found = await User.findOne({ userName: userName });
        if (found) {
            const error = new Error("userName is taken");
            error.status = 400;
            error.type = "client error";
            return next(error);
        }
        const newU = await newUser.save();
        res.status(201).json(newU);
    } catch (err) {
        next(err);
    }
}
const connect = async (req, res, next) => {
    try {
        const { userName, password } = req.body;
        const found =await User.findOne({ userName: userName });
        if (!found) {
            const error = new Error("userName not found");
            error.status = 404;
            error.type = "client error";
            return next(error);
        }
        if (found.password !== password) {
            const error = new Error("wrong details");
            error.status = 403;
            error.type = "client error";
            return next(error);
        }
        return res.status(204).send();
    } catch (err) {
        next(err);
    }
}
const getAllUsers = async (req, res,next) => {
    try{
    res.status(200).json(await User.find());
    }
    catch(err){
        next(err);
    }
}
export { register, connect, getAllUsers };