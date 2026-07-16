import books from '../db.js';
import users from '../db_users.js';
const getAllBooks = (req, res) => {
    const { search = "", page = 1, limit = 30 } = req.query;
    let result = books.filter(b => b.name.includes(search));
    const p = +page;
    const l = +limit;
    result = result.slice((p - 1) * l, (p - 1) * l + l);
    res.json(result);
}
const getSpecificBook = (req, res, next) => {
    try {
        const code = parseInt(req.params.code);
        const found = books.find(b => b.code === code);
        if (!found) {
            const error = new Error("book not found");
            error.status = 404;
            error.type = "client error";
            return next(error);
        }
        else res.json(found);
    } catch (err) {
        next(err);
    }
}
const addBook = (req, res) => {
    const { code, name, category, price } = req.body;
    const newBook = {
        code: code,
        name: name,
        category: category,
        price: price,
        borrow: false,
        historyBorrow: [],
    }
    books.push(newBook);
    res.statusCode = 201;
    res.json(books[books.length - 1]);
}
const deleteBook = (req, res, next) => {
    try {
        const code = parseInt(req.params.code);
        const index = books.findIndex(b => b.code === code);
        if (index === -1) {
            const error = new Error("book not found");
            error.status = 404;
            error.type = "client error";
            return next(error);
        }
        books.splice(index, 1);
        res.status(200).json(books);
    } catch (err) {
        next(err);
    }
}
const updateBook = (req, res, next) => {
    try {
        const { code } = req.params;
        const index = books.findIndex(b => b.code === +code);
        if (index === -1) {
            const error = new Error("book not found");
            error.status = 404;
            error.type = "client error";
            return next(error);
        }
        books[index].name = req.body.name || books[index].name;
        books[index].category = req.body.category || books[index].category;
        books[index].price = req.body.price || books[index].price;
        res.status(200).json(books[index]);
    } catch (err) {
        next(err);
    }
}
const borrwAndReturn = (req, res, next) => {
    try {
        const code = +req.params.code;
        const { codeUser } = req.body || {};
        const index = books.findIndex(b => b.code === code);
        if (index === -1) {
            const error = new Error("book not found");
            error.status = 404;
            error.type = "client error";
            return next(error);
        }
        if (codeUser) {
            if (books[index].borrow) {
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
            books[index].borrow = true;
            books[index].historyBorrow.push({ codeBook: code, codeUser: codeUser });
            users[indexUser].booksBorrow.push(code);
            return res.status(204).send();
        }
        const borrowUser = users.find(u => u.booksBorrow.includes(code));
        if (borrowUser) {
            borrowUser.booksBorrow = borrowUser.booksBorrow.filter(c => c !== code);
        }
        books[index].borrow = false;
        return res.status(204).send();
    } catch (err) {
        next(err);
    }
}
export { getAllBooks, getSpecificBook, addBook, deleteBook, updateBook, borrwAndReturn };