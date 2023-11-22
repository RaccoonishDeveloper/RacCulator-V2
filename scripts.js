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

// filter array into 2 sub arrays, one for the numbers and one for the operators
const deleteAll = document.querySelector("#key__ac");
const deleteLast = document.querySelector("#key__ce");

deleteAll.addEventListener("click", () => {
  output.textContent = 0;
  array = [];
  currentNumber = "";
  currentOperator = "";
  history.textContent = "";
});

deleteLast.addEventListener("click", () => {
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
let currentNumber = "";
let currentOperator = "";
let isNewNumber = false;

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

numberKeys.forEach((number) => {
  number.addEventListener("click", () => {
    if (output.textContent == 0) {
      output.textContent = " ";
    }
    if (isNewNumber) {
      output.textContent = "";
      isNewNumber = false;
    }
    output.textContent += number.textContent;
    currentNumber = output.textContent;
    console.log("Current number is:" + currentNumber);
  });
});

// Number key
