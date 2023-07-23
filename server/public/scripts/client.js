$(document).ready(onReady);

let operatorType;

function onReady() {
    // console.log("jquery ready!")
    $('.operator-btn').on('click', handleOperator)
    $('#equals-button').on('click', handleEquals);

}

function handleOperator(event) {
    event.preventDefault();
    // this assigns the latest-clicked operator to operatorType
    operatorType = $(this).attr('id');
    console.log(operatorType);
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
        console.log("POST was successful:", response);
    }).catch((error) => {
        console.log('error caught:', error);
        alert('ERROR!')
    })

    // here we will have to reset operatorType 
    // may want to empty inputs? 

}
