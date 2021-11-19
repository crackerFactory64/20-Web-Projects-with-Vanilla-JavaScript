const spinner = document.getElementById("spinner");
const count = document.getElementById("count");
const daysEl = document.getElementById("days");
const hoursEL = document.getElementById("hours");
const minsEl = document.getElementById("mins");
const secsEl = document.getElementById("secs");
const nextYearEL = document.getElementById("next-year");

let currentTime = new Date();
const nyd = new Date(`January 1, ${currentTime.getFullYear() + 1}`);

updateTime();

setInterval(() => {
  updateTime();
}, 1000);

function updateTime() {
  currentTime = new Date();
  daysEl.innerHTML = getDays();
  hoursEL.innerHTML = getHours();
  minsEl.innerHTML = getMins();
  secsEl.innerHTML = getSecs();
}

function getDays() {
  return Math.floor((nyd - currentTime) / 86400000);
}

function getHours() {
  return currentTime.getMinutes() == 0
    ? 24 - currentTime.getHours()
    : 23 - currentTime.getHours();
}

function getMins() {
  return 59 - currentTime.getMinutes();
}

function getSecs() {
  return 60 - currentTime.getSeconds();
}

loading();

function loading() {
  setTimeout(() => {
    spinner.classList.add("app__spinner--hide");
    count.classList.add("app__count--show");
  }, 1500);
}

nextYearEL.innerHTML = currentTime.getFullYear() + 1;
