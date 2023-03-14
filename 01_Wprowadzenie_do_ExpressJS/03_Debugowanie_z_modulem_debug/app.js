import express from 'express';
import debug from 'debug';

const app = express();

const debugMyApp = debug('dev');
const prodMyApp = debug('prod');

app.get('/',(req,res) => {
    debugMyApp(`Method: ${req.method}`)
    debugMyApp(`Headers: ${req.headers}`)
    prodMyApp('Endpoint uruchomiony')
    res.send('Hello World!')
})
app.listen(3000, () => {
    debugMyApp('Listening on 3000')
    console.log('Listening on 3000')
})
//DEBUG=* node app.js
//DEBUG=dev,prod node app.js