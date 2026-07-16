import users from '../db_users.js';
const register = (req, res, next) => {
    try {
        const newUser = req.body;
        const found = users.find(u => u.userName === newUser.userName);
        if (found) {
            const error = new Error("userName is taken");
            error.status = 400;
            error.type = "client error";
            return next(error);
        }
        const newCode = users.length > 0 ? Math.max(...users.map(u => u.code)) + 1 : 1;
        newUser.code = newCode;
        users.push(newUser);
        res.status(201).json(newUser);
    } catch (err) {
        next(err);
    }
}
const connect = (req, res, next) => {
    try {
        const { userName, password } = req.body;
        const index = users.findIndex(u => u.userName === userName);
        if (index === -1) {
            const error = new Error("userName not found");
            error.status = 404;
            error.type = "client error";
            return next(error);
        }
        if (users[index].password === password) {
            return res.status(200).json(users[index]);
        }
        const error = new Error("wrong details");
        error.status = 403;
        error.type = "client error";
        return next(error);
    } catch (err) {o
        next(err);
    }
}
const getAllUsers = (req, res) => {
    res.status(200).json(users);
}
export { register, connect, getAllUsers };