const display = document.querySelector(".display");
const buttons = document.querySelector(".buttons");

let num1;
let num2;
let op;

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
  return x / y;
}

function power(x, y) {
  return x ** y;
}

function operate() {}

buttons.addEventListener("click", (e) => {
  if (e.target.dataset.type === "number") {
    display.append(e.target.dataset.value);
  }

  if (e.target.dataset.type === "operator") {
    const lastChar = display.textContent.slice(-1);
    const operators = ["+", "-", "x", "/", "^"];

    if (operators.includes(lastChar) && e.target.dataset.value !== lastChar) {
      display.textContent = display.textContent.slice(0, -1);
      return display.append(e.target.dataset.value);
    }

    if (operators.includes(lastChar) || display.textContent === "") return;

    display.append(e.target.dataset.value);
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
    num1 = 0;
    num2 = 0;
    op = "";
    display.textContent = "";
  }

  if (e.target.matches(".equals")) {
    operate();
  }
});
