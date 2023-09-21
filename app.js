const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("data-copyMsg");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generate-btn");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");

let password = "";
let passwordLength = 10;
let checkCount = 1;

handleSlider();

//set passwordLength
function handleSlider() {
  inputSlider.value = passwordLength;
  lengthDisplay.innerHTML = passwordLength;
}

// set indicator
function setIndicator(color) {
  indicator.style.backgroundColor = color;
  //   set shadow
}

// generate random number
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomNumber() {
  return getRandomInteger(0, 9);
}

function generateLowercase() {
  return String.fromCharCode(getRandomInteger(97, 122));
}

function generateUppercase() {
  return String.fromCharCode(getRandomInteger(65, 90));
}

function generateSymbols() {
  return String.fromCharCode(getRandomInteger(33, 47));
}

function calcStrength() {
  let hasUpper = false;
  let hasLower = false;
  let hasNumber = false;
  let hasSymbol = false;

  if (uppercaseCheck.checked) hasUpper = true;
  if (lowercaseCheck.checked) hasLower = true;
  if (numberCheck.checked) hasNumber = true;
  if (symbolCheck.checked) hasSymbol = true;

  if (hasUpper && hasLower && hasNumber && hasSymbol && passwordLength >= 8) {
    setIndicator("#0f0");
  } else if (hasUpper && hasLower && hasNumber && passwordLength >= 6) {
    setIndicator("#ff0");
  }
}
