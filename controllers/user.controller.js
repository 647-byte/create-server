import users from '../db_users.js';
const register = (req, res) => {
    const newUser = req.body;
    const found = users.find(u => u.userName === newUser.userName);
    if (found) {
        return res.status(400).json({ error: "the userName allready exist" });
    }
    const newCode = users.length > 0 ? Math.max(...users.map(u => u.code)) + 1 : 1;
    newUser.code = newCode;
    users.push(newUser);
    res.status(201).json(newUser);
}
const connect=(req,res)=>{
    const {userName,password}=req.body;
    const index=users.findIndex(u=>u.userName===userName);
    if (index===-1){
        return res.status(404).json({error:"the user name not found"});
    }
    if (users[index].password===password){
        return res.status(200).json(users[index]);
    }
    return res.status(403).json({error:"the user name or password are worng"});
}
const getAllUsers=(req,res)=>{
    res.status(200).json(users);
}
export {register,connect,getAllUsers};