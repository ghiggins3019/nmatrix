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

const normalGreen = '#6ac954';  // single green color for all chars

function randomChar() {
  return matrix[Math.floor(Math.random() * matrix.length)];
}

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

const columnIndices = getUniqueRandomIndices(totalColumns, columnsToDraw);

const columnData = columnIndices.map(colIndex => {
  const chars = Array(lineLength).fill().map(() => randomChar());
  return {
    x: colIndex * columnWidth,
    position: Math.random() * canvas.height,  // random vertical start position
    chars: chars,
  };
});

function drawMatrix() {
  ctx.fillStyle = '#191919';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = '15px monospace';
  ctx.fillStyle = normalGreen;

  columnData.forEach((col) => {
    for (let j = 0; j < lineLength; j++) {
      const y = col.position + j * charHeight;  // characters drawn downward
      if (y > 0 && y < canvas.height) {
        ctx.fillText(col.chars[j], col.x, y);
      }
    }

    // Update top character, push into trail
    const newChar = randomChar();
    col.chars.unshift(newChar);
    col.chars.pop();

    // Move column down
    col.position += charHeight;

    // Reset column when bottom character moves off screen
    if (col.position + (lineLength - 1) * charHeight > canvas.height) {
      col.position = 0;
      col.chars = Array(lineLength).fill().map(() => randomChar());
    }
  });
}

function animate() {
  drawMatrix();
  setTimeout(animate, 70);
}

animate();
