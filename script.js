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

const normalGreen = '#6ac954';       // normal green color for top 14 chars
const lighterGreen = '#a3d87f';      // lighter green for bottom char

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
    position: Math.random() * canvas.height,
    chars: chars,
  };
});

function drawMatrix() {
  ctx.fillStyle = '#191919';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = '15px monospace';

  columnData.forEach((col) => {
    for (let j = 0; j < lineLength; j++) {
      const y = col.position + j * charHeight;  // <-- add to move downward
      if (y > 0 && y < canvas.height) {
        ctx.fillStyle = (j === lineLength - 1) ? lighterGreen : normalGreen;
        ctx.fillText(col.chars[j], col.x, y);
      }
    }

    const newChar = randomChar();
    col.chars.unshift(newChar);
    col.chars.pop();

    col.position += charHeight;

    if (col.position + (lineLength - 1) * charHeight > canvas.height) {  // <-- updated reset check
      col.position = 0;
      col.chars = Array(lineLength).fill().map(() => randomChar());
      // keep same x position on reset
    }
  });
}

function animate() {
  drawMatrix();
  setTimeout(animate, 70);
}

animate();
