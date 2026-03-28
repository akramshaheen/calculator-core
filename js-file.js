const display = document.querySelector(".display");
const buttons = document.querySelector(".buttons");

let num1 = "";
let num2 = "";
let op = "";
let result;

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
  if (op === "x") result = multiply(num1, num2);
  if (op === "/") result = divide(num1, num2);
  if (op === "^") result = power(num1, num2);

  if (result >= 1e14 || result <= -1e14) return result.toExponential(2);
  if (!Number.isInteger(result)) return Math.floor(result * 1e14) / 1e14;
  return result;
}

buttons.addEventListener("click", (e) => {
  if (e.target.dataset.type === "number") {
    // if (result !== undefined) {
    //   result = undefined;
    //   display.textContent = "";
    // }

    if (num2 === "" && op !== "") display.textContent = "";

    if (display.textContent.length > 16) return;

    display.append(e.target.dataset.value);
    if (op === "") num1 = display.textContent;

    if (op !== "") num2 = display.textContent;
  }

  if (e.target.dataset.type === "operator") {
    if (num1 !== "" && num2 !== "") {
      display.textContent = operate(num1, op, num2);
      num1 = display.textContent;
      num2 = "";
    }

    if (num1 === "") return;

    op = e.target.dataset.value;
  }

  if (e.target.matches(".decimal")) {
    const lastChar = display.textContent.slice(-1);

    if (lastChar === "." || display.textContent.includes(".")) return;

    if (lastChar === "") return display.append("0.");

    display.append(".");
  }

  if (e.target.matches(".delete")) {
    display.textContent = display.textContent.slice(0, -1);
  }

  if (e.target.matches(".clear")) {
    num1 = "";
    num2 = "";
    op = "";
    result = undefined;
    display.textContent = "";
  }

  if (e.target.matches(".equals")) {
    display.textContent = operate(num1, op, num2);
  }
});
