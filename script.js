const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

const canvasWidth = 600;  // Set desired width here
const canvasHeight = window.innerHeight;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

// Color variables for easy changes
const normalGreen = '#04796a';
const lightGreen = '#0d9180';

const maxColumns = 20;
const matrix = 'abcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()*&^%+-/~{[|]}';

// Column length for normal columns
const lineLength = 10;
const charHeight = 20;

const possibleCols = Math.floor(canvasWidth / charHeight); // Use canvasWidth here

function randomChar() {
  return matrix[Math.floor(Math.random() * matrix.length)];
}

function randomColumnX() {
  const slot = Math.floor(Math.random() * possibleCols);
  const jitter = Math.random() * (charHeight / 2) - (charHeight / 4);
  return slot * charHeight + jitter;
}

// Create normal columns
const normalColumns = Array(maxColumns).fill().map(() => {
  const chars = Array(lineLength).fill().map(() => randomChar());
  return {
    x: randomColumnX(),
    position: Math.random() * canvasHeight,
    chars: chars
  };
});

// Create light columns that follow normal columns
const lightColumns = normalColumns.map(col => {
  return {
    x: col.x,
    position: col.position,
    chars: [col.chars[0]]
  };
});

function drawMatrix() {
  ctx.fillStyle = '#191919';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  ctx.font = '15px monospace';

  // Draw normal columns
  ctx.fillStyle = normalGreen;
  normalColumns.forEach((col, i) => {
    for (let j = 0; j < lineLength; j++) {
      const y = col.position - j * charHeight;
      if (y > 0 && y < canvasHeight) {
        ctx.fillText(col.chars[j], col.x, y);
      }
    }

    // Shift characters
    const newChar = randomChar();
    col.chars.unshift(newChar);
    col.chars.pop();

    // Move down
    col.position += charHeight;

    // Reset when fully off screen
    if (col.position - (lineLength - 1) * charHeight > canvasHeight) {
      col.position = 0;
      col.chars = Array(lineLength).fill().map(() => randomChar());
      col.x = randomColumnX();
    }

    // Sync the light column with the normal one
    lightColumns[i].x = col.x;
    lightColumns[i].position = col.position;
    lightColumns[i].chars[0] = col.chars[0];
  });

  // Draw light columns
  ctx.fillStyle = lightGreen;
  lightColumns.forEach(col => {
    const y = col.position;
    if (y > 0 && y < canvasHeight) {
      ctx.fillText(col.chars[0], col.x, y);
    }
  });
}

function animate() {
  drawMatrix();
  setTimeout(animate, 100);
}

animate();
