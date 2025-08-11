const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const columns = Math.floor(canvas.width / 20);
const matrix = 'abcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()*&^%+-/~{[|]}';

const lineLength = 15;
const charHeight = 20;

const columnData = Array(columns).fill().map(() => ({
  position: -lineLength * charHeight,
  active: false,
  initialDelay: Math.random() * 3000,  // initial random delay once
  delayTimer: 0,                       // no delay after first run
  chars: Array(lineLength).fill().map(() => randomChar())
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
    if (!col.active) {
      if (col.initialDelay > 0) {
        col.initialDelay -= 70;
      } else {
        col.active = true;
        col.position = 0;
        col.chars = Array(lineLength).fill().map(() => randomChar());
      }
    } else {
      for (let j = 0; j < lineLength; j++) {
        const y = col.position - j * charHeight;
        if (y > 0 && y < canvas.height) {
          ctx.fillText(col.chars[j], i * 20, y);
        }
      }

      col.position += charHeight;

      if (col.position - lineLength * charHeight > canvas.height) {
        // Immediately restart with no delay
        col.position = -lineLength * charHeight;
        col.chars = Array(lineLength).fill().map(() => randomChar());
        col.active = true; // already active, keep it active
      }
    }
  });
}

function animate() {
  drawMatrix();
  setTimeout(animate, 70);
}

animate();
