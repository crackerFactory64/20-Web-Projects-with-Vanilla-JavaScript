const rulesPanel = document.getElementById("rules-panel");
const closeRulesBtn = document.getElementById("close-rules");
const openRulesBtn = document.getElementById("rules-button");
const canvas = document.getElementById("game");

const ctx = game.getContext("2d");

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
};

const paddle = {
  x: canvas.width / 2 - 50,
  y: canvas.height - 20,
  w: 100,
  h: 10,
};

draw();

function draw() {
  drawBall();
  drawPaddle();
  drawScore();
}

function drawScore() {
  ctx.font = "50px Helvetica";
  ctx.fillStyle = "#fff";
  ctx.fillText("000", 675, 75);
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, 2 * Math.PI);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath();
}

openRulesBtn.addEventListener("click", () => {
  rulesPanel.classList.toggle("rules--open");
});

closeRulesBtn.addEventListener("click", () => {
  rulesPanel.classList.toggle("rules--open");
});
