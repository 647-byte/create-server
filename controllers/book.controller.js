import { isValidObjectId } from 'mongoose';
import Book from '../models/book.model.js';
import User from '../models/user.model.js';
const getAllBooks = async (req, res, next) => {
    try {
        let { search = "", page = 1, limit = 30 } = req.query;
        page = +page;
        limit = +limit;
        const result = await Book.find({ name: { $regex: search, $options: 'i' } }).skip((page - 1) * limit).limit(limit);
        res.json(result);
    } catch (err) {
        next(err);
    }
}
const getBooksByCategory = async (req, res, next) => {
    try {
        const { category } = req.params;
        const booksArr = await Book.find({ category: category })
        res.status(200).json(booksArr);
    } catch (err) {
        next(err);
    }
}
const getSpecificBook = async (req, res, next) => {
    const id = req.params.id;
    try {
        if (!isValidObjectId(id)) {
            const error = new Error("Invalid book ID format");
            error.status = 400;
            error.type = "client error";
            return next(error);
        }
        const found = await Book.findById(id);
        if (!found) {
            const error = new Error("book not found");
            error.status = 404;
            error.type = "client error";
            return next(error);
        }
        return res.json(found);
    } catch (err) {
        next(err);
    }
}
const addBook = async (req, res, next) => {
    try {
        const { name, category, price } = req.body;
        const newBook = new Book({
            name: name,
            category: category,
            price: price,
            borrow: false,
            historyBorrow: [],
        })
        const newB = await newBook.save();
        res.status(201).json(newB);
    }
    catch (err) {
        next(err);
    }
}
const deleteBook = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!isValidObjectId(id)) {
            const error = new Error("Invalid book ID format");
            error.status = 400;
            error.type = "client error";
            return next(error);
        }
        const book = await Book.findByIdAndDelete(id);
        if (!book) {
            const error = new Error("book not found");
            error.status = 404;
            error.type = "client error";
            return next(error);
        }
        res.status(200).json(book);
    } catch (err) {
        next(err);
    }
}
const updateBook = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!isValidObjectId(id)) {
            const error = new Error("Invalid book ID format");
            error.status = 400;
            error.type = "client error";
            return next(error);
        }
        const b = await Book.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!b) {
            const error = new Error("book not found");
            error.status = 404;
            error.type = "client error";
            return next(error);
        }
        res.status(200).json(b);
    } catch (err) {
        next(err);
    }
}
const borrwAndReturn = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!isValidObjectId(id)) {
            const error = new Error("Invalid book ID format");
            error.status = 400;
            error.type = "client error";
            return next(error);
        }
        const idUser = req.body?.id;
        const b = await Book.findById(id);
        if (!b) {
            const error = new Error("book not found");
            error.status = 404;
            error.type = "client error";
            return next(error);
        }
        if (idUser) {
            if (!isValidObjectId(idUser)) {
                const error = new Error("Invalid user ID format");
                error.status = 400;
                error.type = "client error";
                return next(error);
            }
            if (b.borrow) {
                const error = new Error("book is borrow");
                error.status = 400;
                error.type = "client error";
                return next(error);
            }
            const found = await User.findById(idUser);
            if (!found) {
                const error = new Error("user not found");
                error.status = 404;
                error.type = "client error";
                return next(error);
            }
            b.borrow = true;
            b.historyBorrow.push({ idUser: idUser, date: Date.now() });
            await b.save();
            found.booksInBorrow.push({ id: id, name: b.name });
            await found.save();
            return res.status(204).send();
        }
        const borrowUser = await User.findOne({ "booksInBorrow.id": id });
        if (borrowUser) {
            borrowUser.booksInBorrow = borrowUser.booksInBorrow.filter(c => c.id !== id);
            await borrowUser.save();
        }
        b.borrow = false;
        await b.save();
        return res.status(204).send();
    } catch (err) {
        next(err);
    }
}
export { getAllBooks, getSpecificBook, addBook, deleteBook, updateBook, borrwAndReturn, getBooksByCategory };