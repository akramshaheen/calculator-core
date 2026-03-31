const display = document.querySelector(".display");
const buttons = document.querySelector(".buttons");

let num1 = "";
let num2 = "";
let op = "";
let result;
let resultIsShown = false;

function updateNumbers() {
  if (op === "") num1 = display.textContent;
  if (op !== "") num2 = display.textContent;
}

//Calculation functions
function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  if (y === 0) return "ERROR";
  return x / y;
}

function power(x, y) {
  return x ** y;
}

function operate(num1, op, num2) {
  num1 = +num1;
  num2 = +num2;

  if (op === "+") result = add(num1, num2);
  if (op === "-") result = subtract(num1, num2);
  if (op === "*") result = multiply(num1, num2);
  if (op === "/") result = divide(num1, num2);
  if (op === "^") result = power(num1, num2);

  if (result === "ERROR") return "ERROR";
  if (result >= 1e13 || result <= -1e13) return result.toExponential(2);
  if (!Number.isInteger(result)) return Math.floor(result * 1e13) / 1e13;
  return result;
}

//Button callbacks
function clear() {
  num1 = "";
  num2 = "";
  op = "";
  result = undefined;
  display.textContent = "";
  resultIsShown = false;
}

function deleteBtn() {
  if (resultIsShown) return clear();
  display.textContent = display.textContent.slice(0, -1);
}

function plusMinus() {
  if (display.textContent === "" || (num1 !== "" && op !== "" && num2 === ""))
    return;

  if (display.textContent.charAt(0) === "-") {
    display.textContent = display.textContent.slice(1);
  } else {
    display.textContent = "-" + display.textContent;
  }

  updateNumbers();
  if (resultIsShown) result = display.textContent;
}

function decimal() {
  const lastChar = display.textContent.slice(-1);

  if (lastChar === "." || display.textContent.includes(".")) return false;

  if (lastChar === "") {
    display.append("0.");
    return true;
  }

  display.append(".");
  return true;
}

function equals() {
  if (num2 === "") return;

  display.textContent = operate(num1, op, num2);
  resultIsShown = true;
}

function numberEvent(value) {
  if (resultIsShown) {
    clear();
  }

  if (num2 === "" && op !== "") display.textContent = "";

  if (display.textContent.length >= 16) return;

  if (value === ".") {
    if (decimal()) updateNumbers();
    return;
  }

  display.append(value);
  updateNumbers();
}

function operatorEvent(value) {
  if (num1 !== "" && num2 !== "" && !resultIsShown) {
    display.textContent = operate(num1, op, num2);
    num1 = display.textContent;
    num2 = "";
  }

  if (resultIsShown) {
    num1 = display.textContent;
    num2 = "";
    resultIsShown = false;
  }

  if (num1 === "") return;

  op = value;
}

//Event handlers
buttons.addEventListener("click", (e) => {
  if (e.target.dataset.type === "number") {
    numberEvent(e.target.dataset.value);
  }

  if (e.target.dataset.type === "operator") {
    operatorEvent(e.target.dataset.value);
  }

  if (e.target.matches(".delete")) {
    deleteBtn();
  }

  if (e.target.matches(".clear")) {
    clear();
  }

  if (e.target.matches(".plus-minus")) {
    plusMinus();
  }

  if (e.target.matches(".equals")) {
    equals();
  }
});

document.addEventListener("keydown", (e) => {
  e.target.blur();

  if ((e.key >= "0" && e.key <= "9") || e.key === ".") numberEvent(e.key);
  if (["+", "-", "*", "/"].includes(e.key)) operatorEvent(e.key);

  if (e.key === "Backspace") deleteBtn();
  if (e.key === "c") clear();
  if (e.key === "Enter") equals();
});
