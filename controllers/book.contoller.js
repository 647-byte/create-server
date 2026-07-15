import books from '../db';
const getAllBooks=(req, res) => {
    const { search = "", page = 1, limit = 30 } = req.query;
    let result = books.filter(b => b.name.includes(search));
    const p = +page;
    const l = +limit;
    result = result.slice((p - 1) * l, (p - 1) * l + l);
    res.json(result);
}
const getSpecificBook=(req,res)=>{
    const code = parseInt(req.params.code);
    const found = books.find(b => b.code === code);
    if (!found) {
        res.statusCode = 404;
        res.send("the required book is not found");
    }
    else res.json(found);
}
const addBook=(req, res) => {
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
const deleteBook=(req, res) => {
    const code = parseInt(req.params.code);
    const found = books.find(b => b.code === code);
    if (!found) {
        res.statusCode = 404;
        return res.json({ error: "the book to delete was not found" });
    }
    books = books.filter(b => b.code !== code);
    res.status(200).json(books);
}
const updateBook=(req, res) => {
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
}
const borrwAndReturn=(req, res) => {
    const code = +req.params.code;
    const { codeUser } = req.body || {};
    const index = books.findIndex(b => b.code === code);
    if (index === -1) {
        return res.status(404).json({ error: "the code not found" });
    }
    if (codeUser) {
        if (books[index].borrow) {
            return res.status(400).json({ error: "the book is borrow" });
        }
        books[index].borrow = true;
        books[index].historyBorrow.push({ codeBook: code, codeUser: codeUser });
        return res.status(204).send();
    }
    books[index].borrow = false;
    return res.status(204).send();
}
export {getAllBooks,getSpecificBook,addBook,deleteBook,updateBook,borrwAndReturn};