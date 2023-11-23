const keysContainer = document.querySelector(".calculator__keys");
// get keys container
const keys = Array.from(keysContainer.children);
// split all the keys (keys container children) into an array
const output = document.querySelector(".calculator__output");
const history = document.querySelector(".calculator__history");

const numberKeys = keys.filter((key) => key.classList.contains("digit"));
const operatorKeys = keys.filter((key) =>
  key.classList.contains("calculator__operator")
);
// console.table(operatorKeys);
const powerButton = document.querySelector("#key__pow");
const decimalButton = document.querySelector("#key__decimal");

// filter array into 2 sub arrays, one for the numbers and one for the operators
const deleteAllButton = document.querySelector("#key__ac");
const deleteButton = document.querySelector("#key__ce");

deleteAllButton.addEventListener("click", () => {
  output.textContent = 0;
  lastNumber = "";
  currentNumber = "0";
  currentOperator = "";
  history.textContent = "";
  isNewNumber = false;
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
// added the delete buttons

keys.forEach((key) => {
  key.addEventListener("mousedown", () => {
    key.classList.add("clicked");
  });
  key.addEventListener("mouseup", () => {
    setTimeout(() => {
      key.classList.remove("clicked");
    }, 250); // delay in milliseconds
  });
});
// add animation when keys are clicked
let lastNumber = "";
let currentNumber = "0";
let currentOperator = "";
let isNewNumber = false;
let result;

operatorKeys.forEach((operator) => {
  operator.addEventListener("click", () => {
    lastNumber = currentNumber;
    console.log("last number is:" + lastNumber);
    if (operator.textContent.trim() === "Xy") {
      history.textContent = lastNumber + " " + "^";
    } else {
      history.textContent = lastNumber + " " + operator.textContent.trim();
    }
    currentOperator = operator.textContent.trim();

    isNewNumber = true;
  });
});
// operator keys

numberKeys.forEach((number) => {
  number.addEventListener("click", () => {
    if (number.textContent === "." && output.textContent.includes(".")) {
      return;
    }
    if (output.textContent === "0") {
      output.textContent =
        number.textContent === "." ? "0." : number.textContent;
    } else if (isNewNumber) {
      output.textContent = number.textContent;
      isNewNumber = false;
    } else {
      output.textContent += number.textContent;
    }
    currentNumber = output.textContent;
    console.log("Current number is:" + currentNumber);
  });
});
// Number keys

const equal = document.querySelector("#key__equals");
equal.addEventListener("click", () => {
  getResult(lastNumber, currentOperator, currentNumber);
});

function getResult(a, operator, b) {
  a = parseFloat(lastNumber);
  b = parseFloat(currentNumber);

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

  // let displayOperator = operator;
  // if (operator === "Xy") {
  //   displayOperator = "^";
  // }

  result = result.toFixed(2);
  result = parseFloat(result);
  console.log(result);
  return result;
}

// Replace "Xy" with "^" for display
