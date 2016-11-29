/**
 * app.js
 * Main application script
 */
"use strict";

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var pongSound = new Audio("/sounds/pong.wav");
var gameOverSound = new Audio("/sounds/game-over.wav");
var gameState;

function resizeCanvas() {
    var docElem = document.documentElement;
    canvas.width = docElem.clientWidth;
    canvas.height = docElem.clientHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas); // Resize Canvas whenever Window is resized

// advance animation one step
function step(timeStamp) {
    var ball = gameState.ball;
    ball.x += ball.vectorX * ball.velocity;
    ball.y += ball.vectorY * ball.velocity;

    // bounce the ball if it hits bottom or top walls
    if(ball.y + ball.radius >= canvas.height || ball.y - ball.radius <= 0) {
        ball.vectorY = -ball.vectorY;
        pongSound.play();
    }

    // bounce the ball if it hits the left or right wall
    if(ball.x + ball.radius >= canvas.width || ball.x - ball.radius <= 0) {
        ball.vectorX = -ball.vectorX
        pongSound.play();
    }

    // bounce if the ball hits a paddle
    var paddle = gameState.paddle;
    if(ball.x - ball.radius <= paddle.x + paddle.width) { // If ball gets past Paddle, end game
        if(ball.y + ball.radius >= paddle.y && ball.y - ball.radius <= paddle.y + paddle.height) {
            ball.vectorX = -ball.vectorX;
            gameState.count++;
            pongSound.play();
        } else {
            gameOverSound.play();
            return false;
        }
    }

    if(timeStamp - ball.lastVelocityIncrease > 10000) {
        ball.lastVelocityIncrease = timeStamp;
        ball.velocity++;
    }

    return true;
}

// render gamestate to canvas context
function render(state) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clears the entire canvas, so that we have a dot not a line
    // Now renders the ball
    ctx.beginPath(); 
    ctx.arc(state.ball.x, state.ball.y, state.ball.radius, 0, Math.PI * 2);
    ctx.fill();
    // Now renders the paddle
    ctx.fillRect(state.paddle.x, state.paddle.y, state.paddle.width, canvas.height / 6);
    //("Bounces: " + gameState.count);
}

// step and then render
function animate(timeStamp) {
    // step the animation and keep going if step returns true
    if(step(timeStamp)) {
        requestAnimationFrame(animate);
    }

    render(gameState);
}

// start a new game
function startGame() {
    gameState = {
        ball: {
            x: 50,
            y: 50,
            radius: 10,
            vectorX: 1,
            vectorY: 1,
            velocity: 4, // Pixels the ball travels per step
            lastVelocityIncrease: performance.now()
        }, // x += vectorX * velocity, same for y
        paddle: {
            x: 10,
            y: 10,
            width: 10,
            height: canvas.height / 6
        },
        gameState: 0
    };
    requestAnimationFrame(animate);
}

canvas.addEventListener("mousemove", function(evt) {
    var paddle = gameState.paddle;
    paddle.y = evt.clientY - paddle.height / 2;
});

startGame();