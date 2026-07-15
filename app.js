const express = require('express');
let books = require('./db');
const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.send("hello to library");
})
app.get('/books', (req, res) => {
    res.json(books);
})
app.get('/books/:code', (req, res) => {
    const code = parseInt(req.params.code);
    const found = books.find(b => b.code === code);
    if (!found) {
        res.statusCode = 404;
        res.send("the required book is not found");
    }
    else res.json(found);
})
app.post('/books', (req, res) => {
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
})
app.delete('/books/:code', (req, res) => {
    const code = parseInt(req.params.code);
    const found = books.find(b => b.code === code);
    if (!found) {
        res.statusCode = 404;
        return res.json({ error: "the book to delete was not found" });
    }
    books = books.filter(b => b.code !== code);
    res.status(200).json(books);
})
app.put('/books/:code', (req, res) => {
    const { code } = req.params;
    const index = books.findIndex(b => b.code === +code);
    if (index === -1) {
        res.status(404).json({ error: "the code not found" });
    }
    else {
        books[index].name = req.body.name;
        books[index].category = req.body.category;
        books[index].price = req.body.price;
        res.status(200).json(books[index]);
    }
})
app.patch('/books/:code', (req, res) => {
    const code = +req.params.code;
    const { codeUser } = req.body;
    const index = books.findIndex(b => b.code === code);
    if (index === -1) {
        res.status(404).json({ error: "the code not found" });
    }
    else if (books[index].borrow) {
        res.status(400).json({ error: "the book is borrow" });
    }
    else {
        books[index].borrow = true;
        books[index].historyBorrow.push({ codeBook: code, codeUser: codeUser });
        res.status(204).send();
    }
})
app.patch('/book/:code', (req, res) => {
    const code = +req.params.code;
    const index = books.findIndex(b => b.code === code);
    if (index === -1) {
        res.status(404).json({ error: "the code not found" });
    }
    else {
        books[index].borrow = false;
        res.status(204).send();
    }
})
app.listen(5000);