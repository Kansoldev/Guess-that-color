const colors = [
  "red",
  "blue",
  "rebeccapurple",
  "violet",
  "#d2a146",
  "black",
  "indigo",
  "#b0a899",
  "#b483e5",
  "#ebd9fc",
  "#cdcd3b",
  "#e4112a",
];

let currentColors = [];
let targetColor = "";
let matchFound = false;
let score = 0;
let scoreBoard = document.querySelector("#score");
let message = document.querySelector("#status");

document.addEventListener("DOMContentLoaded", () => {
  generateNewColors();
  displayColors();
  displayTargetColor();
});

document.querySelector("#new").addEventListener("click", () => {
  score = 0;
  scoreBoard.innerHTML = score;

  generateNewColors();
  displayColors();
  displayTargetColor();
});

function generateNewColors() {
  /*
    When generateNewColors() runs again, currentColors will no longer be empty,
    that's why I have to check if a match was found so that I can reset it
  */
  if (matchFound === true) {
    currentColors = [];
  }

  while (currentColors.length < 6) {
    const randomIndex = getRandomIndex();

    if (!currentColors.includes(colors[randomIndex])) {
      currentColors.push(colors[randomIndex]);
    }
  }
}

function displayColors() {
  const options = document.querySelector("#options");
  options.innerHTML = "";

  currentColors.forEach((color) => {
    const button = document.createElement("button");
    button.style.backgroundColor = color;
    button.addEventListener("click", () => {
      if (color === targetColor) {
        matchFound = true;
        score++;
        scoreBoard.innerHTML = score;
        message.style.backgroundColor = "limegreen";
        message.style.visibility = "visible";
        message.classList.add("pulse");
        message.innerHTML = "Yay, You guessed correctly!";

        setTimeout(() => {
          generateNewColors();
          displayColors();
          displayTargetColor();

          message.style.visibility = "hidden";
          message.innerHTML = "";
          message.classList.remove("pulse");
        }, 1000);
      } else if (score >= 1) {
        score--;
        scoreBoard.innerHTML = score;
        message.innerHTML = "You guessed wrong, try again";

        if (score === 0) {
          scoreBoard.innerHTML = 0;
          message.innerHTML = "Game over!, try again";
        }

        message.classList.add("fadeIn");
        message.style.backgroundColor = "#dc3545";
        message.style.visibility = "visible";

        setTimeout(() => {
          generateNewColors();
          displayColors();
          displayTargetColor();

          message.innerHTML = "";
          message.classList.remove("fadeIn");
          message.style.visibility = "hidden";
        }, 1000);
      } else {
        message.style.backgroundColor = "#dc3545";
        message.style.visibility = "visible";
        message.classList.add("fadeIn");
        message.innerHTML = "You guessed wrong, try again";

        setTimeout(() => {
          message.classList.remove("fadeIn");
          message.innerHTML = "";
          message.style.visibility = "hidden";
        }, 1300);
      }
    });

    options.appendChild(button);
  });
}

function displayTargetColor() {
  const randomIndex = getRandomIndex(currentColors);
  targetColor = currentColors[randomIndex];
  document.querySelector("#target-color").style.backgroundColor = targetColor;
}

function getRandomIndex(color = "colors") {
  return Math.floor(Math.random() * color.length);
}
