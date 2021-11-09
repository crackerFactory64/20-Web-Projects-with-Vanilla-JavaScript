const rulesPanel = document.getElementById("rules-panel");
const closeRulesBtn = document.getElementById("close-rules");
const openRulesBtn = document.getElementById("rules-button");
const game = document.getElementById("game");

const ctx = game.getContext("2d");

ctx.beginPath();
ctx.arc(400, 300, 10, 0, 2 * Math.PI);
ctx.fillStyle = "#fff";
ctx.fill();
ctx.stroke();

openRulesBtn.addEventListener("click", () => {
  rulesPanel.classList.toggle("rules--open");
});

closeRulesBtn.addEventListener("click", () => {
  rulesPanel.classList.toggle("rules--open");
});
