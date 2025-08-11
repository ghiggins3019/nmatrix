const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const columns = Math.floor(canvas.width / 20); // Number of columns
const matrix = 'abcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()*&^%+-/~{[|`]}'; // Characters to be displayed

// Create an array of column positions
const columnPositions = Array(columns).fill(0);

// Function to draw the matrix effect
function drawMatrix() {
    // Set a semi-transparent black background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set the text color to green
    ctx.fillStyle = '#6ac954';
    ctx.font = '15px monospace';

    // Iterate over each column
    columnPositions.forEach((position, index) => {
        // Generate a random character
        const char = matrix[Math.floor(Math.random() * matrix.length)];

        // Display the character at the current position
        ctx.fillText(char, index * 20, position);

        // Move the position down
        columnPositions[index] += 20;

        // Reset the position if it exceeds the canvas height
        if (columnPositions[index] > canvas.height && Math.random() > 0.975) {
            columnPositions[index] = 0;
        }
    });
}

// Function to continuously update and render the animation
function animate() {
    drawMatrix();
    setTimeout(animate, 500); // Adjust the delay (in milliseconds) for desired speed
}

// Start the animation
animate();

