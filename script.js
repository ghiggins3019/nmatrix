const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const columnWidth = 20;
const maxColumns = 50;

const totalColumns = Math.floor(canvas.width / columnWidth);
const columnsToDraw = Math.min(maxColumns, totalColumns);

const matrix = 'abcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()*&^%+-/~{[|]}';

const lineLength = 15;
const charHeight = 20;

const normalGreen = '#6ac954';

// Get unique random column indices (no overlap)
function getUniqueRandomIndices(total, count) {
  const indices = [];
  while (indices.length < count) {
    const randIndex = Math.floor(Math.random() * total);
    if (!indices.includes(randIndex)) {
      indices.push(randIndex);
    }
  }
  return indices;
}

function randomChar() {
  return matrix[Math.floor(Math.random() * matrix.length)];
}

// Initialize columns with random start vertical position (somewhere above screen to negative values)
const columnIndices = getUniqueRandomIndices(totalColumns, columnsToDraw);

const columnData = columnIndices.map(colIndex => {
  const chars = Array(lineLength).fill().map(() => randomChar());
  // Start position somewhere above screen (negative between -lineLength*charHeight and 0)
  const startPosition = -Math.random() * lineLength * charHeight;
  return {
    x: colIndex * columnWidth,
    position: startPosition,
    chars: chars,
    scrollAccumulator: 0 // Tracks how much we've scrolled to decide when to shift chars
  };
});

function drawMatrix() {
  // Clear screen
  ctx.fillStyle = '#191919';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = '15px monospace';
  ctx.fillStyle = normalGreen;

  const scrollSpeed = 2; // pixels per frame; smaller = slower scrolling

  columnData.forEach(col => {
    // Draw all chars in the column at their current positions
    for (let j = 0; j < lineLength; j++) {
      const y = col.position + j * charHeight;
      if (y >= 0 && y <= canvas.height) {
        ctx.fillText(col.chars[j], col.x, y);
      }
    }

    // Update scroll accumulator
    col.scrollAccumulator += scrollSpeed;

    // If we've scrolled a full character height, update the char trail
    if (col.scrollAccumulator >= charHeight) {
      col.scrollAccumulator -= charHeight;
      col.chars.pop();            // remove last char
      col.chars.unshift(randomChar()); // add new random char at top
    }

    // Move whole column down smoothly
    col.position += scrollSpeed;

    // If the whole column is fully off screen (past canvas height + length), reset above screen
    if (col.position > canvas.height) {
      col.position = -lineLength * charHeight;
      col.chars = Array(lineLength).fill().map(() => randomChar());
      col.scrollAccumulator = 0;
    }
  });
}

function animate() {
  drawMatrix();
  requestAnimationFrame(animate);
}

animate();
