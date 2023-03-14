import express from 'express';

const app = express();
app.get('/test',(req,res) => {
    res.send('Hello world GET!')
})
app.post('/test',(req,res) => {
    res.send('Hello world POST!')
})
app.put('/test',(req,res) => {
    res.send('Hello world put!')
})
app.delete('/test',(req,res) => {
    res.send('Hello world DELETE!')
})
app.get('/book',(req,res) => {
    res.json({title: "LOTR"})
})
app.post('/book',(req,res) => {
    res.json({title: "Kubus Puchatek"})
})

app.listen(3000,() => {
    console.log('listening on 3000')
})
