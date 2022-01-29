// Use pos to keep track of which square is next to be filled
// Starts at 15, because we use letter class in help page as well
let pos = 15;
let minPos = pos;  // Tracks how far back the user can delete
let maxPos = pos + 5; // Tracks how far the user can type
// Starting colors
let color1 = "black";
let color2 = "white";
// Stores keyboard in list so we can index it and get the letters
const keyboard = ["Q","W","E","R","T","Y","U","I","O","P","A","S","D",
					"F","G","H","J","K","L","Submit","Z","X","C","V","B",
					"N","M","Del"]
// URL for the word list
const URL = 'https://raw.githubusercontent.com/JaneClelandHuang/Paradigms2022/main/data/common-words.txt';

// Promise data structure
const wordListPromise = fetch(URL)
						.then(res => res.text())
						.then(data => obj = data.split('\n'));

let randomWordPromise = wordListPromise.then(data => {
	let randomWordIndex = Math.floor(Math.random()*(data.length - 1));
	console.log(data[randomWordIndex]);
});

// Most important function call => listens for clicks and key presses
eventListen();

function addToBoard(letter) {
	if (pos < maxPos) {
		let square = document.getElementsByClassName("letter")[pos];
		square.textContent = letter;
		square.style.color = color1;
		pos++;
	}
}

function deleteFromBoard() {
	if (pos > minPos) {
		pos--;
	}
	let square = document.getElementsByClassName("letter")[pos];
	square.textContent = "";
	square.style.color = color2;
}

function enterGuess() {
	if (wordLegit()) {
		minPos += 5;
		maxPos += 5;
	} else {
		
	}
}

function wordLegit() {
	return true;
}

function clearBoard() {
	let squares = document.getElementsByClassName("letter");
	for (let i = 15; i < 45; i++) {
		squares[i].textContent = "";
	}
	pos = 15;
}

function openHelpScreen() {
	document.getElementById("helpScreen").style.height = "100%";
}

function closeHelpScreen() {
	document.getElementById("helpScreen").style.height = "0%";
}

function darkMode() {
	// Swicthes color variables and inverts handles images
	if (color1 === "black") {
		color1 = "white";
		color2 = "black";
		document.getElementById("circleback").style.filter="invert(100%)";
		document.getElementById("help").style.filter = "invert(100%)";
		document.getElementById("dark").src = "./images/sun.png";
		document.getElementById("dark").style.filter = "invert(100%)";
		document.getElementById("friends").style.filter = "invert(100%)";
		document.getElementById("github").style.filter="invert(100%)";
	} else {
		color1 = "black";
		color2 = "white";
		document.getElementById("circleback").style.filter="invert(0%)";
		document.getElementById("help").style.filter = "invert(0%)";
		document.getElementById("dark").src = "./images/moon.png";
		document.getElementById("dark").style.filter = "invert(0%)";
		document.getElementById("friends").style.filter = "invert(0%)";
		document.getElementById("github").style.filter="invert(0%)";
	}
	// Inverts colors of all elements
	document.body.style.background                            = color2;
	document.getElementById("title").style.color              = color1;
	document.getElementById("header").style.borderBottomColor = color1;
	// Inverts colors of guessing board
	for (let i = 0; i < 45; i++) {
		let square = document.getElementsByClassName("letter")[i];
		if (square.style.color === color1 || square.style.color === "") {
			square.style.color = color2;
		} else {
			square.style.color = color1;
		}
		if (square.style.borderColor === color2 || square.style.borderColor === "") {
			square.style.borderColor = color1;
		} else {
			square.style.borderColor = color2;
		}
	}
	// Inverts keyboard colors
	for (let j = 0; j < keyboard.length; j++) {
		let key = document.getElementsByClassName("key")[j];
		if (key.style.color === color2 || key.style.color === "") {
			key.style.color = color1;
			key.style.backgroundColor = color2;
			key.style.borderColor = color1;
		} else {
			key.style.color = color2;
			key.style.borderColor = color2;
		}
		if (key.style.backgroundColor === color1 || key.style.backgroundColor === "") {
			key.style.backgroundColor = color1;
		} else if (key.style.backgroundColor === color2) {
			key.style.backgroundColor = color2;
		}
	}
	// Inverts text on help page
	document.getElementById('howtoplay').style.color = color1;
	document.getElementById('helpScreen').style.backgroundColor = 'rgba(0,0,0,1)';


}

function keyPressed(key) {

	// Handles key events based on what key was pressed
	if ((97 <= key && key <= 122) || (65 <= key && key <= 90)){ //a to z or A to Z
		let letter = String.fromCharCode(key).toUpperCase();
		addToBoard(letter);
		let keyIndex = keyboard.findIndex((x) => x === letter);
		keyPressedStyle(keyIndex);
	} else if (key === 13) { //Enter
		enterGuess();
		keyPressedStyle(19);
	} else if (key === 8 || key === 46) { //Delete or Backspace
		deleteFromBoard();
		keyPressedStyle(27);
	} else if (key === 27) { //Esc
		closeHelpScreen();
	}

}

function keyPressedStyle(keyIndex) {
	let key = document.getElementsByClassName("key")[keyIndex]
	key.style.fontWeight = "bold";
	key.style.borderWidth = "2px"
	setTimeout(function() {
		key.style.fontWeight = "normal";
		key.style.borderWidth = "1px";
	},250);
}

function keyClicked(i) {

	if (i !== 19 && i !== 27) {   // 19 is submit and 27 is delete
		addToBoard(keyboard[i]);
	} else if (i == 27 && pos > 15) {
		deleteFromBoard();
	}	else if (i == 19 && (pos % 5 == 0) && (pos > 15)) {  // ">15" makes sure pos is not at initial square
		enterGuess();
	}

}



function eventListen() {

	// Need to use onkeydown instead of keypress to handle backspaces and deletes
	document.onkeydown = function(e) {
		if (e.keyCode == 82 && e.ctrlKey) { // Doesn't print R in a box on Ctrl+R
			//pass
		} else {
			keyPressed(e.keyCode);
		}
	};
	// Loops through keyboard buttons
	for (let i = 0; i < keyboard.length; i++) {
		// Listen for click
		document.getElementsByClassName("key")[i].addEventListener("click",function() {
			keyClicked(i);
		});
	}

}
