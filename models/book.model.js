import { model, Schema } from "mongoose";
const authorSchema=new Schema({
    name:String,
    phone:String,
    email:String,
})
const bookSchema = new Schema({
    name: String,
    price: Number,
    category: [String],
    author: authorSchema,
    borrow:Boolean,
    historyBorrow:[Object],
})
const Book = model('Book', bookSchema);
export default Book;