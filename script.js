const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const maxColumns = 20;
const matrix = 'abcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()*&^%+-/~{[|]}';

const lineLength = 10;
const charHeight = 20;

function randomChar() {
  return matrix[Math.floor(Math.random() * matrix.length)];
}

const columnData = Array(maxColumns).fill().map(() => {
  // Initialize with random chars for full line
  const chars = Array(lineLength).fill().map(() => randomChar());
  return {
    x: Math.random() * canvas.width,
    position: Math.random() * canvas.height,
    chars: chars,
  };
});

function drawMatrix() {
  ctx.fillStyle = '#191919';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = '15px monospace';
  ctx.fillStyle = '#6ac954';

  columnData.forEach((col) => {
    // Draw chars from top (chars[0]) down to bottom (chars[14])
    for (let j = 0; j < lineLength; j++) {
      const y = col.position - j * charHeight;
      if (y > 0 && y < canvas.height) {
        ctx.fillText(col.chars[j], col.x, y);
      }
    }

    // Each frame, generate a new leading char and push it to front
    const newChar = randomChar();
    col.chars.unshift(newChar);  // add new char at front
    col.chars.pop();             // remove last to keep length fixed

    // Move the line down
    col.position += charHeight;

    // Reset when the whole line is off-screen
    if (col.position - (lineLength - 1) * charHeight > canvas.height) {
      col.position = 0;
      // Re-initialize the chars to random sequence on reset
      col.chars = Array(lineLength).fill().map(() => randomChar());
      // Optional: randomize horizontal position again
      col.x = Math.random() * canvas.width;
    }
  });
}

function animate() {
  drawMatrix();
  setTimeout(animate, 70);
}

animate();
