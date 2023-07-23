const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

let inputCalculation;


// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({ extended: true }))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here
app.post('/calc', (req, res) => {
    res.send('Made it to calc req body!')
    console.log('at calc req body', req.body, req.body)
    if (!req.body.num1 || !req.body.num2 || !req.body.operator) {
        // me trying to not update the data if an incomplete object is sent as a POST
    } else {
        inputCalculation = req.body
        console.log('inputCalculation is now:',
            inputCalculation);
        // res.sendStatus(201)
    }
})


// still getting used to get and post requests
// app.post('/cats', (req, res) => {
//     res.send('MEOW!! This is a POST request, not a GET request!')
// })

// app.get('/cats', (req, res) => {
//     res.send('MEOW!!')
// })
// app.get('/dogs', (req, res) => {
//     res.send('WOOF!!')
// })


app.listen(port, () => {
    console.log('Server is running on port:', port);
})