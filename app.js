const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generate-btn");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");

let password = "";
let passwordLength = 10;
let checkCount = 0;

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
  } else {
    setIndicator("#f00");
  }
}

async function copyContent() {
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.textContent = "copied";
  } catch (e) {
    copyMsg.textContent = "failed";
    console.log(e);
  }
  // to make it visible
  copyMsg.classList.add("active");

  // to remove after 2 sec
  setTimeout(() => {
    copyMsg.classList.remove("active");
  }, 2000);
}

function shufflePassword(array) {
  //Fisher Yates Method
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  let str = "";
  array.forEach((el) => (str += el));
  return str;
}
function handleCheckBoxChange() {
  checkCount = 0;
  allCheckBox.forEach((checkBox) => {
    if (checkBox.checked) {
      checkCount++;
    }

    // special condition
    if (passwordLength < checkCount) {
      passwordLength = checkCount;
      handleSlider();
    }
  });
}

allCheckBox.forEach((checkBox) => {
  checkBox.addEventListener("change", handleCheckBoxChange);
});

inputSlider.addEventListener("input", (e) => {
  passwordLength = e.target.value;
  handleSlider();
});

copyBtn.addEventListener("click", () => {
  if (passwordDisplay.value) {
    copyContent();
  }
});

generateBtn.addEventListener("click", () => {
  if (checkCount <= 0) return;

  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }

  // let start generating password
  // REMOVE THE OLD PASSWORD
  password = "";
  // generate
  let funcArr = [];

  if (uppercaseCheck.checked) {
    funcArr.push(generateUppercase);
  }
  if (lowercaseCheck.checked) {
    funcArr.push(generateLowercase);
  }
  if (numberCheck.checked) {
    funcArr.push(getRandomNumber);
  }
  if (symbolCheck.checked) {
    funcArr.push(generateSymbols);
  }

  // compulsory addition
  for (let i = 0; i < funcArr.length; i++) {
    password += funcArr[i]();
  }

  // remaining addition
  for (let i = 0; i < passwordLength - funcArr.length; i++) {
    let randomIndex = getRandomInteger(0, funcArr.length);
    password += funcArr[randomIndex]();
  }

  // shuffle the password
  password = shufflePassword(Array.from(password));
  // show in UI
  passwordDisplay.value = password;
  // show the strength
  calcStrength();
});
