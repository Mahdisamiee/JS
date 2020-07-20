/**
 * Define Button
 */
let newBtn = document.querySelector(".btn-new"),
  rollBtn = document.querySelector(".btn-roll"),
  holdBtn = document.querySelector(".btn-hold");

/**
 * Define Player Object
 */
let p1ScoreBox = document.querySelector("#score-0"),
  p2ScoreBox = document.querySelector("#score-1");

let p1CurrentScore = document.querySelector("#current-0"),
  p2CurrentScore = document.querySelector("#current-1");

let player1TurnFlag = true; // if true player1 has to play and if false player2 has to.
let prevRoll = 0; //if a player bring two 6 after each other he lose all scores.
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
  let diceNumber = Math.floor(Math.random() * 6) + 1; // 1 <= number <= 6
  if (prevRoll == diceNumber && diceNumber == 6) {
    twoSix();
    prevRoll = 0;
    return;
  }
  prevRoll = diceNumber;
  dice.hidden = false;
  switch (diceNumber) {
    case 1:
      changePlayer();
      dice.setAttribute("src", "dice-1.png");
      break;
    default:
      addCurrentScore(diceNumber);
      dice.setAttribute("src", `dice-${diceNumber}.png`);
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

function twoSix() {
  alert("shit happend!!!");
  if (player1TurnFlag) {
    p1ScoreBox.textContent = 0;
  } else {
    p2ScoreBox.textContent = 0;
  }
  changePlayer();
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

  // }
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
}
