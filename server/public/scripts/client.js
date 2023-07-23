$(document).ready(onReady);

let operatorType;
let calcHistory;

function onReady() {
    // console.log("jquery ready!")
    $('.operator-btn').on('click', handleOperator)
    $('#equals-button').on('click', handleEquals);
    $('#clear-button').on('click', handleClear);

    // this function added here so that when we refresh the page the history still shows on the DOM
    updateCalcHistory();
}

function handleOperator(event) {
    event.preventDefault();
    // this assigns the latest-clicked operator to operatorType
    operatorType = $(this).attr('id');
    console.log('operator type:', operatorType);
}

function handleEquals(event) {
    event.preventDefault();
    // here I'm assigning the inputs and operator clicked into an object
    let calculationObject;
    if (!$('#input-number-one').val() || !$('#input-number-two').val()) {
        alert('enter numbers in the inputs!')
    } else if (!operatorType) {
        alert('enter an operator ( + - * / )')
    } else {
        calculationObject = {
            num1: $('#input-number-one').val(),
            num2: $('#input-number-two').val(),
            operator: operatorType
        }
    }
    console.log('calculationObject is', calculationObject)

    $.ajax({
        method: "POST",
        url: '/calc',
        data: calculationObject
    }).then((response) => {
        // may want to add the function to append here?
        updateCalcHistory();
        console.log("POST was successful:", response);
    }).catch((error) => {
        console.log('error caught:', error);
        alert('ERROR!')
    })

    // here we will have to reset operatorType 
    // may want to empty inputs? 
}

function handleClear() {
    // $('#input-number-one').val("");
    // $('#input-number-two').val("");

    // I actually found it better to just allow the event's default since it refreshes the page, and resets the operator as well
}

function updateCalcHistory() {
    // might have to empty DOM div every time??
    // AJAX GET
    $.ajax({
        method: 'GET',
        url: '/calc'
    }).then((response) => {
        calcHistory = response;
        console.log('in GET calc history:', calcHistory)
        render(calcHistory);
    }).catch((error) => {
        console.log('error caught:', error);
        alert('ERROR on GET')
    })
}


// Note: when updating current answer on DOM, the answer from latest calc can be the array[0].answer

function render(arrayOfObjects) {
    $('#calc-history-list').empty();
    for (let object of arrayOfObjects) {
        // conditional to get 'addition' to show +, etc (still wondering if I could have kept operators as strings and still have them work)
        if (object.operator == 'addition') {
            object.operator = '+';
        } else if (object.operator == 'subtraction') {
            object.operator = '-';
        } else if (object.operator == 'multiplication') {
            object.operator = '*';
        } else if (object.operator == 'division') {
            object.operator = '/';
        }

        // appending whole array (calc history) to DOM
        $('#calc-history-list').append(`
        <li>${object.num1} ${object.operator} ${object.num2} = ${object.answer}</li>
    `)
    }
    // had to add conditional since error when empty array at startup of server on homepage (no array[0].answer yet)
    if (arrayOfObjects[0]) {
        $('#calc-answer').text(`${arrayOfObjects[0].answer}`)
    }
}