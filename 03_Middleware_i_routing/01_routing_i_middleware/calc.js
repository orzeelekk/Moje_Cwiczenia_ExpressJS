//calc
import express from 'express';
export const router = express.Router();

const operations = ['add','subtract','divide','multiply','modulo'];

router.get('/:num1/:operation/:num2',(req,res,next) => {
    const num1 = parseInt(req.params.num1);
    const num2 = parseInt(req.params.num2);
    if (isNaN(num1) || isNaN(num2)) {
        res.status(409);
        next(new Error('Not a number!'));
    } else if (!operations.includes(req.params.operation)) {
        res.status(409)
        next(new Error('Unknown operation!'))
    } else {
        let result = 0;
        switch (req.params.operation) {
            case 'add':
                result = num1 + num2
                break
            case 'subtract':
                result = num1 - num2
                break
            case 'divide':
                result = num1 / num2
                break
            case 'multiply':
                result = num1 * num2
                break
            case 'modulo':
                result = num1 % num2
                break
        }
        //musi byc po tyldzie
        res.send(`${result}`)

    }
})
router.use((err,req,res,next) => {
    res.send(err.message);
})