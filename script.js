const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const columns = Math.floor(canvas.width / 20);
const matrix = 'abcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()*&^%+-/~{[|]}';

const lineLength = 15;
const charHeight = 20;

// Each column data: position of bottom char, chars array, active flag, initial delay
const columnData = Array(columns).fill().map(() => ({
  position: Math.random() * canvas.height,  // start at random vertical pos for natural stagger
  chars: Array(lineLength).fill().map(() => randomChar()),
}));

function randomChar() {
  return matrix[Math.floor(Math.random() * matrix.length)];
}

function drawMatrix() {
  // Clear background
  ctx.fillStyle = '#191919';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = '15px monospace';
  ctx.fillStyle = '#6ac954';

  columnData.forEach((col, i) => {
    // Draw all 15 chars stacked upwards from col.position
    for (let j = 0; j < lineLength; j++) {
      const y = col.position - j * charHeight;
      if (y > 0 && y < canvas.height) {
        ctx.fillText(col.chars[j], i * 20, y);
      }
    }

    // Move the line down by one char height per frame
    col.position += charHeight;

    // Wrap back to top when bottom passes canvas height
    if (col.position > canvas.height) {
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
