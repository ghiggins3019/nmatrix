const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const maxColumns = 20;  // how many columns total
const matrix = 'abcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()*&^%+-/~{[|]}';

const lineLength = 15;
const charHeight = 20;

function randomChar() {
  return matrix[Math.floor(Math.random() * matrix.length)];
}

// Generate columns with random horizontal positions
const columnData = Array(maxColumns).fill().map(() => ({
  x: Math.random() * canvas.width,
  position: Math.random() * canvas.height,
  chars: Array(lineLength).fill().map(() => randomChar()),
}));

function drawMatrix() {
  ctx.fillStyle = '#191919';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = '15px monospace';
  ctx.fillStyle = '#6ac954';

  columnData.forEach((col) => {
    for (let j = 0; j < lineLength; j++) {
      const y = col.position - j * charHeight;
      if (y > 0 && y < canvas.height) {
        ctx.fillText(col.chars[j], col.x, y);
      }
    }

    col.position += charHeight;

    if (col.position - (lineLength - 1) * charHeight > canvas.height) {
      col.position = 0;
      col.chars = Array(lineLength).fill().map(() => randomChar());
      col.x = Math.random() * canvas.width; // Optional: randomize horizontal position on reset too
    }
  });
}

function animate() {
  drawMatrix();
  setTimeout(animate, 70);
}

animate();
