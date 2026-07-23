import { model, Schema } from "mongoose";
const booksInBorrowSchema = new Schema({
    id: String,
    name: String,
})
const userSchema = new Schema({
    userName: { type: String, unique: true },
    email: { type: String, unique: true, lowercase: true, trim: true },
    phone: String,
    password: String,
    date: { type: Date, default: Date.now },
    booksInBorrow: [booksInBorrowSchema],
})
const User = model('user', userSchema);
export default User;