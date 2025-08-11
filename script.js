const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const maxColumns = 30; // limit total columns drawn

const columnWidth = 20; // keep default spacing
const columns = Math.min(Math.floor(canvas.width / columnWidth), maxColumns);

const matrix = 'abcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()*&^%+-/~{[|]}';

const lineLength = 15;
const charHeight = 20;

const columnData = Array(columns).fill().map(() => ({
  position: Math.random() * canvas.height,
  chars: Array(lineLength).fill().map(() => randomChar()),
}));

function randomChar() {
  return matrix[Math.floor(Math.random() * matrix.length)];
}

function drawMatrix() {
  ctx.fillStyle = '#191919';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = '15px monospace';
  ctx.fillStyle = '#6ac954';

  columnData.forEach((col, i) => {
    for (let j = 0; j < lineLength; j++) {
      const y = col.position - j * charHeight;
      if (y > 0 && y < canvas.height) {
        ctx.fillText(col.chars[j], i * columnWidth, y);
      }
    }

    col.position += charHeight;

    if (col.position - (lineLength - 1) * charHeight > canvas.height) {
      col.position = 0;
      col.chars = Array(lineLength).fill().map(() => randomChar());
    }
  });
}

function animate() {
  drawMatrix();
  setTimeout(animate, 70);
}

animate();
