// Use pos to keep track of which square is next to be filled
let pos = 0;
// Starting colors
let color1 = "black";
let color2 = "white";
// Stores keyboard in list so we can index it and get the letters
const keyboard = ["Q","W","E","R","T","Y","U","I","O","P","A","S","D",
					"F","G","H","J","K","L","Submit","Z","X","C","V","B",
					"N","M","Del"]
// URL for the word list
const URL = 'https://raw.githubusercontent.com/JaneClelandHuang/Paradigms2022/main/data/common-words.txt';

// Promise bullshit datastructure
const wordListPromise = fetch(URL)
						.then(res => res.text())
						.then(data => obj = data.split('\n'));

let randomWordPromise = wordListPromise.then(data => {
	let randomWordIndex = Math.floor(Math.random()*data.length);
	console.log(data[randomWordIndex]);
});

// Most important function call => listens for clicks and key presses
eventListen();

function addToBoard(letter) {
	
	let square = document.getElementsByClassName("letter")[pos];
	square.textContent = letter;
	square.style.color = color1;
	pos++;

}

function clearBoard() {
	console.log("clear");
}

function darkMode() {
	
	// Swicthes color variables and inverts handles images
	if (color1 === "black") {
		color1 = "white";
		color2 = "black";
		document.getElementById("circleback").style.filter="invert(100%)";
		document.getElementById("github").style.filter="invert(100%)";
		document.getElementById("dark").src = "sun.png";
		document.getElementById("dark").style.filter = "invert(100%)";
	} else {
		color1 = "black";
		color2 = "white";
		document.getElementById("circleback").style.filter="invert(0%)";
		document.getElementById("github").style.filter="invert(0%)";
		document.getElementById("dark").src = "moon.png";
		document.getElementById("dark").style.filter = "invert(0%)";
	}
	// Inverts colors of all elements
	document.body.style.background                            = color2;
	document.getElementById("title").style.color              = color1;
	document.getElementById("header").style.borderBottomColor = color1;	
	// Inverts colors of guessing board
	for (let i = 0; i < 30; i++) {
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
	
}

function keyPressed(key) {

	// Handles key events based on what key was pressed
	if ((97 <= key && key <= 122) || (65 <= key && key <= 90)){
		addToBoard(String.fromCharCode(key).toUpperCase());
	} else if (key === 13) {
		console.log("enter");
	} else if (key === 8 || key === 46) {
		console.log("delete");
	}
	
}

function keyClicked(i) {
	
	if (i !== 19 && i !== 27) {
		addToBoard(keyboard[i])
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

