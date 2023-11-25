const keysContainer = document.querySelector(".calculator__keys");
// get keys container
const keys = Array.from(keysContainer.children);
// split all the keys (keys container children) into an array
const numberKeys = keys.filter((key) => key.classList.contains("digit"));
const operatorKeys = keys.filter((key) =>
  key.classList.contains("calculator__operator")
);
const input = document.querySelector(".calculator__input");
const output = document.querySelector(".calculator__output");

const equal = document.querySelector("#key__equals");
const deleteAllButton = document.querySelector("#key__ac");
const deleteButton = document.querySelector("#key__ce");

let operand1 = 0;
let operand2 = 0;
let operator = undefined;
let result = 0;

function clearAll() {
  input.textContent = "0";
  output.textContent = "";
  operand1 = 0;
  operand2 = 0;
  operator = undefined;
  result = 0;
}
deleteAllButton.addEventListener("click", () => {
  clearAll();
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
  number.addEventListener("click", () => {});
});

operatorKeys.forEach((operator) => {
  operator.addEventListener("click", () => {});
});

equal.addEventListener("click", () => {
  result = getResult(operand1, operator, operand2);
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

function updateDisplay(op1, operator, op2, result) {
  let inputDisplay = 0;
  let outputDisplay = undefined;
  input.textContent = inputDisplay;
  output.textContent = outputDisplay;
}
updateDisplay();
