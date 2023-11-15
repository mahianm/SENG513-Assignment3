/* Course: SENG 513 */
/* Date: Nov 14, 2023 */
/* Assignment 3 */
/* Name: Muhammad Mahian */
/* UCID: 30099187 */

document.addEventListener("DOMContentLoaded", function () {
    const player1 = document.getElementById("player1");
    const player2 = document.getElementById("player2");
    const puck = document.getElementById("puck");
    const scoreboard = document.getElementById("scoreboard");
    const player1ScoreElement = scoreboard.querySelector(".score:nth-child(1)");
    const player2ScoreElement = scoreboard.querySelector(".score:nth-child(2)");

    const tableWidth = 1000;
    const tableHeight = 575;
    const playerRadius = 30;
    const puckRadius = 10;
    const playerSpeed = 5;
    const puckSpeed = 2;

    let player1X = playerRadius + 20;
    let player1Y = tableHeight / 2;
    let player2X = tableWidth - playerRadius - 20;
    let player2Y = tableHeight / 2;
    let puckX = tableWidth / 2;
    let puckY = tableHeight / 2;
    let puckDX = puckSpeed;
    let puckDY = puckSpeed;
    let player1Score = 0;
    let player2Score = 0;


    function updateGame() {
        moveMallet();
        movePuck();
        checkCollisions();
        updateElements();
        requestAnimationFrame(updateGame);
    }

    function moveMallet() {
        if (keysPressed["ArrowUp"] && player2Y - playerRadius > 0) {
            player2Y -= playerSpeed;
        } else if (keysPressed["ArrowDown"] && player2Y + playerRadius < tableHeight) {
            player2Y += playerSpeed;
        }

        if (keysPressed["ArrowLeft"] && player2X - playerRadius > tableWidth / 2) {
            player2X -= playerSpeed;
        } else if (keysPressed["ArrowRight"] && player2X + playerRadius < tableWidth) {
            player2X += playerSpeed;
        }

        if (keysPressed["w"] && player1Y - playerRadius > 0) {
            player1Y -= playerSpeed;
        } else if (keysPressed["s"] && player1Y + playerRadius < tableHeight) {
            player1Y += playerSpeed;
        }

        if (keysPressed["a"] && player1X - playerRadius > 0) {
            player1X -= playerSpeed;
        } else if (keysPressed["d"] && player1X + playerRadius < tableWidth / 2) {
            player1X += playerSpeed;
        }
    }

    function movePuck() {
        puckX += puckDX;
        puckY += puckDY;

        puckDX *= 1.001;
        puckDY *= 1.001;

        if (puckY - puckRadius <= 0 || puckY + puckRadius >= tableHeight) {
            puckDY = -puckDY;
        }
    }

    function checkCollisions() {
        const goalWidth = 50;

        if (puckX - puckRadius <= 0) {
            checkGoal(player2, player2Score);
        } else if (puckX + puckRadius >= tableWidth) {
            checkGoal(player1, player1Score);
        }

        if (isCollision(player1X, player1Y, playerRadius, puckX, puckY, puckRadius)) {
            handlePlayerCollision(player1);
        } else if (isCollision(player2X, player2Y, playerRadius, puckX, puckY, puckRadius)) {
            handlePlayerCollision(player2);
        }
    }

    // Algorithm to check for goals scored and update scores
    function checkGoal(player, score) {
        if (puckY >= tableHeight / 2 - 100 && puckY <= tableHeight / 2 + 100) {
            score++;
    
            if (player === player1) {
                player1Score = score;
                resetPuck(player2); 
            } else {
                player2Score = score;
                resetPuck(player1); 
            }
    
            if (player1Score >= 10 || player2Score >= 10) {

                window.location.href = `gameOver.html?player1Score=${player1Score}&player2Score=${player2Score}`;
            }
        } else {
            puckDX = -puckDX;
        }
    }
    

    // Algorithm to handle collision with players and change puck direction
    function handlePlayerCollision(player) {
        const angle = Math.atan2(puckY - (player === player1 ? player1Y : player2Y), puckX - (player === player1 ? player1X : player2X));

        const speed = Math.sqrt(puckDX * puckDX + puckDY * puckDY);
        puckDX = Math.cos(angle) * speed;
        puckDY = Math.sin(angle) * speed;
    }


    function updateElements() {
        player1.style.left = player1X - playerRadius + "px";
        player1.style.top = player1Y - playerRadius + "px";
        player2.style.left = player2X - playerRadius + "px";
        player2.style.top = player2Y - playerRadius + "px";

        puck.style.left = puckX - puckRadius + "px";
        puck.style.top = puckY - puckRadius + "px";

        player1ScoreElement.textContent = `Player 1: ${player1Score}`;
        player2ScoreElement.textContent = `Player 2: ${player2Score}`;
    }

    // Algorithm for resetting the puck after a goal is scored
    function resetPuck(scoringPlayer) {
        puckX = tableWidth / 2;
        puckY = tableHeight / 2;
    
        const randomAngle = Math.random() * Math.PI * 2; 
        puckDX = Math.cos(randomAngle) * puckSpeed;
        puckDY = Math.sin(randomAngle) * puckSpeed;
    
        if (scoringPlayer === player1) {
            puckDX = -Math.abs(puckDX);
        } else if (scoringPlayer === player2) {
            puckDX = Math.abs(puckDX);
        }
    }
    
    // Collision detection algorithm to check if two circular objects collide
    function isCollision(x1, y1, radius1, x2, y2, radius2) {
        const dx = x1 - x2;
        const dy = y1 - y2;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < radius1 + radius2;
    }

    const keysPressed = {};

    document.addEventListener("keydown", function (event) {
        keysPressed[event.key] = true;
        handleKeyPress();
    });

    document.addEventListener("keyup", function (event) {
        delete keysPressed[event.key];
        handleKeyPress();
    });

    function handleKeyPress() {
        moveMallet();
    }

    updateGame();
});