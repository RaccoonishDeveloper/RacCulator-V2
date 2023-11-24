const keysContainer = document.querySelector(".calculator__keys");
// get keys container
const keys = Array.from(keysContainer.children);
// split all the keys (keys container children) into an array
const numberKeys = keys.filter((key) => key.classList.contains("digit"));
const operatorKeys = keys.filter((key) =>
  key.classList.contains("calculator__operator")
);
const output = document.querySelector(".calculator__output");
const history = document.querySelector(".calculator__history");

const equal = document.querySelector("#key__equals");
const deleteAllButton = document.querySelector("#key__ac");
const deleteButton = document.querySelector("#key__ce");

let firstOperand = 0;
let secondOperand = 0;
let currentOperator = null;
let result = 0;
let isNewNumber = false;
output.textContent = result;

deleteAllButton.addEventListener("click", () => {
  output.textContent = 0;
  history.textContent = "";
  firstOperand = 0;
  secondOperand = 0;
  currentOperator = null;
  result = 0;
});

deleteButton.addEventListener("click", () => {
  if (history.textContent !== "") {
    output.textContent = 0;
  }
  output.textContent = output.textContent.slice(0, -1);
  if (output.textContent.slice(0, -1) === "") {
    output.textContent = "0";
  }
});

numberKeys.forEach((number) => {
  number.addEventListener("click", () => {
    if (isNewNumber) {
      output.textContent = "";
      isNewNumber = false;
    }
    if (number.textContent === "." && output.textContent.includes(".")) {
      return;
    }
    if (output.textContent === "0" && number.textContent !== ".") {
      output.textContent = "";
    }

    output.textContent += number.textContent;
    if (currentOperator !== null && firstOperand != 0) {
      secondOperand = output.textContent;
      console.log("secondOperand is: " + secondOperand);
    }
  });
  updateDisplay(result, firstOperand, currentOperator, secondOperand);
});

operatorKeys.forEach((operator) => {
  operator.addEventListener("click", () => {
    isNewNumber = true;
    if (currentOperator === null) {
      firstOperand = output.textContent;
      output.textContent = "";
    }

    console.log("firstOperand is: " + firstOperand);
    currentOperator = operator.textContent.trim();
    console.log("Operator is: " + currentOperator);
    updateDisplay(result, firstOperand, currentOperator, secondOperand);
  });
});

function updateDisplay(result = 0, operand1, operator, operand2) {
  let displayOperator = operator;
  if (operator === "Xy") {
    displayOperator = "^";
  }
  if (operand1 && operand2 && result) {
    history.textContent =
      operand1 + " " + displayOperator + " " + operand2 + " =";
    output.textContent = result;
  } else if (operand1 && operand2) {
    history.textContent = operand1 + " " + displayOperator;
    output.textContent = operand2;
  } else if (operand1 && operator) {
    history.textContent = operand1 + " " + operator;
    output.textContent = operand1;
  } else {
    output.textContent = result;
  }
}

updateDisplay(result, firstOperand, currentOperator, secondOperand);

equal.addEventListener("click", () => {
  secondOperand = output.textContent;
  result = getResult(firstOperand, currentOperator, secondOperand);
  updateDisplay(result, firstOperand, currentOperator, secondOperand);
});

function getResult(a, operator, b) {
  a = parseFloat(firstOperand);
  b = parseFloat(secondOperand);

  switch (operator) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "x":
      result = a * b;
      break;
    case "Xy":
      result = Math.pow(a, b);
      break;
    case "÷":
      result = a / b;
      break;
    default:
      console.log("Unknown operator: " + operator);
  }
  result = result.toFixed(2);
  result = parseFloat(result);
  console.log(result);
  return result;
}
