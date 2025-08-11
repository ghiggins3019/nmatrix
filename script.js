const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const columns = Math.floor(canvas.width / 20); // Number of columns
const matrix = 'abcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()*&^%+-/~{[|]}'; // Characters to be displayed

const lineLength = 15;       // Number of characters per column
const charHeight = 20;       // Vertical spacing between chars

// Track head (lowest) position of the line for each column
const columnHeads = Array(columns).fill(-lineLength * charHeight); // start above canvas

function randomChar() {
    return matrix[Math.floor(Math.random() * matrix.length)];
}

function drawMatrix() {
    // Clear canvas to solid background
    ctx.fillStyle = '#191919';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#6ac954';   // solid green text
    ctx.font = '15px monospace';

    for (let col = 0; col < columns; col++) {
        let headY = columnHeads[col];

        // Draw exactly 15 chars stacked *upwards* from headY
        for (let i = 0; i < lineLength; i++) {
            const y = headY - i * charHeight;
            if (y > 0 && y < canvas.height) {
                const char = randomChar();
                ctx.fillText(char, col * 20, y);
            }
        }

        // Move the head down by one character height every frame
        columnHeads[col] += charHeight;

        // When the whole line moves off screen, reset to start again above canvas
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
