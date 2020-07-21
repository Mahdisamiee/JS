/**
 * Define Dom Object
 */
let basket, resetBtn, startBtn, score, ball;
basket = document.getElementById("basket");
resetBtn = document.getElementById('reset');
// score = document.getElementById('score');
ball = document.getElementById("ball");

/**
 * Define Global variable
 */
let ballLeft = 0,
  ballTop = 0,
  speed = 0,
  moveDown;

document.addEventListener("keydown", (event) => {
  // console.log('event.code :>> ', event.code);
  if (event.code == "ArrowLeft" || event.code == "ArrowRight") {
    // console.log("event.code :>> ", event.code);
    if (event.code == "ArrowLeft") moveBasket(1.7);
    else moveBasket(3.3);
  }

  return;
});

/**
 * Define Usefull Function
 */
function moveBasket(size) {
  // console.log("basket.style.left :>> ", basket.getBoundingClientRect().left);
  basket.style.left = basket.getBoundingClientRect().left + 20 * size + "px";
  if (basket.getBoundingClientRect().left <= 0) {
    basket.style.left = 50 + "px";
  } else if (
    basket.getBoundingClientRect().right >= document.documentElement.clientWidth
  ) {
    basket.style.left = document.documentElement.clientWidth - 52 + "px";
  }
}

function leftRandomMaker() {
  // it shoukd make a randoam number for using in left and using in speed
  let randNumber = Math.random() * 900;
  ballLeft =
    document.documentElement.clientWidth - 60 - randNumber > 10
      ? document.documentElement.clientWidth - 60 - randNumber
      : 10;

  ball.style.left = ballLeft + "px";
}
function speedRandMaker() {
  let speed = (Math.random() + 1) * 100;
  moveDown = setInterval(() => {
    ball.style.top = ballTop + "px";
    ballTop = ballTop + 10;
    if (ballTop > document.documentElement.clientHeight - 19) {
      clearInterval(moveDown);
      console.log("ballTop :>> ", ballTop);
    }
  }, speed);
}
