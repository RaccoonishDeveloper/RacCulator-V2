const keysContainer = document.querySelector(".calculator__keys");
// get keys container
const keys = Array.from(keysContainer.children);
// split all the keys (keys container children) into an array
const numberKeys = keys.filter((key) => key.classList.contains("digit"));
const operatorKeys = keys.filter((key) =>
  key.classList.contains("calculator__operator")
);
const currentDisplay = document.querySelector(".calculator__currentDisplay");
const lastDisplay = document.querySelector(".calculator__lastDisplay");

const equalButton = document.querySelector("#equals");
const deleteAllButton = document.querySelector("#ac");
const deleteButton = document.querySelector("#ce");
const decimalButton = document.querySelector("#decimal");

let operand1 = '';
let operand2 = '';
let currentOperator = '';
let result = '';


// Event Listeners
currentDisplay.textContent = "0";

deleteAllButton.addEventListener("click", clearAllHandler);

deleteButton.addEventListener("click", deleteLastHandler);

decimalButton.addEventListener("click", setDecimalHandler);

numberKeys.forEach((numberKey) => {
  numberKey.addEventListener("click", numberKeyHandler);
});

operatorKeys.forEach((operatorKey) => {
  operatorKey.addEventListener("click", operatorKeyHandler);
});

equalButton.addEventListener("click", equalButtonHandler);



// Functions

function clearAllHandler() {
  operand1 = '';
  operand2 = '';
  currentOperator = '';
  result = '';
  updateDisplay();
}

function deleteLastHandler() {
  if(result){
    clearAllHandler();
  }
  else if(operand2){
    operand2 = "0";
    
  }else if(operand1 && currentOperator){
    currentDisplay.textContent = "0";
    return;
  }
  else if (operand1){
    operand1 = operand1.slice(0, -1);
    
  }
  updateDisplay();
  
}

function setDecimalHandler() {
  if(currentOperator){
    if(!operand2){
      operand2 = "0" + "."
    }else if(!operand2.includes(".")){
      operand2 += "."
    }
    
    }else{
      if(!operand1){
        operand1 = "0" + ".";
      }
      else if(operand1 && !operand1.includes(".")){
        operand1 += "."
      }
}
  
  updateDisplay();
}

function numberKeyHandler(event){
  let number = event.target.id;
  setOperand(number);
}

function setOperand(number){
  if(!currentOperator) {
    if(operand1 === "0"){
      operand1 = number;
    }
    else{
      if(operand1.length >= 16){
        return
      }
      operand1 += number;
    }
    
    console.log("operand1: " + operand1);
  }
  else if(operand2 === "0"){
    return;
  }else{
    if(operand2.length >= 16){
      return
    }
    operand2 += number;
    console.log("operand2: " + operand2);
  }  
  updateDisplay();
}

function operatorKeyHandler(event){
  let operator = event.target.getAttribute('data-operator');
  setOperator(operator);
}
function setOperator(operator){
  
  if(currentOperator && operand2){
    let res = calculate(operand1, currentOperator, operand2);
    operand1 = res.toString();
    result = '';
    operand2 = '';

  }
  if(!operand1){
    operand1 = "0"
  }
  currentOperator = operator;
  console.log("currentOperator: " + currentOperator);
  updateDisplay();
}

function updateDisplay(){
  if(operand1 && currentOperator && operand2 && result){
    lastDisplay.textContent = `${operand1} ${currentOperator} ${operand2} =`
    currentDisplay.textContent = `${result}`

  }else if(operand1 && currentOperator && operand2){
    lastDisplay.textContent = `${operand1} ${currentOperator}`
    currentDisplay.textContent = `${operand2}`
  }else if(operand1 && currentOperator){
    lastDisplay.textContent = `${operand1} ${currentOperator}`
    currentDisplay.textContent = `${operand1}`
  }
  else if(operand1){
    currentDisplay.textContent = `${operand1}`
  }else{
    lastDisplay.textContent = '';
    currentDisplay.textContent = "0";
  }
}

function equalButtonHandler(event){
  if(!currentOperator) return
  if(currentOperator === '÷' && operand2 ==="0"){
    currentDisplay.textContent = "Cannot divide by zero";
    return
  }
  
  if(operand2) {
    if(result){
      operand1 = result;
    }
  }
  if(operand1 === "0" && !operand2){
    operand2 = "0";
  }
  let res = calculate(operand1, currentOperator, operand2);
  setResult(res)
  updateDisplay()
}

function calculate(a, operator, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  let res;
  

  switch (operator) {
    case "+":
      res = a + b;
      break;
    case "-":
      res = a - b;
      break;
    case "x":
      res = a * b;
      break;
    case "^":
      res = Math.pow(a, b);
      break;
    case "÷":
      res = a / b;
      break;
    default:
      console.log("Unknown operator: " + operator);
  }
  console.log(typeof res)
  res = Math.round( res * 1000 ) / 1000
  console.log(res);
  return res;
}

function setResult(res){
  result = res.toString();
  return result;
}