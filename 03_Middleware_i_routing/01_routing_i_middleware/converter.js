import express from 'express';

export const router = express.Router();

router.param('amount',(req,res,next,amount) => {
    if (isNaN(parseFloat(amount))) {
        next(new Error('Invalid amount'));
    } else {
        req.amount = parseFloat(amount);
        next();
    }
})
router.get('/:currency/:amount',(req,res,next) => {
    if (req.params.currency === 'USD') {
        res.send(`${req.amount * 4.39}`)
    } else {
        req.amount = parseFloat(amount);
        //prasowanie i polowanie na inna walute
        next('route')
    }
})
router.get('/:currency/:amount',(req,res,next) => {
    if (req.params.currency === 'EURO') {
        res.send(`${req.amount * 4.80}`)
    } else {
        next('route')
    }
})
router.get('/:currency/:amount',(req,res,next) => {
    if (req.params.currency === 'CHF') {
        res.send(`${req.amount * 5.00}`)
    } else {
        next('router');
    }
})
