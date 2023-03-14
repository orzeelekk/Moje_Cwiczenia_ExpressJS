import express from 'express';

const app = express();
const port = 3001;

app.use(express.static('books'));
app.use(express.static('node-modules'));

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
