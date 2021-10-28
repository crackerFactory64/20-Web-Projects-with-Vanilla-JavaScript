const options = document.getElementById("options");
const difficultyEl = document.getElementById("difficulty");
const app = document.getElementById("app");
const game = document.getElementById("game");
const gameOver = document.getElementById("game-over");
const gameOverText = document.getElementById("game-over-text");
const tryAgain = document.getElementById("try-again");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const hiScoreEl = document.getElementById("hi-score");
const wordEl = document.getElementById("word");
const inputEl = document.getElementById("input");
const toggleButton = document.getElementById("toggle");

const words = [
  "kayfabe",
  "tokyo dome",
  "five stars",
  "workrate",
  "work",
  "shoot",
  "dropkick",
  "headlock",
  "mat work",
  "heat",
  "omega",
  "okada",
  "hammerlock",
  "piledriver",
  "small package",
  "the elite",
  "khan",
  "fire",
  "key demo",
  "elbow drop",
  "armlock",
  "moonsault",
  "bucks",
  "tanahashi",
  "enzuigiri",
  "mcmahon",
  "ushigoroshi",
  "ishii",
  "jobber",
  "stinger",
];

const localStorageDifficulty = localStorage.getItem("difficulty");
const localStorageHiScore = localStorage.getItem("hi-score");

let score = 0;
let hiScore = 0;
if (localStorageHiScore) {
  hiScore = localStorageHiScore;
}
let addTime = 2;
if (localStorageDifficulty) {
  addTime = +localStorageDifficulty;
  difficultyEl.value = localStorageDifficulty;
}

let time = 10;
let word = "";

const interval = setInterval(() => {
  handleTime();
}, 1000);

setWord();

function setWord() {
  word = words[Math.floor(Math.random() * words.length)];
  updateDom();
}

function checkInput() {
  const input = inputEl.value.trim();
  if (input === word) {
    setWord();
    score++;
    time = time + addTime;
    inputEl.value = "";
  }
  if (score > hiScore) {
    hiScore = score;
    localStorage.setItem("hi-score", hiScore);
  }
  updateDom();
}

function handleTime() {
  if (time <= 0) {
    clearInterval(interval);
    gameOverText.innerHTML = `You scored ${score} points.`;
    game.classList.add("hide");
    gameOver.classList.remove("hide");
  } else {
    time--;
  }
  updateDom();
}

function updateDom() {
  wordEl.innerHTML = word;
  scoreEl.innerHTML = `Score: ${score}`;
  hiScoreEl.innerHTML = `Hi-Score: ${hiScore}`;
  timeEl.innerHTML = `Time: ${time}s`;
}

toggleButton.addEventListener("click", () => {
  options.classList.toggle("options--hide");
});

inputEl.addEventListener("keyup", () => {
  checkInput();
});

difficultyEl.addEventListener("change", () => {
  addTime = +difficultyEl.value;
  localStorage.setItem("difficulty", difficultyEl.value);
});
