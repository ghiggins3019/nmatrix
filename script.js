const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const columns = Math.floor(canvas.width / 20);
const charSet = 'abcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()*&^%+-/~{[|`]}';

// Each column holds an array of 15 characters (initially empty)
const columnData = Array(columns).fill().map(() => ({
  yPositions: Array(15).fill(-20), // Start off-canvas above
  chars: Array(15).fill(' '),
}));

const lineLength = 15;
const charHeight = 20; // vertical spacing

// Function to generate a random character from charSet
function randomChar() {
  return charSet[Math.floor(Math.random() * charSet.length)];
}

function drawMatrix() {
  // Clear entire canvas to solid #191919
  ctx.fillStyle = '#191919';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = '15px monospace';

  columnData.forEach((column, colIndex) => {
    // Shift characters down by charHeight
    for (let i = lineLength - 1; i > 0; i--) {
      column.chars[i] = column.chars[i - 1];
      column.yPositions[i] = column.yPositions[i - 1];
    }
    // New top character starts above visible area (-20)
    column.chars[0] = randomChar();
    column.yPositions[0] = column.yPositions[1] !== undefined ? column.yPositions[1] - charHeight : -charHeight;

    // Move all y positions down by 1 pixel per frame to animate smooth fall
    for (let i = 0; i < lineLength; i++) {
      column.yPositions[i] += 1;
    }

    // Draw each character with fading alpha from fully opaque (top) to nearly invisible (bottom)
    for (let i = 0; i < lineLength; i++) {
      const alpha = 1 - i / (lineLength - 1); // 1 down to 0
      // Multiply alpha by a max opacity factor so last char is very transparent but visible
      const maxAlpha = 0.8;
      ctx.fillStyle = `rgba(106, 201, 84, ${alpha * maxAlpha})`; // green with fading alpha

      const x = colIndex * 20;
      const y = column.yPositions[i];

      // Only draw characters inside canvas bounds
      if (y > 0 && y < canvas.height + charHeight) {
        ctx.fillText(column.chars[i], x, y);
      }
    }

    // Reset column when bottom character goes off the screen
    if (column.yPositions[lineLength - 1] > canvas.height + charHeight) {
      column.yPositions.fill(-charHeight * lineLength);
    }
  });
}

function animate() {
  drawMatrix();
  requestAnimationFrame(animate);
}

animate();
