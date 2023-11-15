# SENG513-Assignment2

TA: Sajad Dadgar - sajaddadgar

1. Handling Player Collision and Angle Calculation:
Initial Function:

    function handlePlayerCollision(player) {
        puckDX = (player === player1) ? Math.abs(puckDX) : -Math.abs(puckDX);
    }

In my initial code, I was able to alter the pucks horizontal direction (puckDX) based on the player involved in the collision. This ensures that after collision the puck moves towards player1 if they were involved or towards player2 if the latter was involved. However, I found this way of implementing it very forced and unnatural. With the help of ChatCPT, the function was evolved to calculate the angle between the puck and the player involved in the collision using trigonometry. It will then adjust the pucks direction based on this angle while preserving its current speed resulting in a more realistic change in the pucks trajectory after the collision. Compared to the simpler direction switch in my initial function, this updated function that ChatGPT provided helped with the overall flow of the game. 

Updated Funcion:

function handlePlayerCollision(player) {
   const angle = Math.atan2(puckY - (player === player1 ? player1Y : player2Y), puckX - (player === player1 ? player1X : player2X));

   const speed = Math.sqrt(puckDX * puckDX + puckDY * puckDY);
   puckDX = Math.cos(angle) * speed;
   puckDY = Math.sin(angle) * speed;
}
Explanation:
The checkCollisions function helps manage collision detection within the game to make sure of accurate handling of events related to puck interactions with the players and goal boundaries.
•	Boundary Collision Detection:
	o	It will check if the puck crosses the left or right goal boundaries by comparing its position (puckX) with the table boundaries.
	o	If the puck crosses the left boundary (puckX - puckRadius <= 0) it will; then trigger a goal for player 2 using the handleGoal function. If it crosses the right boundary (puckX + puckRadius >= tableWidth) it will trigger a goal for player 1.
•	Player-Puck Collision Detection:
	o	This part utilizes the isCollision function to detect collisions between the puck and players.
	o	If a collision occurs between the puck and player1 or player2 the handlePlayerCollision function is invoked to manage the collision which will alter the pucks direction based on the player it has collided with.
ChatGPTs assistance was crucial as it helped me understand the trigonometric principles behind Math.atan2 and apply them practically for collision handling. This was to make use of accurate puck movement after a collision occurs. ChatGPT provided me with an initial code snippet and with its debugging capabilities I was able to fine tune the function and use it accordingly. 

2. Move Puck Function 

Initial Function: 

    function movePuck() {
        puckX += puckDX;
        puckY += puckDY;

        if (puckY - puckRadius <= 0 || puckY + puckRadius >= tableHeight) {
            puckDY = -puckDY;
        }
    }

With my initial move puck function I was not satisfied with the way the movement looked on screen. Something about the way it interacted with the players made it seem bland. I asked ChatGPT how I could enhance the function to make the feeling of the puck more familiar. It recommended I increase the speed of the puck each time a player hits it. It kinda mimics the action of a player in real life increasing the force exerted when hitting the puck. ChatGPT provided me with the updated code shown below. 

Updated Function:

    function movePuck() {
        puckX += puckDX;
        puckY += puckDY;

        puckDX *= 1.001;
        puckDY *= 1.001;

        if (puckY - puckRadius <= 0 || puckY + puckRadius >= tableHeight) {
            puckDY = -puckDY;
        }
    }

Explanation:
The movePuck function helped with controlling the movement and behavior of the puck during the gameplay.
•	Puck Position Update:
	o	This updates the puckX and puckY coordinates by adding the current horizontal (puckDX) and vertical (puckDY) velocities which will allow the puck to move smoothly across the game table.
•	Gradual Speed Increase:
	o	This part  of the code increases the pucks speed over time by multiplying the velocities puckDX and puckDY by a small factor of 1.001 creating an accelerated and more realistic experience as the puck moves around in the air hockey table.
•	Wall Collision Detection:
	o	This checks for collisions of the puck with the top and bottom walls of the air hockey table.
	o	If the puck collides with the upper puckY - puckRadius <= 0 or lower puckY + puckRadius >= tableHeight boundaries it then reverses its vertical direction puckDY = -puckDY making sure that the puck bounces off these walls.
3. Reset Puck Function:

Initial Code:


    function resetPuck() {
        puckX = tableWidth / 2;
        puckY = tableHeight / 2;
        puckDX = puckSpeed;
        puckDY = puckSpeed;
    }

In my initial resetPuck function I provided a basic reset but just directed the puck consistently toward one player after each goal which had no consideration to who just scored. Using ChatGPT, I was able to improve it to make it more fair. ChatGPT provided me with a revised function that dynamically changes the pucks direction targeting the opposing player who scored. This adjustment introduces unpredictability and fairness which enhances the game's engagement and balance.

Revised function with ChatGPT:

function resetPuck(scoringPlayer) {
   puckX = tableWidth / 2;
   puckY = tableHeight / 2;
  
   const randomAngle = Math.random() * Math.PI * 2; // Random angle in radians
   puckDX = Math.cos(randomAngle) * puckSpeed;
   puckDY = Math.sin(randomAngle) * puckSpeed;
  
   if (scoringPlayer === player1) {
       puckDX = -Math.abs(puckDX);
   } else if (scoringPlayer === player2) {
       puckDX = Math.abs(puckDX);
   }
}
Explanation:
The resetPuck function is responsible for resetting the pucks position and direction after either player1 or player 2 scores which allows the game to continue after each goal.
•	Resetting Puck Position:
	o	The function will position the puck at the center of the game table after each goal is scored by setting its coordinates to tableWidth / 2 for puckX and tableHeight / 2 for puckY.
•	Resetting Pucks Direction:
	o	This part will generate a random angle in radians (randomAngle) to determine the pucks new direction after each goal is scored. Having it generate a random angle allows for a fresh start to each round. This will prevent players from memorizing puck angles after each goal.
	o	When the puck is reset to the center, the function then utilizes trigonometric functions Math.cos and Math.sin to help calculate the new velocity components puckDX and puckDY based on the random angle. This then in turn determines the pucks speed and direction post reset.
•	Adjusting Puck Direction after Scoring:
	o	In order for fair play, this function will then make the puck move towards the opposite player who scored by adjusting its horizontal direction puckDX accordingly.



