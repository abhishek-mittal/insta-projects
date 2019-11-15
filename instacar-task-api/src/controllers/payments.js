const fetch = require('node-fetch');
fetch.Promise = Promise;

async function makePayment(req, res, next) {
    try {
        const card_token = req.body.card_token;
        const body = {
            source: {
                type: 'token',
                token: card_token
            },
            amount: parseInt(req.body.amount, 10) * 100,
            currency: 'INR',
            reference: 'ORDER-' + Math.floor(Math.random() * 1000000) + 1
        }
        const checkoutResponse = await fetch('https://api.sandbox.checkout.com/payments', {
            method: 'post',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'sk_test_830c86ba-3e75-4179-ab6c-170a603725ff'
            },
        });
        res.json({
            success: true,
            data: checkoutResponse
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false
        })
    }

}

module.exports = {
    makePayment
}