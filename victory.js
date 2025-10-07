function createMovingBall(canvas, color = "#0095DD", radius = 20, trailLength = 20, speedX = 2, speedY = -2) {
    const ctx = canvas.getContext("2d");
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    let dx = speedX;
    let dy = speedY;
    const positions = [];

    function drawBall(pos) {
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        positions.push({ x, y });
        if (positions.length > trailLength) {
            positions.shift();
        }

        for (const pos of positions) {
            drawBall(pos);
        }

        if (x + dx > canvas.width - radius || x + dx < radius) {
            dx = -dx;
            createMovingBall(document.querySelector("canvas"));            
        }
        if (y + dy > canvas.height - radius || y + dy < radius) {
            dy = -dy;
        }
        x += dx;
        y += dy;
    }

    return setInterval(animate, 10);
}



// Usage example:
createMovingBall(document.querySelector("canvas"));