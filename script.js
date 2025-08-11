const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const columns = Math.floor(canvas.width / 20);
const charSet = 'abcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()*&^%+-/~{[|`]}';

const lineLength = 15;
const charHeight = 20; // vertical spacing

// Each column holds an array of 15 characters and their y-positions spaced out vertically
const columnData = Array(columns).fill().map(() => {
  // Initialize y positions so the 15 chars are stacked vertically with spacing:
  const yPositions = Array(lineLength).fill(0).map((_, i) => i * charHeight);
  // Random chars for start
  const chars = Array(lineLength).fill(0).map(() => randomChar());
  return { yPositions, chars };
});

function randomChar() {
  return charSet[Math.floor(Math.random() * charSet.length)];
}

function drawMatrix() {
  // Clear the whole canvas to #191919 background
  ctx.fillStyle = '#191919';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = '15px monospace';

  columnData.forEach((column, colIndex) => {
    // Move all y positions down by speed pixels per frame
    const speed = 2; // Adjust speed here
    for (let i = 0; i < lineLength; i++) {
      column.yPositions[i] += speed;
    }

    // When bottom char is below canvas, reset column yPositions to start from top again
    if (column.yPositions[lineLength - 1] > canvas.height + charHeight) {
      for (let i = 0; i < lineLength; i++) {
        column.yPositions[i] = i * charHeight - lineLength * charHeight;
        column.chars[i] = randomChar();
      }
    }

    // Shift characters down by one position randomly to simulate new chars flowing
    if (Math.random() > 0.98) {
      for (let i = lineLength - 1; i > 0; i--) {
        column.chars[i] = column.chars[i - 1];
      }
      column.chars[0] = randomChar();
    }

    // Draw characters with fading alpha from top (opaque) to bottom (transparent)
    for (let i = 0; i < lineLength; i++) {
      const alpha = 1 - i / (lineLength - 1);
      const maxAlpha = 0.8;
      ctx.fillStyle = `rgba(106, 201, 84, ${alpha * maxAlpha})`;

      const x = colIndex * 20;
      const y = column.yPositions[i];

      // Only draw if visible on canvas
      if (y > 0 && y < canvas.height + charHeight) {
        ctx.fillText(column.chars[i], x, y);
      }
    }
  });
}

function animate() {
  drawMatrix();
  requestAnimationFrame(animate);
}

animate();
