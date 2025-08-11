const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const columns = Math.floor(canvas.width / 20);
const matrix = 'abcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()*&^%+-/~{[|]}';

const lineLength = 15;
const charHeight = 20;

// For each column, store:
// - position: y coordinate of the bottom character of the 15-char line
// - active: whether it's currently falling
// - delayTimer: how long to wait before starting (ms)
// - chars: the array of 15 characters in the column
const columnData = Array(columns).fill().map(() => ({
  position: -lineLength * charHeight,
  active: false,
  delayTimer: Math.random() * 3000,  // up to 3 seconds delay
  chars: Array(lineLength).fill().map(() => randomChar())
}));

function randomChar() {
  return matrix[Math.floor(Math.random() * matrix.length)];
}

function drawMatrix() {
  // Clear canvas to solid background
  ctx.fillStyle = '#191919';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = '15px monospace';
  ctx.fillStyle = '#6ac954';

  columnData.forEach((col, i) => {
    if (!col.active) {
      col.delayTimer -= 70;
      if (col.delayTimer <= 0) {
        col.active = true;
        col.position = 0;
        // Refresh chars to start fresh
        col.chars = Array(lineLength).fill().map(() => randomChar());
      }
    } else {
      // Draw all 15 characters stacked upwards from col.position
      for (let j = 0; j < lineLength; j++) {
        const y = col.position - j * charHeight;
        if (y > 0 && y < canvas.height) {
          ctx.fillText(col.chars[j], i * 20, y);
        }
      }

      // Move down by one character height each frame
      col.position += charHeight;

      // Once the entire column has moved off screen, deactivate and reset delay
      if (col.position - lineLength * charHeight > canvas.height) {
        col.active = false;
        col.delayTimer = 1000 + Math.random() * 3000; // 1-4 seconds delay
        col.position = -lineLength * charHeight;
      }
    }
  });
}

function animate() {
  drawMatrix();
  setTimeout(animate, 70);
}

animate();
