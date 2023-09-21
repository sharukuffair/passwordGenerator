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

//set passwordLength
function handleSlider() {
  inputSlider.value = passwordLength;
  lengthDisplay.textContent = passwordLength;
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
let test = getRandomInteger(1, 10);
console.log(test);
