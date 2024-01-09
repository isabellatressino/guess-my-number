"use strict";

// Seleção dos elementos html
const buttonCheck = document.querySelector(".check");
const buttonAgain = document.querySelector(".again");
const body = document.querySelector("body");
const inputGuess = document.querySelector(".guess");

// Inicialização de variáveis
let secretNumber = Math.trunc(Math.random() * 100) + 1;
let score = 20;
let highScore = 0;

// Função para exibir as mensagens
const displayMessage = function (message) {
	let pMessage = document.querySelector('.message');
	pMessage.textContent = message;
	pMessage.classList.add("animation");
	setTimeout(function(){
		pMessage.classList.remove("animation");
	},1000);
};

// Função para atualizar o score
const updateScore = function (sc) {
	document.querySelector(".score").textContent = sc;
};

// Função para atualizar o highscore
const updateHighScore = function (hs) {
	document.querySelector(".highscore").textContent = hs;
};

// Função para habilitar/desabilitar o botao e input de adivinhação
const toggleDisableButtons = function () {
	const guess = document.querySelector(".guess");
	const checkButton = document.querySelector(".check");

	guess.disabled = !guess.disabled;
	checkButton.disabled = !checkButton.disabled;
};

// Função para verificar o número inserido pelo jogador
const checkNumber = function (guess) {
	if (!guess) {
		// Se o palpite não for um número
		displayMessage("⛔ No number!");
	} else if (guess === secretNumber) {
		// Se o palpite for correto
		displayMessage("🎉 Correct Number!");

		document.querySelector(".number").textContent = secretNumber;

		body.style.backgroundColor = "#60b347";

		if (score > highScore) {
			highScore = score;
			updateHighScore(highScore);
		}

		toggleDisableButtons();
	} else if (guess > secretNumber && score > 1) {
		// Se o palpite for muito alto
		displayMessage("📈 Too high!");
		score--;
	} else if (guess < secretNumber && score > 1) {
		// Se o palpite for muito baixo
		displayMessage("📉 Too Low!");
		score--;
	} else {
		// Se o jogador perder o jogo
		body.style.backgroundColor = "#da0909d3";
		displayMessage("💥 You lost the game");
		score = 0;
		toggleDisableButtons();
	}
	updateScore(score);
};

// Evento para o botão check
buttonCheck.addEventListener("click", function () {
	const guess = Number(document.querySelector(".guess").value);
	checkNumber(guess);
});

// Evento para recomeçar
buttonAgain.addEventListener("click", function () {
	// Função que reinicia as variáveis e conteúdos
	body.style.backgroundColor = "#222";
	document.querySelector(".guess").value = "";
	document.querySelector(".number").textContent = "?";

	secretNumber = Math.trunc(Math.random() * 100) + 1;
	score = 20;

	updateScore(score);
	displayMessage("Start guessing...");
	toggleDisableButtons();
});

// Evento para a tecla enter
inputGuess.addEventListener("keydown", function (e) {
	if (e.key === "Enter") {
		checkNumber(Number(inputGuess.value));
	}
});
