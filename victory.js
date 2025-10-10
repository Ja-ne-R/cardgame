// function createMovingBall(canvas, color = "#0095DD", radius = 20, trailLength = 20, speedX = 2, speedY = -2) {
//     const ctx = canvas.getContext("2d");
//     let x = canvas.width / 2;
//     let y = canvas.height / 2;
//     let dx = speedX;
//     let dy = speedY;
//     const positions = [];
//     let hitWall = false;

//     function drawBall(pos) {
//         ctx.beginPath();
//         ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
//         ctx.fillStyle = color;
//         ctx.fill();
//         ctx.closePath();
//     }

//     function update() {
//         positions.push({ x, y });
//         if (positions.length > trailLength) {
//             positions.shift();
//         }
//         hitWall = false;
//         if (x + dx > canvas.width - radius || x + dx < radius) {
//             dx = -dx;
//             hitWall = true;
//         }
//         if (y + dy > canvas.height - radius || y + dy < radius) {
//             dy = -dy;
//             hitWall = true;
//         }
//         x += dx;
//         y += dy;
//     }

//     function render() {
//         for (const pos of positions) {
//             drawBall(pos);
//         }
//     }

//     function didHitWall() {
//         return hitWall;
//     }

//     return { update, render, didHitWall };
// }

// // Usage example:
// const canvas = document.querySelector("canvas");
// const balls = [
//     createMovingBall(canvas, "#0095DD", 20, 20, 2, -2)
// ];

// function getRandomColor() {
//     return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, "0");
// }
// x = 0;
// function animateAll() {
//     const ctx = canvas.getContext("2d");
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     balls.forEach(ball => {
//         ball.update();
//         ball.render();
//         if (ball.didHitWall()) {

//                 // balls.shift(); // Remove the oldest ball if more than 10
//             while (x <= 3){
//             // Add a new ball with random color and random speed
//             balls.push(createMovingBall(
//                 canvas,
//                 getRandomColor(),
//                 20,
//                 20,
//                 (Math.random() - 0.5) * 6,
//                 (Math.random() - 0.5) * 6,
//                         x++
//             ));}
            
//         }

//     });
// }

// // function removeLastBall() {
// //     if (balls.length > 0) {
// //         balls.pop();
// //     }
// // }

// setInterval(animateAll, 10);

// ----------------------------------------

// window.onload = startup;

// var ballX = 400;
// var ballY = 400;
// var mouseX = 0;
// var mouseY = 0;

// function startup() {

//     document.getElementById("canvas").onmousemove = mouseMove;

//     loop();
// }

// //use `requestAnimationFrame` for the game loop
// //so you stay sync with the browsers rendering
// //makes it a smoother animation
// function loop() {
//     moveBall();
//     requestAnimationFrame(loop);
// }

// function mouseMove(evt) {
//     mouseX = evt.clientX;
//     mouseY = evt.clientY;
// }

// function moveBall() {
//     //get the distance between the mouse and the ball on both axes
//     //walk only the an eight of the distance to create a smooth fadeout
//     var dx = (mouseX - ballX) * .125;
//     var dy = (mouseY - ballY) * .125;
//     //calculate the distance this would move ...
//     var distance = Math.sqrt(dx * dx + dy * dy);
//     //... and cap it at 5px
//     if (distance > 5) {
//         dx *= 5 / distance;
//         dy *= 5 / distance;
//     }

//     //now move
//     ballX += dx;
//     ballY += dy;

//     var canvas = document.getElementById("canvas");
//     var ctx = canvas.getContext("2d");

//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     ctx.beginPath();
//     ctx.arc(ballX, ballY, 40, 0, 2 * Math.PI);
//     ctx.fillStyle = "green";
//     ctx.fill();
//     ctx.lineWidth = 5;
//     ctx.strokeStyle = "red";
//     ctx.stroke();
// }



// ------------------------------

// var cursor = document.getElementById("cursor");
// document.body.addEventListener("mousemove", function (e) {
//     cursor.style.left = e.clientX + "px";
//         cursor.style.top = e.clientY + "px";
// });

// -----------------------

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const sound = new Audio('ballsound.mp3');
const pop = new Audio('pop.mp3');
const chooseRandomSound = () => {
    const sounds = ['ballsound.mp3', 'pop.mp3'];
    const randomIndex = Math.floor(Math.random() * sounds.length);
    return new Audio(sounds[randomIndex]);
}
sound.volume = 0.2;


class Ball {
    constructor(x, y, radius, color) {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);

        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = "#" + randomColor;
        this.dx = (Math.random() - 0.5) * 4;
        this.dy = (Math.random() - 0.5) * 4;
    } 
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();

        this.x += this.dx;
        this.y += this.dy;
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
            sound.currentTime = 0;
            sound.volume = 0.2;
            chooseRandomSound().play();
            checkIt();

            if (k == 20) {
                return;
            }
            else {
                k++;
            }
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
            sound.currentTime = 0;
            sound.volume = 0.2;
            chooseRandomSound().play();
        }

        // Check for collision with rectangle
        if (this.x + this.radius > 200 && this.x - this.radius < 350 &&
            this.y + this.radius > 10 && this.y - this.radius < 110) {
            this.dx = -this.dx;
            this.dy = -this.dy;
            sound.currentTime = 0;
            sound.volume = 0.2;
            chooseRandomSound().play();
            this.color = "#" + Math.floor(Math.random() * 16777215).toString(16);

            // Remove THIS ball after 500ms
            setTimeout(() => {
                const index = balls.indexOf(this);
                if (index !== -1) {
                    balls.splice(index, 1);
                    pop.currentTime = 0;
                    pop.play();
                }
            }, 500);
        }

    }

    }
k = 3;
balls = []
balls.push(new Ball(45, 10, 7, 1, 1))
balls.push(new Ball(9, 4, 3, -2, -2))
balls.push(new Ball(50, 20, 14, 0.5, 0.5))

function checkIt(){
while (balls.length < k) {
    const ranx = Math.floor(Math.random() * canvas.width);
    const rany = Math.floor(Math.random() * canvas.height);
    const ranradius = Math.floor(Math.random() * 20) + 5;
    balls.push(new Ball(ranx, rany, ranradius));

}}

function repeatme() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(ball => ball.draw());
    drawRectangle(); // <-- Draw the rectangle every frame
    window.requestAnimationFrame(repeatme);
}

repeatme();



function drawRectangle() {
    ctx.beginPath();
    ctx.rect(200, 10, 150, 100);
    ctx.stroke();
    ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
    ctx.fill();
    ctx.closePath();
}


// -------------------------

const audio = new Audio('relaxing-guitar-loop-v5-245859.mp3');
audio.loop = true;


document.getElementById("balling").onclick = function() {
    audio.play();
}
audio.play();


document.body.addEventListener("DOMContentLoaded", checkIt());