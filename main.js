//****************************************************** */
//****************************************************** */
//****************************************************** */

// Selecting all the DOM elements

const body = document.querySelector("body");

const newGameBtn = document.querySelector("#new-game-btn");
const highScoreDisplay = document.querySelector("#high-score");
const playerNameDisplay = document.querySelector("#player-name-record");

const messageDisplay = document.querySelector("#message-display");
const guessNumberDisplay = document.querySelector("#guess-number");

const numberInput = document.querySelector("#input-number");
const checkBtn = document.querySelector("#check-btn");

const scoreContainer = document.querySelector("#score-container");
const currentScoreDisplay = document.querySelector("#current-score");
const attemptsDisplay = document.querySelector("#attempts-left");

const modalContainer = document.querySelector("#modal-container");
const playerNameInput = document.querySelector("#player-name");
const saveNameBtn = document.querySelector("#save-name-btn");

//****************************************************** */
//****************************************************** */
//****************************************************** */

// Initializing the props

const initialMessage = "Guess a number between 1 - 20";
const helpLowMessage = "You guessed too low";
const helpHighMessage = "You guessed too high";
const winMessage = "You guessed it right!";
const lostMessage = "You lost the game!";

let randomNumber;
let currentScore;
let attempts;
let highScore;

//****************************************************** */
//****************************************************** */
//****************************************************** */

// Functions

function init() {
  randomNumber = Math.trunc(Math.random() * 20) + 1;
  console.log(randomNumber);
  currentScore = 20;
  attempts = 10;

  messageDisplay.textContent = initialMessage;
  guessNumberDisplay.textContent = "?";
  numberInput.value = null;
  currentScoreDisplay.textContent = currentScore;
  attemptsDisplay.textContent = attempts;

  numberInput.disabled = false;
  checkBtn.disabled = false;

  changeBgToBlack();
}

//******************************** */

function changeBgToRed() {
  body.classList.remove("black-bg", "green-bg");
  scoreContainer.classList.remove("black-bg", "green-bg");

  body.classList.add("red-bg");
  scoreContainer.classList.add("red-bg");
}

//******************************** */

function changeBgToBlack() {
  body.classList.remove("red-bg", "green-bg");
  scoreContainer.classList.remove("red-bg", "green-bg");

  body.classList.add("black-bg");
  scoreContainer.classList.add("black-bg");
}

//******************************** */

function changeBgToGreen() {
  body.classList.remove("red-bg", "black-bg");
  scoreContainer.classList.remove("red-bg", "black-bg");

  body.classList.add("green-bg");
  scoreContainer.classList.add("green-bg");
}

//******************************** */

function changeColorToWrong() {
  changeBgToRed();

  setTimeout(() => {
    changeBgToBlack();
  }, 150);
}

//******************************** */

function decreaseScore() {
  currentScore--;
  currentScoreDisplay.textContent = currentScore;

  attempts--;
  attemptsDisplay.textContent = attempts;
}

//******************************** */

function setHighScore() {
  const highScoreRecord = localStorage.getItem("guess-my-number-score");

  if (highScoreRecord) {
    highScore = parseInt(highScoreRecord);
    highScoreDisplay.textContent = highScore;

    const playerName = localStorage.getItem("player-name");
    playerNameDisplay.textContent = playerName;
  } else {
    highScore = 0;
    highScoreDisplay.textContent = 0;
  }
}

//****************************************************** */
//****************************************************** */
//****************************************************** */

// Events

newGameBtn.addEventListener("click", () => {
  init();
});

//******************************** */

//
document.addEventListener("keyup", (e) => {
  if (e.key === "Enter") checkBtn.click();
});

//******************************** */

saveNameBtn.addEventListener("click", () => {
  let playerName = playerNameInput.value;

  if (playerName) {
    localStorage.setItem("player-name", playerName);
    playerNameDisplay.textContent = playerName;
    modalContainer.classList.add("inactive");
  }
});

//******************************** */

//
checkBtn.addEventListener("click", () => {
  const value = Math.trunc(Number(numberInput.value));
  numberInput.value = null;

  //*** */

  if (value === randomNumber) {
    changeBgToGreen();
    messageDisplay.textContent = winMessage;
    checkBtn.disabled = true;
    numberInput.disabled = true;
    guessNumberDisplay.textContent = randomNumber;

    if (currentScore >= highScore) {
      highScore = currentScore;
      highScoreDisplay.textContent = highScore;
      localStorage.setItem("guess-my-number-score", highScore.toString());
      modalContainer.classList.remove("inactive");
    }
  }

  //*** */
  else if (attempts > 1) {
    changeColorToWrong();
    decreaseScore();

    messageDisplay.textContent =
      value > randomNumber ? helpHighMessage : helpLowMessage;
  }

  //*** */
  else {
    decreaseScore();
    changeBgToRed();
    checkBtn.disabled = true;
    numberInput.disabled = true;
    messageDisplay.textContent = lostMessage;
    guessNumberDisplay.textContent = randomNumber;
  }
});

//****************************************************** */
//****************************************************** */
//****************************************************** */

// Main

setHighScore();
init();
