const spinner = document.getElementById("spinner");
const count = document.getElementById("count");
const daysEl = document.getElementById("days");
const hoursEL = document.getElementById("hours");
const minsEl = document.getElementById("mins");
const secsEl = document.getElementById("secs");
const nextYearEL = document.getElementById("next-year");

let currentTime = new Date();
const nyd = new Date(`January 1, ${currentTime.getFullYear() + 1}`);

nextYearEL.innerHTML = currentTime.getFullYear() + 1;
