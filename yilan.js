const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
let snake = [{ x: 160, y: 160 }];
let dx = gridSize;
let dy = 0;
let food = randomPosition();
let gameInterval = setInterval(update, 100);

function update() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = randomPosition();
  } else {
    snake.pop();
  }

  if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height || checkCollision()) {
    alert("Oyun Bitti!");
    clearInterval(gameInterval);
    location.reload();
  }

  draw();
}

function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "lime";
  snake.forEach(part => ctx.fillRect(part.x, part.y, gridSize, gridSize));

  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function checkCollision() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
  }
  return false;
}

function randomPosition() {
  const x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
  const y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
  return { x, y };
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && dy === 0) { dx = 0; dy = -gridSize; }
  else if (e.key === "ArrowDown" && dy === 0) { dx = 0; dy = gridSize; }
  else if (e.key === "ArrowLeft" && dx === 0) { dx = -gridSize; dy = 0; }
  else if (e.key === "ArrowRight" && dx === 0) { dx = gridSize; dy = 0; }
});
