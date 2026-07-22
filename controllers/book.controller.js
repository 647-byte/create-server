import { isValidObjectId } from 'mongoose';
import users from '../db_users.js';
import Book from '../models/book.model.js';
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
        const b = await Book.findByIdAndUpdate(id, req.body, { new: true });
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
        const { codeUser } = req.body || {};
        const b = await Book.findById(id);
        if (!b) {
            const error = new Error("book not found");
            error.status = 404;
            error.type = "client error";
            return next(error);
        }
        if (codeUser) {
            if (b.borrow) {
                const error = new Error("book is borrow");
                error.status = 400;
                error.type = "client error";
                return next(error);
            }
            const indexUser = users.findIndex(u => u.code === codeUser);
            if (indexUser === -1) {
                const error = new Error("user not found");
                error.status = 404;
                error.type = "client error";
                return next(error);
            }
            b.borrow = true;
            b.historyBorrow.push({ idBook: id, codeUser: codeUser });
            await b.save();
            users[indexUser].booksBorrow.push(id);
            return res.status(204).send();
        }
        const borrowUser = users.find(u => u.booksBorrow.includes(id));
        if (borrowUser) {
            borrowUser.booksBorrow = borrowUser.booksBorrow.filter(c => c !== id);
        }
        b.borrow = false;
        await b.save();
        return res.status(204).send();
    } catch (err) {
        next(err);
    }
}
export { getAllBooks, getSpecificBook, addBook, deleteBook, updateBook, borrwAndReturn };