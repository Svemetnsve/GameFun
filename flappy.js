const canvas = document.getElementById("flappyCanvas");
const ctx = canvas.getContext("2d");

// Oyun değişkenleri
let birdY, birdVelocity, gravity, lift;
let pipes, frame;
let isGameOver = false;

// Başlat
function resetGame() {
  birdY = 150;
  birdVelocity = 0;
  gravity = 0.5;
  lift = -8;

  pipes = [];
  frame = 0;
  isGameOver = false;

  update();
}

// Kuşu çiz
function drawBird() {
  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.arc(80, birdY, 15, 0, Math.PI * 2);
  ctx.fill();
}

// Boruyu çiz
function drawPipe(pipe) {
  ctx.fillStyle = "green";
  ctx.fillRect(pipe.x, 0, 50, pipe.top);
  ctx.fillRect(pipe.x, pipe.top + pipe.gap, 50, canvas.height - pipe.top - pipe.gap);
}

// Oyun döngüsü
function update() {
  if (isGameOver) return;

  frame++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  birdVelocity += gravity;
  birdY += birdVelocity;

  if (frame % 90 === 0) {
    const top = Math.random() * 200 + 50;
    pipes.push({ x: canvas.width, top: top, gap: 120 });
  }

  for (let i = 0; i < pipes.length; i++) {
    pipes[i].x -= 2;
    drawPipe(pipes[i]);

    // Çarpışma kontrolü
    if (
      80 + 15 > pipes[i].x && 80 - 15 < pipes[i].x + 50 &&
      (birdY - 15 < pipes[i].top || birdY + 15 > pipes[i].top + pipes[i].gap)
    ) {
      gameOver();
      return;
    }
  }

  drawBird();

  // Aşağıya veya yukarıya çarptıysa
  if (birdY + 15 > canvas.height || birdY - 15 < 0) {
    gameOver();
    return;
  }

  requestAnimationFrame(update);
}

// Oyun bittiğinde
function gameOver() {
  isGameOver = true;
  ctx.fillStyle = "red";
  ctx.font = "30px Arial";
  ctx.fillText("Oyun Bitti!", 120, 250);
  ctx.font = "20px Arial";
  ctx.fillText("Yeniden başlamak için Space'e bas", 40, 290);
}

// Tuş / Fare kontrolleri
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    if (isGameOver) {
      resetGame();
    } else {
      birdVelocity = lift;
    }
  }
});

document.addEventListener("click", () => {
  if (isGameOver) {
    resetGame();
  } else {
    birdVelocity = lift;
  }
});

// İlk çalıştırma
resetGame();
