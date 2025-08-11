const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Color variables for easy changes
const normalGreen = '#6ac954';
const lightGreen = '#b6ffb0';

const maxColumns = 20;
const matrix = 'abcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()*&^%+-/~{[|]}';

// Column length for normal columns
const lineLength = 10;
const charHeight = 20;

function randomChar() {
  return matrix[Math.floor(Math.random() * matrix.length)];
}

// Create normal columns
const normalColumns = Array(maxColumns).fill().map(() => {
  const chars = Array(lineLength).fill().map(() => randomChar());
  return {
    x: Math.random() * canvas.width,
    position: Math.random() * canvas.height,
    chars: chars
  };
});

// Create light columns that follow normal columns
// Each light column has exactly 1 char and shares x & position with its normal column
const lightColumns = normalColumns.map(col => {
  return {
    x: col.x,
    position: col.position,
    chars: [col.chars[0]] // Start with the same leading char
  };
});

function drawMatrix() {
  ctx.fillStyle = '#191919';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = '15px monospace';

  // Draw normal columns
  ctx.fillStyle = normalGreen;
  normalColumns.forEach((col, i) => {
    for (let j = 0; j < lineLength; j++) {
      const y = col.position - j * charHeight;
      if (y > 0 && y < canvas.height) {
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
    if (col.position - (lineLength - 1) * charHeight > canvas.height) {
      col.position = 0;
      col.chars = Array(lineLength).fill().map(() => randomChar());
      col.x = Math.random() * canvas.width;
    }

    // Sync the light column with the normal one
    lightColumns[i].x = col.x;
    lightColumns[i].position = col.position;
    lightColumns[i].chars[0] = col.chars[0]; // always match the current leading char
  });

  // Draw light columns last so they appear on top
  ctx.fillStyle = lightGreen;
  lightColumns.forEach(col => {
    const y = col.position;
    if (y > 0 && y < canvas.height) {
      ctx.fillText(col.chars[0], col.x, y);
    }
  });
}

function animate() {
  drawMatrix();
  setTimeout(animate, 100);
}

animate();
