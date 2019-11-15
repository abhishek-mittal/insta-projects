const fetch = require('node-fetch');
fetch.Promise = Promise;

async function makePayment(req, res, next) {
    try {
        const card_token = req.body.card_token;
        const body = {
            source: {
                type: 'token',
                token: card_token,
                amount: 24.99,
                currency: 'INR',
                ref: 'ORD-1232'
            }
        }
        const checkoutResponse = await fetch('https://api.sandbox.checkout.com/payments', {
            method: 'post',
            body:    JSON.stringify(body),
            headers: { 'Content-Type': 'application/json', 'Authorization': 'sk_test_830c86ba-3e75-4179-ab6c-170a603725ff' },
        });
        console.log(card_token, checkoutResponse);
        res.json({
            success: true,
            data: checkoutResponse
        })
    } catch (error) {
        console.log(error)
                res.json({
                    success: true
                })
    }

}

module.exports = {
    makePayment
}