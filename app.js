/**
 * Define Button
 */
let newBtn = document.querySelector(".btn-new"),
  rollBtn = document.querySelector(".btn-roll"),
  holdBtn = document.querySelector(".btn-hold");

let maxScore = document.getElementById("max-score");
maxScore.value = 100;
/**
 * Define Player Object
 */
let p1ScoreBox = document.querySelector("#score-0"),
  p2ScoreBox = document.querySelector("#score-1");

let p1CurrentScore = document.querySelector("#current-0"),
  p2CurrentScore = document.querySelector("#current-1");

let player1TurnFlag = true; // if true player1 has to play and if false player2 has to.
let prevRoll1 = 0; //if a player bring two 6 after each other he lose all scores.
let prevRoll2 = 0; //if a player bring two 6 after each other he lose all scores.
/**
 * Define Dice
 */
let dice1 = document.querySelector("#dice1");
let dice2 = document.querySelector("#dice2");
dice1.hidden = true;
dice2.hidden = true;
/**
 * Define Events
 */

// Start New Game
newBtn.addEventListener("click", start);

// Roll Dice
rollBtn.addEventListener("click", (event) => {
  let diceNumber1 = Math.floor(Math.random() * 6) + 1; // 1 <= number <= 6
  let diceNumber2 = Math.floor(Math.random() * 6) + 1; // 1 <= number <= 6
  if (
    (prevRoll1 == diceNumber1 && diceNumber1 == 6) ||
    (prevRoll2 == diceNumber2 && diceNumber2 == 6)
  ) {
    twoSix();
    prevRoll1 = 0;
    prevRoll2 = 0;
    return;
  }
  prevRoll1 = diceNumber1;
  prevRoll2 = diceNumber2;
  dice1.hidden = false;
  dice2.hidden = false;
  switch (diceNumber1) {
    case 1:
      changePlayer();
      dice1.setAttribute("src", "dice-1.png");
      break;
    default:
      addCurrentScore(diceNumber1);
      dice1.setAttribute("src", `dice-${diceNumber1}.png`);
      break;
  }
  switch (diceNumber2) {
    case 1:
      changePlayer();
      dice2.setAttribute("src", "dice-1.png");
      break;
    default:
      addCurrentScore(diceNumber2);
      dice2.setAttribute("src", `dice-${diceNumber2}.png`);
      break;
  }
});

// Hold Score
holdBtn.addEventListener("click", (event) => {
  if (player1TurnFlag) {
    p1ScoreBox.textContent =
      +p1ScoreBox.textContent + +p1CurrentScore.textContent;

    if (+p1ScoreBox.textContent >= maxScore.value) winner();
  } else {
    p2ScoreBox.textContent =
      +p2ScoreBox.textContent + +p2CurrentScore.textContent;

    if (+p2ScoreBox.textContent >= maxScore.value) winner();
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
  dice1.hidden = true;
  dice2.hidden = true;
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
  dice1.hidden = true;
  dice2.hidden = true;

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
