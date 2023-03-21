import express from 'express'
import {getBooks,saveBooks} from "../utils/utils.js";
import bodyParser from "body-parser";
import cors from "cors"

export const router = express.Router();

router.get('/',async(req,res,next) => {
    try {
        const books = await getBooks();
        res.json(books)
    } catch (err) {
        res.status(500);
        next(err)
    }
});
//bledy dla routera
router.use((err,res,next) => {
    const error = { status:res.statusCode, error: err.message };
    res.send(error)
})

//tworzymy aplikacje json parser
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extented: false })

router.param('id',async (req,res,next,id) => {
    try {
        const books = await getBooks();

        const book = books.find((book) => book.id === id);
        const index = books.indexOf(book)

        if (book && ['PUT','DELETE'].includes(req.method)) {
            req.index = index
            req.book = book
            next()
        } else if (!book && ['PUT','DELETE'].includes(req.method)) {
            res.status(409)
            throw new Error('Book doesnt exist!')
        } else if (book && 'POST' === req.method) {
            res.status(409)
            throw new Error('Book already exist!')
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }
})

router.put('/:id',urlencodedParser,async (req,res,next) => {
    try {
        const books = await getBooks()
        const book = {...req.book, ...req.body}
        const newBooks = [
            ...books.slice(0,req.index),
            book,
            ...books.slice(req.index + 1),
        ];
        saveBooks(newBooks)
        res.json(newBooks)
    } catch (err) {
        res.status(409)
        next(err)
    }
});

router.post('/:id',jsonParser,async (req,res,next) => {
    try {
        const books = await getBooks()
        const newBooks = [...books]
        newBooks.push(req.body)
        saveBooks(newBooks)
        res.json(newBooks)
    } catch (err) {
        res.status(409)
        next(err)
    }
})

router.delete('/id:',async (req,res,next) => {
    try {
        const books = await getBooks()
        const newBooks = [
            ...books.slice(0,req.index),
            ...books.slice(req.index + 1),
        ];
        saveBooks(newBooks)
        res.json(newBooks)
    } catch (err) {
        res.status(409)
        next(err)
    }
})
const corsOptions = {
    origin: 'http://localhost:3001',
    methods: 'GET, PUT, POST, DELETE',
    credentials: true,
}
router.use(cors(corsOptions))

router.use('/', (req, res, next) => {
    console.log(req.cookies)
    res.cookie('role','admin', {
        sameSite: 'None'
    })
    if (
        req.cookies.role !== 'admin' && ['PUT','DELETE','POST'].includes(req.method)
    ) {
        res.status(403)
        next(new Error('Not an admin here!'))
    } else {
        next()
    }

})