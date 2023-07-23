const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

let inputCalculation;
let calcHistoryArray = [];


function calculator(inputCalcObject) {
    let calcAnswer;
    // since POST seems to change number values into strings, I had to update them back to numbers
    inputCalcObject.num1 = Number(inputCalcObject.num1);
    inputCalcObject.num2 = Number(inputCalcObject.num2);
    // instead of bringing operators over as strings (don't know if they still work that way ??, I decided to have them be an object property and use a conditional)
    if (inputCalcObject.operator == 'addition') {
        calcAnswer = inputCalcObject.num1 + inputCalcObject.num2;
    } else if (inputCalcObject.operator == 'subtraction') {
        calcAnswer = inputCalcObject.num1 - inputCalcObject.num2;
    } else if (inputCalcObject.operator == 'multiplication') {
        calcAnswer = inputCalcObject.num1 * inputCalcObject.num2;
    } else if (inputCalcObject.operator == 'division') {
        calcAnswer = inputCalcObject.num1 / inputCalcObject.num2;
    }
    inputCalcObject.answer = calcAnswer;
    // console.log("inputCalcObject is now:", inputCalcObject);
    calcHistoryArray.unshift(inputCalcObject);
    // console.log("calcHistoryArray is now:", calcHistoryArray);
}


// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({ extended: true }))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here
app.post('/calc', (req, res) => {
    res.send('Made it to calc req body!')
    console.log('at calc req body', req.body)
    if (!req.body.num1 || !req.body.num2 || !req.body.operator) {
        // me trying to not update the data if an incomplete object is sent as a POST
    } else {
        inputCalculation = req.body
        console.log('inputCalculation is now:',
            inputCalculation);
        calculator(inputCalculation);
        // res.sendStatus(201)
    }
})

app.get('/calc', (req, res) => {
    console.log('GET is working!');
    res.send(calcHistoryArray)
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