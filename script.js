//GLOBAL VARIABLES
var displayValue = document.getElementById("display-container");
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
        clickedEqualButton = 0;
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
    if (x === '/'){
        operator = '/';
    }else if (x === '*'){
        operator = '*';
    }else if (x === '-'){
        operator = '-';
    }else if (x === '+'){
        operator = '+';
    }
    
    //still needs tweaking --- Purpose: to update the display with the answer to the previous operation when operator button is clicked like it does on the iphone calculator --- Currently: only works with same operations (ie. add, substract, etc.), for other operations it performs the most recent operation instead of showing the result of the previous one. ex : "2 + 3 -" should show "5" so "5 - ?" would be the next operation, but currently shows "2 + 3 -" as "-1"
    operatorButtonClicked = 1;
    if (!num2 == ""){
        equalButton();
    }

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
function equalButton(){
    clickedEqualButton = 1;

    let value1 = parseFloat(num1);
    let value2 = parseFloat(num2);

    // console.log(value1);
    // console.log(operator);
    // console.log(value2);

    if (operator === '/'){
        answer = value1 / value2;
		displayValue.innerHTML = answer;
	}else if (operator === '*'){
		answer = value1 * value2;
		displayValue.innerHTML = answer;
	}else if (operator === '-'){
		answer = value1 - value2;
		displayValue.innerHTML = answer;
	}else if (operator === '+'){
		answer = value1 + value2;
		displayValue.innerHTML = answer;
    }
    
    num1 = answer;
    num2 = "";
}