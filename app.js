const head_div = document.getElementById("hangman-head");
const leftarm_div = document.getElementById("hangman-leftarm");
const body_div = document.getElementById("hangman-body");
const rightarm_div = document.getElementById("hangman-rightarm");
const leftleg_div = document.getElementById("hangman-leftleg");
const rightleg_div = document.getElementById("hangman-rightleg");

const answer_div = document.getElementById("answer-container");
const buttons_div = document.getElementById("buttons-container");

let word = "Fortnite Battle Royale";
word = word.toLowerCase();
let visibleLetterList = [];
let errors = 0;
let wordSpaces = 0;

let alphabet = "abcdefghijklmnopqrstuvwxyz";

for (let index = 0; index < word.length; index++) {
	//Create letter div and add it to the answer div
	letter_div = document.createElement("div");
	letter_div.classList.add("answer-letter");
	if (word[index] == " ") {
		letter_div.classList.add("answer-space");
		wordSpaces++;
	}
	answer_div.appendChild(letter_div);
	visibleLetterList.push("_");
}

for (let index = 0; index < alphabet.length; index++) {
	letter_div = document.createElement("div");
	letter_div.classList.add("letter-button");
	letter_div.innerHTML = alphabet[index];
	buttons_div.appendChild(letter_div);
}

document.addEventListener("click", (element) => {
	let letter = element.target.innerHTML;
	if (alphabet.indexOf(letter) > -1) {
		if (word.indexOf(letter) > -1 && visibleLetterList.indexOf(letter) == -1) {
			let allIndexes = [];
			let i = -1;
			while ((i = word.indexOf(letter, i + 1)) != -1) {
				allIndexes.push(i);
			}

			for (let index of allIndexes) {
				visibleLetterList[index] = letter;
				answer_div.childNodes[index + 1].innerHTML = letter;
			}

			let visibleListUnderscores = 0;
			for (let index = 0; index < visibleLetterList.length; index++) {
				if (visibleLetterList[index] == "_") {
					visibleListUnderscores++;
				}
			}
			if (visibleListUnderscores == wordSpaces) {
				alert("You Win!");
			}
		}
		else {
			errors += 1
			switch (errors) {
				case 1:
					rightleg_div.style.visibility = "hidden";
					break;
				case 2:
					leftleg_div.style.visibility = "hidden";
					break;
				case 3:
					rightarm_div.style.visibility = "hidden";
					break;
				case 4:
					leftarm_div.style.visibility = "hidden";
					break;
				case 5:
					body_div.style.visibility = "hidden";
					break;
				case 6:
					head_div.style.visibility = "hidden";
					alert("You Lose!");
					break;
			}
		}
		element.target.classList.add("used-button");
	}
});