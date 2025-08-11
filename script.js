const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const columns = Math.floor(canvas.width / 20);
const matrix = 'abcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()*&^%+-/~{[|]}';

const lineLength = 15;   // number of chars per column
const charHeight = 20;   // vertical spacing

// For each column, track:
// - position: the Y position of the *bottom* of the line (starts off-screen)
// - active: whether column is currently falling
// - delayTimer: countdown before the column starts falling (ms)
const columnData = Array(columns).fill().map(() => ({
  position: -lineLength * charHeight,
  active: false,
  delayTimer: Math.random() * 3000  // random delay up to 3 seconds
}));

function randomChar() {
  return matrix[Math.floor(Math.random() * matrix.length)];
}

function drawMatrix() {
  // Clear full canvas with solid background
  ctx.fillStyle = '#191919';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#6ac954';
  ctx.font = '15px monospace';

  columnData.forEach((col, i) => {
    if (!col.active) {
      // Count down delay timer if not active
      col.delayTimer -= 70;  // matches the animation frame delay (ms)
      if (col.delayTimer <= 0) {
        col.active = true;
        col.position = 0;
      }
    } else {
      // Draw 15 characters stacked *upwards* from current position
      for (let j = 0; j < lineLength; j++) {
        const y = col.position - j * charHeight;
        if (y > 0 && y < canvas.height) {
          ctx.fillText(randomChar(), i * 20, y);
        }
      }

      // Move column down by one character height per frame
      col.position += charHeight;

      // When the whole column is off screen, deactivate and reset delay timer
      if (col.position - lineLength * charHeight > canvas.height) {
        col.active = false;
        col.delayTimer = 1000 + Math.random() * 3000;  // random delay 1-4 seconds
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
