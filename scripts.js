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

const equalButton = document.querySelector("#key__equals");
const deleteAllButton = document.querySelector("#key__ac");
const deleteButton = document.querySelector("#key__ce");
const decimalButton = document.querySelector("#key__decimal");

let operand1 = null;
let operand2 = null;
let currentOperator = null;
let result = null;
let reset = false;
currentDisplay.textContent = "0";
// Event Listeners
deleteAllButton.addEventListener("click", clearAll);

deleteButton.addEventListener("click", deleteLast);

decimalButton.addEventListener("click", setDecimal);

numberKeys.forEach((numberKey) => {
  numberKey.addEventListener("click", () => setNumber(numberKey.textContent));
});

operatorKeys.forEach((operatorKey) => {
  operatorKey.addEventListener("click", () =>
    setOperator(operatorKey.textContent)
  );
});

equalButton.addEventListener("click", calculate);

// Functions

function clearAll() {
  currentDisplay.textContent = "0";
  lastDisplay.textContent = "";
  operand1 = null;
  operand2 = null;
  operator = null;
  result = null;
}

function deleteLast() {
  if (currentDisplay.textContent === "Cannot divide by zero") {
    currentDisplay.textContent = "0";
  }

  if (lastDisplay.textContent !== "") {
    currentDisplay.textContent = "0";
  }
  currentDisplay.textContent = currentDisplay.textContent.slice(0, -1);
  if (currentDisplay.textContent === "") {
    currentDisplay.textContent = "0";
  }
}

function clearDisplay() {
  currentDisplay.textContent = "";
  reset = false;
}

function setNumber(number) {
  if (currentDisplay.textContent === "0" || reset) clearDisplay();
  currentDisplay.textContent += number;
  console.log("current number: " + currentDisplay.textContent);
}
function setDecimal() {
  if (
    decimalButton.textContent === "." &&
    currentDisplay.textContent.includes(".")
  ) {
    return;
  }

  if (currentDisplay.textContent === "") {
    currentDisplay.textContent = "0";
  }

  currentDisplay.textContent += decimalButton.textContent;
}

function setOperator(operator) {
  operator = operator.trim();
  if (currentOperator !== null) calculate();
  operand1 = currentDisplay.textContent;
  currentOperator = operator;
  let displayOperator = currentOperator;
  if (currentOperator === "Xy") {
    displayOperator = "^";
  }
  lastDisplay.textContent = `${operand1} ${displayOperator}`;
  console.log("Current operator: " + displayOperator);
  reset = true;
}
function calculate() {
  if (currentOperator === null || reset) return;
  if (currentOperator === "÷" && currentDisplay.textContent === "0") {
    currentDisplay.textContent = "Cannot divide by zero";
    return;
  }
  let displayOperator = currentOperator;
  if (currentOperator === "Xy") {
    displayOperator = "^";
  }
  operand2 = currentDisplay.textContent;
  currentDisplay.textContent = getResult(operand1, currentOperator, operand2);
  lastDisplay.textContent = `${operand1} ${displayOperator} ${operand2} =`;
  currentOperator = null;
}

function getResult(a, operator, b) {
  a = parseFloat(a);
  b = parseFloat(b);

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
