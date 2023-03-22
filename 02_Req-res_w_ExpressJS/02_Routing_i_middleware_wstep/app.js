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

app.listen(3000, () => {console.log('Listening on 3000')})
