const display = document.querySelector(".display");
const buttons = document.querySelector(".buttons");

let num1 = "";
let num2 = "";
let op = "";
let result;
let resultIsShown = false;

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

function decimal() {
  const lastChar = display.textContent.slice(-1);

  if (lastChar === "." || display.textContent.includes(".")) return;

  if (lastChar === "") {
    display.append("0.");
    if (op !== "") num2 = display.textContent;
    return;
  }

  display.append(".");
}

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

  if (display.textContent.includes("-")) {
    display.textContent = display.textContent.replace("-", "");
  } else {
    display.textContent = "-" + display.textContent;
  }

  if (op === "") num1 = display.textContent;
  if (op !== "") num2 = display.textContent;
  if (resultIsShown) result = display.textContent;
}

function operate(num1, op, num2) {
  num1 = +num1;
  num2 = +num2;

  if (op === "+") result = add(num1, num2);
  if (op === "-") result = subtract(num1, num2);
  if (op === "x") result = multiply(num1, num2);
  if (op === "/") result = divide(num1, num2);
  if (op === "^") result = power(num1, num2);

  if (result === "ERROR") return "ERROR";
  if (result >= 1e14 || result <= -1e14) return result.toExponential(2);
  if (!Number.isInteger(result)) return Math.floor(result * 1e14) / 1e14;
  return result;
}

buttons.addEventListener("click", (e) => {
  if (e.target.dataset.type === "number") {
    if (resultIsShown) {
      clear();
    }

    if (num2 === "" && op !== "") display.textContent = "";

    if (display.textContent.length >= 16) return;

    if (e.target.dataset.value === ".") return decimal();

    display.append(e.target.dataset.value);
    if (op === "") num1 = display.textContent;
    if (op !== "") num2 = display.textContent;
  }

  if (e.target.dataset.type === "operator") {
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

    op = e.target.dataset.value;
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
    if (num2 === "") return clear();

    display.textContent = operate(num1, op, num2);
    resultIsShown = true;
  }
});
