import express from 'express'
import fs from "fs";
import path from "path";

const app = express()

const getBooks = async () => {
    return JSON.parse(
        await fs.promises.readFile(path.resolve('./data/books.json')),
    );
};

app.get('/books',async(req,res,next) => {
    try {
        const books = await getBooks()
        res.json(books)
    } catch (err) {
        res.status(500);
        next(err)
    }
});
app.get('/books/:isbn', async(req,res,next) => {
    try {
        const books = await getBooks()
        const [book] = books.filter((book) => book.isbn === req.params.isbn);

        if (!book) {
            const err = new Error ('No book found!')
            res.status(409)
            next(err)
        } else {
            res.json(book)
        }
    } catch (err) {
        next(err)
    }
});
app.use((err,res,next) => {
    const error = { message: err.message };
    res.json(error)
})

app.listen(3000, () => {console.log('Listening on 3000')})
