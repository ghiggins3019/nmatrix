const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const columns = Math.floor(canvas.width / 20);
const charSet = 'abcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()*&^%+-/~{[|`]}';

const lineLength = 15;
const charHeight = 20;

// For each column, track the vertical position of the head character
const columnHeads = Array(columns).fill(-lineLength * charHeight); // start above screen

function randomChar() {
  return charSet[Math.floor(Math.random() * charSet.length)];
}

function drawMatrix() {
  // Clear entire canvas each frame with dark background
  ctx.fillStyle = '#191919';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#6ac954';
  ctx.font = '15px monospace';

  for (let col = 0; col < columns; col++) {
    let headY = columnHeads[col];

    // Draw 15 characters below the head position
    for (let i = 0; i < lineLength; i++) {
      const y = headY - i * charHeight;
      if (y > 0 && y < canvas.height) {
        const char = randomChar();
        ctx.fillText(char, col * 20, y);
      }
    }

    // Move head down by charHeight pixels each frame
    columnHeads[col] += charHeight;

    // Reset to start above the screen again when the tail disappears
    if (columnHeads[col] - lineLength * charHeight > canvas.height) {
      columnHeads[col] = -lineLength * charHeight;
    }
  }
}

function animate() {
  drawMatrix();
  setTimeout(animate, 70);
}

animate();
