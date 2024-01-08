"use strict";

const buttonCheck = document.querySelector(".check");
const buttonAgain = document.querySelector(".again");
const body = document.querySelector("body");

let secretNumber = Math.trunc(Math.random() * 100) + 1;
let score = 20;
let highScore = 0;

const displayMessage = function (message) {
	document.querySelector(".message").textContent = message;
};

const updateScore = function (sc) {
	document.querySelector(".score").textContent = sc;
};

const updateHighScore = function (hs) {
	document.querySelector(".highscore").textContent = hs;
};

const toggleDisableButtons = function () {
	const guessButton = document.querySelector(".guess");
	const checkButton = document.querySelector(".check");

	guessButton.disabled = !guessButton.disabled;
	checkButton.disabled = !checkButton.disabled;
};

buttonCheck.addEventListener("click", function () {
	const guess = Number(document.querySelector(".guess").value);

	if (!guess) {
		displayMessage("⛔ No number!");
	} else if (guess === secretNumber) {
		displayMessage("🎉 Correct Number!");

		document.querySelector(".number").textContent = secretNumber;

		body.style.backgroundColor = "#60b347";

		if (score > highScore) {
			highScore = score;
			updateHighScore(highScore);
		}

		toggleDisableButtons();
	} else if (guess > secretNumber && score > 1) {
		displayMessage("📈 Too high!");
		score--;
	} else if (guess < secretNumber && score > 1) {
		displayMessage("📉 Too Low!");
		score--;
	} else {
		body.style.backgroundColor = "#da0909d3";
		displayMessage("💥 You lost the game");
		score = 0;
		toggleDisableButtons();
	}
	updateScore(score);
});

buttonAgain.addEventListener("click", function () {
	body.style.backgroundColor = "#222";
	document.querySelector(".guess").value = "";
	document.querySelector(".number").textContent = "?";

	secretNumber = Math.trunc(Math.random() * 100) + 1;
	score = 20;

	updateScore(score);
	displayMessage("Start guessing...");
	toggleDisableButtons();
});
