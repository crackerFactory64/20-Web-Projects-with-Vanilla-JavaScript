const modalBg = document.querySelector(".modal-bg");
const loss = document.getElementById("loss");
const congrats = document.getElementById("congrats");
const playAgain = document.getElementById("play-again");
const head = document.getElementById("head");
const body = document.getElementById("body");
const leftArm = document.getElementById("left-arm");
const rightArm = document.getElementById("right-arm");
const leftLeg = document.getElementById("left-leg");
const rightLeg = document.getElementById("right-leg");
const wrongLetters = document.getElementById("wrong-letters");
const word = document.getElementById("word");
const tab = document.querySelector(".same-letter");

const words = [
  "brainbuster",
  "moonsault",
  "crossface",
  "dropkick",
  "piledriver",
];
let currentWord = "";
let wrongArr = [];
let displayWordArr = [];
let chances = 6;

chooseWord();

window.addEventListener("keydown", (e) => {
  let letter = e.key;
  processKeyPress(letter);
});

function chooseWord() {
  currentWord = words[Math.floor(Math.random() * words.length)];
  for (let i = 0; i < currentWord.length; i++) {
    displayWordArr[i] = "_";
  }
  word.innerHTML = displayWordArr.join("");
  letters = currentWord.length;
}

function processKeyPress(key) {
  wordArr = currentWord.split("");
  if (checkIfLetter(key)) {
    if (wordArr.indexOf(key) < 0) {
      processWrongGuess(key);
    } else {
      processCorrectGuess(key);
    }
    updateDom();
  }
}

function checkIfLetter(str) {
  return str.length == 1 && str.match(/[a-z]/i);
}

function processWrongGuess(key) {
  if (wrongArr.indexOf(key) < 0) {
    wrongArr.push(key);
    tab.classList.remove("same-letter--active");
    chances--;
  } else {
    tab.classList.add("same-letter--active");
    setTimeout(() => {
      tab.classList.remove("same-letter--active");
    }, 3000);
  }
}

function processCorrectGuess(key) {
  let letterPos = findLetters(wordArr, key);
  letterPos.forEach((position) => {
    displayWordArr[position] = key;
  });
  tab.classList.remove("same-letter--active");
}

function findLetters(arr, letter) {
  let indices = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == letter) {
      indices.push(i);
    }
  }
  return indices;
}

function drawHangman() {
  if (chances == 5) {
    head.style.visibility = "visible";
  } else if (chances == 4) {
    body.style.visibility = "visible";
  } else if (chances == 3) {
    leftArm.style.visibility = "visible";
  } else if (chances == 2) {
    rightArm.style.visibility = "visible";
  } else if (chances == 1) {
    leftLeg.style.visibility = "visible";
  } else if (chances == 0) {
    rightLeg.style.visibility = "visible";
  }
}

function updateDom() {
  word.innerHTML = displayWordArr.join("").toUpperCase();
  wrongLetters.innerHTML = wrongArr.join(", ").toUpperCase();
  drawHangman();
  if (chances == 0) {
    modalBg.style.display = "flex";
    congrats.classList.add("modal__message--hide");
    loss.classList.remove("modal__message--hide");
  }

  if (displayWordArr.indexOf("_") < 0) {
    modalBg.style.display = "flex";
    loss.classList.add("modal__message--hide");
    congrats.classList.remove("modal__message--hide");
  }
}
