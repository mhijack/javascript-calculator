"use strict";
// ========================= TODO =========================
// display operation history

// ========================= initializing variables =========================
const resetButton = getEl('#reset');
const equalButton = getEl('#equal');
const viewer = getEl('.display')[0];
const decimalButton = getEl('#dot');
const percentageButton = getEl('#percent');
const positiveButton = getEl('#positive');

// holds value of current numeric input until an operant is clicked
let current = viewer.textContent;
// stores historical numeric values once an operant is clicked
let previous;
// remembers which operant was pressed
let operant;
// determining whether to reprint viewer or append number input to existing value of viewer
let rePrint = false;
// if equal is pressed, don't recalculate; otherwise everytime operant pressed, update result of chained calculation
let equalPressed = false;

// get functions and numbers
const funcs = getEl('.function');
const numbers = getEl('.numbers');

// ========================= eventListeners =========================
// add eventListeners
for (let func of funcs) {
  func.addEventListener('click', operation)
}

for (let number of numbers) {
  number.addEventListener('click', addNumber);
}

// add eventListener to equal button
equalButton.addEventListener('click', calculate);

// add eventListener to reset button
resetButton.addEventListener('click', clear);

// add eventListener to decimal button
decimalButton.addEventListener('click', addDot);

// add eventListener to percent button
percentageButton.addEventListener('click', getPercentage);

positiveButton.addEventListener('click', togglePostive);
// ========================= helper functions =========================
// operations on curResult
function operation(e) {
  if (!equalPressed) {
    // is equal is not pressed, every time operant is pressed, do calculation
    calculate();
  }
  equalPressed = false;
  // when operant is pressed, save operant (only remembers the operant last pressed)
  operant = e.target.id;
  // record current number on screen to previous
  previous = viewer.textContent;
  // set rePrint to true
  rePrint = true;
}

// add numbers together
function addNumber(e) {
  updateDisplay(e.target.value);
  current = viewer.textContent;
}

// when 'equal' is pressed
function calculate() {
  // prevents hitting calculate as first entry
  if (previous) {
    let result;
    current = parseFloat(current);
    previous = parseFloat(previous);
    switch (operant) {
      case 'divide':
        result = previous / current;
        break;
      case 'times':
        result = previous * current;
        break;
      case 'minus':
        result = previous - current;
        break;
      case 'plus':
        result = previous + current;
      default:
        break;
    }
    current = current.toString();
    previous = result.toString();
    viewer.textContent = result;
    rePrint = true;
    if (!equalPressed) {
      equalPressed = true;
    }
    return;
  }
}

// getPercentage
function getPercentage() {
  viewer.textContent = viewer.textContent / 100;
  rePrint = true;
  return;
}

// togglePostive function
function togglePostive() {
  previous = parseFloat(previous);
  let result = -previous;
  viewer.textContent = result;
  previous = result.toString();
  rePrint = true;
}

// display result to viewer
function updateDisplay(data) {
  if (viewer.textContent.length >= 21) {
    // if exceeds viewer digit limit, reset state
    viewer.textContent = 'Digit Limit Met';
    return;
  }
  if (viewer.textContent === '0') {
    // if current number is 0, set the pressed number to value (prevents leading zero)
    viewer.textContent = data;
    return;
  }
  if (rePrint) {
    viewer.textContent = data;
    rePrint = false;
    return;
  }
  viewer.textContent = viewer.textContent + data;
  return;
}

// clear everything when reset is clicked
function clear() {
  current = null;
  previous = null;
  operant = null;
  rePrint = true;
  updateDisplay('0');
}

// add decimal dot to current number
function addDot() {
  if (viewer.textContent.indexOf('.') === -1) {
    // if dot does not exist yet, append dot
    viewer.textContent = viewer.textContent + '.';
    return;
  }
  // otherwise do nothing and return
  return;
}

// shorthand for selecting elements
function getEl(tag) {
  if (tag[0] === '#') {
    // selects by id
    return document.getElementById(tag.slice(1));
  } else if (tag[0] === '.') {
    // selects by class
    return document.getElementsByClassName(tag.slice(1));
  } else {
    // selects by html tag
    return document.querySelector(tag);
  }
}