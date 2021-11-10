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
  dx: 0,
  speed: 10,
};

const brick = {
  x: canvas.width / 9,
  y: 40,
  w: canvas.width / 9 - 5,
  h: 20,
};

const colors = ["#363AD1", "#429D40", "#CCA407", "#D06537"];

update();

function update() {
  movePaddle();
  draw();
  requestAnimationFrame(update);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}

function drawBricks() {
  const columns = 8;
  const rows = 4;

  for (let i = 1; i <= rows; i++) {
    let y = 30 * i;
    ctx.beginPath();
    ctx.rect(50, y, brick.w, brick.h);
    ctx.fillStyle = colors[i - 1];
    ctx.fill();
    ctx.closePath();
    for (let j = 1; j < columns; j++) {
      ctx.beginPath();
      ctx.rect(brick.x * j + 50, y, brick.w, brick.h);
      ctx.fillStyle = colors[i + -1];
      ctx.fill();
      ctx.closePath();
    }
  }
}

function movePaddle() {
  paddle.x += paddle.dx;

  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }

  if (paddle.x < 0) {
    paddle.x = 0;
  }
}

function keyDown(e) {
  if (e.key == "ArrowRight") {
    paddle.dx = paddle.speed;
    console.log(paddle.x);
  }
  if (e.key == "ArrowLeft") {
    paddle.dx = -paddle.speed;
  }
}

function keyUp(e) {
  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
    paddle.dx = 0;
  }
}

function drawScore() {
  ctx.font = "20px Helvetica";
  ctx.fillStyle = "#fff";
  ctx.fillText("000", 750, 25);
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

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
