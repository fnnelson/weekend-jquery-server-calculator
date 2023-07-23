$(document).ready(onReady);

let operatorType;
let calcHistory;

function onReady() {
    // console.log("jquery ready!")
    $('.operator-btn').on('click', handleOperator)
    $('#equals-button').on('click', handleEquals);

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

function updateCalcHistory() {
    // might have to empty DOM div every time??
    // AJAX GET
    $.ajax({
        method: 'GET',
        url: '/calc'
    }).then((response) => {
        calcHistory = response;
        console.log('in GET calc history:', calcHistory)
    }).catch((error) => {
        console.log('error caught:', error);
        alert('ERROR on GET')
    })
}


// Note: when updating current answer on DOM, the answer from latest calc can be the array[0].answer