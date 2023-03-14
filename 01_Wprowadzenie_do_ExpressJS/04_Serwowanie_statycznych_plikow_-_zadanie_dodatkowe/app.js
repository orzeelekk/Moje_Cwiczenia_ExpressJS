import express from 'express';
import path from 'path';
const app = express();
app.use(express.static('public'))
app.get('/sendFile',(req,res) => {
    res.sendFile(path.resolve('./public/index.html'))
})
app.get('/',(req,res) => {
    res.send('Hello World!')
})
app.listen(3000,() => {
    console.log('listening on 3000')
})