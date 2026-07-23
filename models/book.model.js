import { model, Schema } from "mongoose";
const historyBorrowSchema = new Schema({
    date: Date,
    idUser: String,
})
const authorSchema = new Schema({
    name: String,
    phone: String,
    email: String,
})
const bookSchema = new Schema({
    name: { type: String, unique: true, minlength: 2, maxlength: 20 },
    price: Number,
    category: [{ type: String, enum: ['מתח', 'ילדים', 'היסטוריה', 'עיון', 'Fantasy', 'קומיקס'] }],
    author: authorSchema,
    borrow: Boolean,
    historyBorrow: [historyBorrowSchema],
})
const Book = model('Book', bookSchema);
export default Book;