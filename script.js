//GLOBAL VARIABLES
var displayValue = document.getElementById("display-bottom");
var num1 = "";
var num2 = "";
var operator;
var answer;
var operatorButtonClicked = 0;
var equalButtonClicked = 0;

//FUNCTION BUTTONS
function functionButton(x){
    if (x === 1){
        num1 = "";
        num2 = "";
        answer = "";
        displayValue.innerHTML = "0";
        equalButtonClicked = 0;
        operatorButtonClicked = 0;
    }else if (x === 2){
        if (displayValue.innerHTML > 0 || displayValue.innerHTML < 0){
            displayValue.innerHTML *= -1;
            if (operatorButtonClicked === 0){
                num1 = displayValue.innerHTML;
            }else if (operatorButtonClicked === 1) {
                num2 = displayValue.innerHTML;
            }
        }
    }else if (x === 3){
        if (displayValue.innerHTML > 0 || displayValue.innerHTML < 0){
            if (operatorButtonClicked === 0){
                num1 *= 0.01;
                displayValue.innerHTML *= 0.01;
            }else if (operatorButtonClicked === 1) {
                num2 *= 0.01;
                displayValue.innerHTML *= 0.01;
            }
            
        }
    }

}

//NUMBER BUTTONS
function numberButton(x){
    if (operatorButtonClicked === 0 && num1.length < 9){
        num1 += x;
        displayValue.innerHTML = num1;
    }else if (operatorButtonClicked === 1 && num2.length < 9) {
        num2 += x;
        displayValue.innerHTML = num2;
    }
}

//OPERATOR BUTTONS
function operatorButton(x){
    //FIXED : moved this if statement to the top and solved following issue (power of order): > Purpose: to update the display with the answer to the previous operation when operator button is clicked for a third or more operations like it does on the iphone calculator --- Currently: only works with same operations (ie. add, substract, etc.), for other operations it performs the most recent operation instead of showing the result of the previous one. ex : "2 + 3 -" should show "5" so "5 - ?" would be the next operation, but currently shows "2 + 3 -" as "-1"
    if (!num2 == ""){
        equalButton();
    }
    
    if (x === '/'){
        operator = '/';
    }else if (x === '*'){
        operator = '*';
    }else if (x === '-'){
        operator = '-';
    }else if (x === '+'){
        operator = '+';
    }
    
    operatorButtonClicked = 1;
    equalButtonClicked = 0;
}

//DECIMAL BUTTON
function decimalButton(x){
    if (!displayValue.innerHTML.includes(x) && num1 == ""){
        num1 = "0" + x;
		displayValue.innerHTML = "0" + x;
    }else if(!displayValue.innerHTML.includes(x)){
        num1 += x;
		displayValue.innerHTML += x;
    }
    
    if (operatorButtonClicked === 1 && num2 == ""){
        num2 = "0" + x;
		displayValue.innerHTML = "0" + x;
    }else if (operatorButtonClicked === 1 && !num2.includes(x)){
        num2 += x;
		displayValue.innerHTML = num2;
    }
}

//EQUAL BUTTON
//FIXED > if equal button is pressed more than once = NaN
function equalButton(){
    // console.log(value1);
    // console.log(operator);
    // console.log(value2);

    calculate();
    
    num1 = answer;
    num2 = "";
    equalButtonClicked = 1;
}


function calculate (){
    let value1 = parseFloat(num1);
    let value2 = parseFloat(num2);

    if (equalButtonClicked === 0){
        if (operator === '/'){
            answer = value1 / value2;
            displayValue.innerHTML = answer.toString().slice(0, 9);
        }else if (operator === '*'){
            answer = value1 * value2;
            displayValue.innerHTML = answer.toString().slice(0, 9);
        }else if (operator === '-'){
            answer = value1 - value2;
            displayValue.innerHTML = answer.toString().slice(0, 9);
        }else if (operator === '+'){
            answer = value1 + value2;
            displayValue.innerHTML = answer.toString().slice(0, 9);
        }
    } else {
        displayValue.innerHTML = answer;
    }
}
// the --> answer.toString().slice(0, 9); <-- solution is not satisfactory
// Should create a greaterLesserThanNine 0s function for the answers or just an answer function? if solving for both greater and lesser in the same function would need to add to percent button click event. Should return something like 9e10 or 9e-10 --- possibly will need to use a for loop

// function moreThanNineZerosRight () {
//     //Should return something like 9e10
//     if (answer > 0 && answer.length > 9){
//         //for loop? to test for numbers greater than zero so can set decimal and evaluate number after 'e' --- ex: if 980,000,000 * 100 = 9.8e10 || 980,000,000 * 1,000 = 9.8e11
//     }
// }
// function moreThanNineZerosLeft () {
//     //Should return something like 9e-10
//     if (answer < 0 && answer.length > 9){
        
//     }
// }

//Extra Features : 1) hilighted operator buttons, 2)Font size decreasing as amount of integers increase up to 9 characters
//