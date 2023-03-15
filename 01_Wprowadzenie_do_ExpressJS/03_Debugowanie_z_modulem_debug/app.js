import express from 'express';
import debug from 'debug';

const app = express();

const debugMyApp = debug('dev');
const prodMyApp = debug('prod');

app.get('/',(req,res) => {
    debugMyApp(`Method: ${req.method}`)
    debugMyApp(`Headers: ${req.headers}`)
    debugMyApp('important data here')
    prodMyApp('Endpoint uruchomiony')
    //po DEBUG=* node app.js mamy dodatkowo konsole z dev/prodami dev important data here i prod endpoint..
    res.send('Hello World !')
    //wyswietlane tylko res.send w postman
})
app.listen(3000, () => {
    debugMyApp('Listening on 3000')
    console.log('Listening on 3000')
})
//DEBUG=* node app.js
//DEBUG=dev,prod node app.js -> tu mi juz nic nie wyswielta dodatkowego