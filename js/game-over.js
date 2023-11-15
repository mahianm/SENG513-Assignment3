/* Course: SENG 513 */
/* Date: Nov 14, 2023 */
/* Assignment 3 */
/* Name: Muhammad Mahian */
/* UCID: 30099187 */

var restartButton = document.getElementById("restart-button");

restartButton.addEventListener("click", function() {
    window.location.href = "air-hockey-game.html";
});

window.addEventListener('DOMContentLoaded', (event) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const player1Score = urlParams.get('player1Score');
    const player2Score = urlParams.get('player2Score');

    const scoreElement = document.querySelector('.score');
    const winnerElement = document.querySelector('.winner');

    if (player1Score !== null && player2Score !== null) {
        scoreElement.textContent = `Score: ${player1Score} - ${player2Score}`;
    } 

    if (player1Score > player2Score) {
        winnerElement.textContent = 'Winner: Player 1';
    } else if (player2Score > player1Score) {
        winnerElement.textContent = 'Winner: Player 2';
    }
});


