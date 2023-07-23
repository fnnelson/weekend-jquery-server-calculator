$(document).ready(onReady);

let operatorType;

function onReady() {
    // console.log("jquery ready!")
    $('.operator-btn').on('click', handleOperator)
    $('#equals-button').on('click', handleEquals);

}

function handleOperator(event) {
    event.preventDefault();
    operatorType = $(this).attr('id');
    console.log(operatorType);
}

function handleEquals(event) {
    event.preventDefault();
    if (!$('#input-number-one').val() || !$('#input-number-two').val()) {
        alert('enter numbers in the inputs!')
    } else if (!operatorType) {
        alert('enter an operator ( + - * / )')
    } else {
        let calculationObject = {
            num1: $('#input-number-one').val(),
            num2: $('#input-number-two').val(),
            operator: operatorType
        }
        console.log('calculationObject is', calculationObject)
    }
}
