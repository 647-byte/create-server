import { model, Schema } from "mongoose";
const historyBorrowSchema = new Schema(
    {
        date: Date,
        idUser: String,
    },
    {
        _id: false
    }
)
const authorSchema = new Schema(
    {
        name: String,
        phone: String,
        email: String,
    },
    {
        _id: false
    }
)
const bookSchema = new Schema(
    {
        name: { type: String, unique: true, minlength: 2, maxlength: 20 },
        price: Number,
        category: [{ type: String, enum: ['מתח', 'ילדים', 'היסטוריה', 'עיון', 'Fantasy', 'קומיקס'] }],
        author: authorSchema,
        borrow: Boolean,
        historyBorrow: [historyBorrowSchema],
    },
    {
        toJSON: {
            transform: (doc, ret) => {
                ret.id = ret._id;
                delete ret.__v;
                delete ret._id;
                return ret;
            }
        }
    }
)
const Book = model('Book', bookSchema);
export default Book;