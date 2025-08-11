const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const columns = Math.floor(canvas.width / 20);
const matrix = 'abcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()*&^%+-/~{[|]}';

const lineLength = 15;
const charHeight = 20;

// For each column:
// - headY: current floating vertical position of the head character (pixels)
// - chars: array of last 15 characters for the column
// - speed: how many pixels to move headY per frame
const columnsData = Array(columns).fill().map(() => ({
  headY: Math.random() * -lineLength * charHeight, // start randomly above screen
  chars: Array(lineLength).fill(' ').map(() => randomChar()),
  speed: 1 + Math.random() * 1.5 // speed between 1 and 2.5 pixels/frame
}));

function randomChar() {
  return matrix[Math.floor(Math.random() * matrix.length)];
}

function drawMatrix() {
  ctx.fillStyle = '#191919'; // solid background
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = '15px monospace';
  ctx.fillStyle = '#6ac954'; // solid green text

  columnsData.forEach((col, colIndex) => {
    // Move head position by speed
    col.headY += col.speed;

    // If headY has moved down by at least one charHeight,
    // shift chars down, add new char at top, and reset headY offset
    if (col.headY >= charHeight) {
      col.headY -= charHeight;
      col.chars.pop();           // remove last char (bottom)
      col.chars.unshift(randomChar()); // add new char at top
    }

    // Draw the 15 chars stacked upward from headY position
    for (let i = 0; i < lineLength; i++) {
      const x = colIndex * 20;
      const y = col.headY - i * charHeight;
      if (y > 0 && y < canvas.height + charHeight) {
        ctx.fillText(col.chars[i], x, y);
      }
    }
  });
}

function animate() {
  drawMatrix();
  requestAnimationFrame(animate);
}

animate();
