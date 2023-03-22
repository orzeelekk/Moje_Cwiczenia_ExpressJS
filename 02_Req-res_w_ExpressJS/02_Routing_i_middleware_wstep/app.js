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
const saveBooks = async (data) => {
    await fs.promises.writeFile(
        path.resolve('./data/books.json'),
        JSON.stringify(data),
    )
};
app.use(express.json())
// app.use(express.urlencoded({ extended: true }));

app.post('/books/:isbn', async function(req, res, next) {
    try {
        const books = await getBooks();
        const [book] = books.filter((book) => book.isbn === req.params.isbn);
        if (book) {
            const err = new Error('Book is already on the list!');
            res.status(409);
            next(err);
        } else {
            books.push(req.body);
            await fs.promises.writeFile('./data/books.json', JSON.stringify(books));
            res.json(await getBooks());
        }
    } catch (err) {
        next(err);
    }
});
app.put('/books/:isbn',async function(req,res,next) {
    try {
        const books = await getBooks()
        const bookIndex = books.findIndex((book) => book.isbn === req.params.isbn);

        if (booksIndex === -1) {
            const err = new Errror('Books is already on the list Mr')
            res.status(409)
            next(err)
        } else {
            const updatedBook = { ...books[bookIndex], ...req.body};
            const updatedBooks = [
                ...books.slice(0,bookIndex),
                updatedBook,
                ...books.slice(bookIndex,booksIndex + 1),
            ];
            await fs.promises.writeFile(
                './data/books.json',
                JSON.stringify(updatedBooks)
            );
            res.json(await getBooks());
        }
    } catch (err) {
        console.log(err)
    }
})

app.listen(3000, () => {console.log('Listening on 3000')})
