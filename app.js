/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

/**
 * Define Button
 */
let newBtn = document.querySelector(".btn-new"),
  rollBtn = document.querySelector(".btn-roll"),
  holdBtn = document.querySelector(".btn-hold");

/**
 * Define Player Object
 */
let p1ScoreBox = document.querySelector(".player-0-panel .player-score"),
  p2ScoreBox = document.querySelector(".player-1-panel .player-score");

let p1CurrentScore = document.querySelector(
    ".player-0-panel .player-current-score"
  ),
  p2CurrentScore = document.querySelector(
    ".player-1-panel .player-current-score"
  );

let player1TurnFlag = true; // if true player1 has to play and if false player2 has to.

/**
 * Define Dice
 */
let dice = document.querySelector("img.dice");
dice.hidden = true;
/**
 * Define Events
 */

// Start New Game
newBtn.addEventListener("click", start);

// Roll Dice
rollBtn.addEventListener("click", (event) => {
  let diceNumber = (parseInt(Math.random() * 10) % 6) + 1; // 1 <= number <= 6
  dice.hidden = false;
  switch (diceNumber) {
    case 1:
      changePlayer();
      dice.setAttribute("src", "dice-1.png");
      break;
    case 2:
      addCurrentScore(2);
      dice.setAttribute("src", "dice-2.png");
      break;
    case 3:
      addCurrentScore(3);
      dice.setAttribute("src", "dice-3.png");
      break;
    case 4:
      addCurrentScore(4);
      dice.setAttribute("src", "dice-4.png");
      break;
    case 5:
      addCurrentScore(5);
      dice.setAttribute("src", "dice-5.png");
      break;
    case 6:
      addCurrentScore(6);
      dice.setAttribute("src", "dice-6.png");
      break;
  }
});

// Hold Score
holdBtn.addEventListener("click", (event) => {
  if (player1TurnFlag) {
    p1ScoreBox.textContent =
      +p1ScoreBox.textContent + +p1CurrentScore.textContent;

    if (+p1ScoreBox.textContent >= 100) winner();
  } else {
    p2ScoreBox.textContent =
      +p2ScoreBox.textContent + +p2CurrentScore.textContent;

    if (+p2ScoreBox.textContent >= 100) winner();
  }
  changePlayer();
});

/**
 * Define usefull function
 */
function addCurrentScore(number) {
  if (player1TurnFlag) {
    p1CurrentScore.textContent = +p1CurrentScore.textContent + number;
  } else {
    p2CurrentScore.textContent = +p2CurrentScore.textContent + number;
  }
}

function changePlayer() {
  p1CurrentScore.textContent = 0;
  p2CurrentScore.textContent = 0;
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  player1TurnFlag = !player1TurnFlag;
  dice.hidden = true;
}

function winner() {
  if (player1TurnFlag) {
    document.querySelector(".player-0-panel").classList.add("winner");
  } else {
    document.querySelector(".player-1-panel").classList.add("winner");
  }
  rollBtn.hidden = true;
  holdBtn.hidden = true;
}
function start() {
  dice.hidden = true;
  p1ScoreBox.textContent = 0;
  p2ScoreBox.textContent = 0;
  p1CurrentScore.textContent = 0;
  p2CurrentScore.textContent = 0;

  rollBtn.hidden = false;
  holdBtn.hidden = false;

  // if(document.querySelector(".player-0-panel").className.includes('winner')){

  // }
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
}
