const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const columnWidth = 20;       // fixed horizontal grid spacing
const maxColumns = 30;        // max number of columns you want to show

const totalColumns = Math.floor(canvas.width / columnWidth);
const columnsToDraw = Math.min(maxColumns, totalColumns);

const matrix = 'abcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()*&^%+-/~{[|]}';

const lineLength = 15;
const charHeight = 20;

function randomChar() {
  return matrix[Math.floor(Math.random() * matrix.length)];
}

// To avoid overlaps, randomly select unique column indices first
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
  ctx.fillStyle = '#6ac954';

  columnData.forEach((col) => {
    for (let j = 0; j < lineLength; j++) {
      const y = col.position - j * charHeight;
      if (y > 0 && y < canvas.height) {
        ctx.fillText(col.chars[j], col.x, y);
      }
    }

    const newChar = randomChar();
    col.chars.unshift(newChar);
    col.chars.pop();

    col.position += charHeight;

    if (col.position - (lineLength - 1) * charHeight > canvas.height) {
      col.position = 0;
      col.chars = Array(lineLength).fill().map(() => randomChar());

      // Optional: Assign a new column index on reset, still unique among all columns
      // For simplicity, keep the same x for now; if you want, implement reassign below:
      // const usedIndices = columnData.map(c => c.x / columnWidth);
      // let availableIndices = [...Array(totalColumns).keys()].filter(i => !usedIndices.includes(i));
      // if (availableIndices.length) {
      //   const newIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
      //   col.x = newIndex * columnWidth;
      // }
    }
  });
}

function animate() {
  drawMatrix();
  setTimeout(animate, 70);
}

animate();
