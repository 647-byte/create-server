import bcrypt from 'bcrypt';
import { model, Schema } from "mongoose";
const booksInBorrowSchema = new Schema({
    id: String,
    name: String,
})
const userSchema = new Schema(
    {
        userName: { type: String, unique: true },
        email: { type: String, unique: true, lowercase: true, trim: true },
        phone: String,
        password: String,
        date: { type: Date, default: Date.now },
        booksInBorrow: [booksInBorrowSchema],
    },
    {
        toJSON: {
            transform: (doc, ret) => {
                ret.id = ret._id;
                delete ret.password;
                delete ret.__v;
                delete ret._id;
                return ret;
            }
        }
    }
)
userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
        this.password = await bcrypt.hash(this.password, 12);
})
userSchema.statics.checkPassword = async function (enterPassword, hashingPassword) {
    return await bcrypt.compare(enterPassword, hashingPassword);
}
const User = model('user', userSchema);
export default User;