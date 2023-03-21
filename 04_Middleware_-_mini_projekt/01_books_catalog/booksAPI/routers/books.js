import express from 'express'
import {getBooks,saveBooks} from "../utils/utils.js";

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