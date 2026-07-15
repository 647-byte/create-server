const express=require('express');
let books=require('./db');
const app=express();
app.use(express.json());
app.get('/books',(req,res)=>{
    res.json(books);
})
app.get('/books/:code',(req,res)=>{
    const code=parseInt(req.params.code);
    const found=books.find(b=>b.code===code);
    if(!found){
        res.statusCode=404;
        res.send("the required book is not found");
    }
    else res.json(found);
})
app.post('/books',(req,res)=>{
    const{code,name,category,price}=req.body;
    const newBook={
        code:code,
        name:name,
        category:category,
        price:price,
        borrow: false,
        historyBorrow: [],
    }
    books.push(newBook);
    res.statusCode=201;
    res.send("the book add successfully");
})
app.delete('/books/:code',(req,res)=>{
    const code =parseInt(req.params.code);
    const found = books.find(b => b.code === code);
    if(!found){
        res.statusCode=404;
        return res.send("the book to delete was not found");
    }
    books=books.filter(b=>b.code!==code);
    res.send(books);
})
app.listen(5000);