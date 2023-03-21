import express from 'express';
import {router as books} from "./routers/books.js";
import morgan from 'morgan';

const app = express();
const port = 3000;

app.use('/books',books)
app.use(morgan('combined'));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
