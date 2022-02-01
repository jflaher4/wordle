// Use pos to keep track of which square is next to be filled
// Starts at 20, because we use letter class in help page as well
let pos = 20;
let minPos = pos;  // Tracks how far back the user can delete
let maxPos = pos + 5; // Tracks how far the user can type
let gameWon = false; // Allows the player to play until they've won
let friendPos = 15;
// Starting colors
let color1 = "black";
let color2 = "white";
// Stores keyboard in list so we can index it and get the letters
const keyboard = ["Q","W","E","R","T","Y","U","I","O","P","A","S","D",
					"F","G","H","J","K","L","Submit","Z","X","C","V","B",
					"N","M","Del"]
// URL for the word list
const URL  = 'https://raw.githubusercontent.com/JaneClelandHuang/Paradigms2022/main/data/common-words.txt';
// Promise data structure for list
const wordListPromise = fetch(URL)
						.then(res => res.text())
						.then(data => obj = data.split('\n'));
// Promise data structure for correct word
let randomWordPromise = wordListPromise.then(data => {
	let randomWordIndex = Math.floor(Math.random()*(data.length - 1));
	console.log(data[randomWordIndex]);
	return data[randomWordIndex];
});
// Most important function call => listens for clicks and key presses
eventListen();

function addToBoard(letter) {
	if (pos < maxPos && !gameWon) {
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

function enterGuess(userGuess) {
	let included = wordListPromise.then(data => data.includes(userGuess.toLowerCase()));
	included.then(data => {
		if(data && pos > minPos) {
			randomWordPromise.then(correctString => {
				let numCorrectLetters = 0;
				for(let i = pos - 5; i < pos; i++) {
					let square = document.getElementsByClassName("letter")[i];
					let key = document.getElementsByClassName("key")[keyboard.indexOf(square.textContent) + 28];
					if(correctString.charAt((i - 20) % 5) == square.textContent.toLowerCase()) {   // correct postion
						square.style.backgroundColor = "green";   // Change colors to green
						square.style.color = color2;
						square.style.borderColor = color2;
						numCorrectLetters++;
						key.style.backgroundColor = "green";
						key.style.color = color2;
						key.style.borderColor = color2;
					} else if(correctString.indexOf(square.textContent.toLowerCase()) >= 0) {   // in word, incorrect position
						square.style.backgroundColor = "gold";   // Change colors to gold
						square.style.color = color2;
						square.style.borderColor = color2;
						if (key.style.backgroundColor !== "green") { // Sets color priority
							key.style.backgroundColor = "gold";
						}
						key.style.color = color2;
						key.style.borderColor = color2;
					} else {
						square.style.backgroundColor = "gray";   // Change colors to gray
						square.style.color = color2;
						square.style.borderColor = color2;
						key.style.backgroundColor = "gray";
						key.style.color = color2;
						key.style.borderColor = color2;
					}
				}
				console.log(pos);
				if(numCorrectLetters == 5) {     // If all 5 letters are green, player wins
					winStyle((pos-20)/5);
					gameWon = true;
				} else if (pos === 50) {
					loseStyle();
					gameWon = true;
				}
			});
			// Updates the typing boundaries
			minPos += 5;
			maxPos += 5;
		} else {
			invalidWordStyle(pos);
		}
	});
}

function loseStyle() {
	let messageBox = document.getElementById("alert");
	messageBox.style.backgroundColor = "red";
	messageBox.style.opacity = 1;
	messageBox.textContent = "YOU LOST.\r\nTry again";
	messageBox.style.color = color2;
	messageBox.style.fontWeight = "bold";
	messageBox.style.fontSize = "24px";
	messageBox.style.padding = "8px 0";
	messageBox.style.borderColor = "white";
}

function winStyle(n) {
	let messageBox = document.getElementById("alert");
	messageBox.style.backgroundColor = "navy";
	messageBox.style.opacity = 1;
	if (n === 1) {
		messageBox.textContent = `YOU WON\r\nin ${n} guess`;
	} else {
		messageBox.textContent = `YOU WON\r\nin ${n} guesses`;
	}
	messageBox.style.color = "white";
	messageBox.style.fontWeight = "bold";
	messageBox.style.fontSize = "24px";
	messageBox.style.padding = "8px 0";
	messageBox.style.borderColor = "white";
}

function invalidWordStyle(pos) {
	let squares = document.getElementsByClassName("letter");
	for(let i = pos - 5; i < pos; i++) {
		squares[i].style.borderWidth = "2px"
	}
	let messageBox = document.getElementById("alert");
	messageBox.style.backgroundColor = "red";
	messageBox.style.opacity = 1;
	messageBox.textContent = "INVALID WORD";
	messageBox.style.color = color2;
	messageBox.style.fontWeight = "bold";
	messageBox.style.fontSize = "24px";
	setTimeout(function() {
		for(let i = pos - 5; i < pos; i++) {
			squares[i].style.borderWidth = "1px"
		}
	},100);
	setTimeout(function() {
		messageBox.style.opacity = 0;
	},1000);
}

function restartGame() {
	clearBoard();
	randomWordPromise = wordListPromise.then(data => {
		let randomWordIndex = Math.floor(Math.random()*(data.length - 1));
		console.log(data[randomWordIndex]);
		return data[randomWordIndex];
	});
}

function clearBoard() {
	let squares = document.getElementsByClassName("letter");
	for (let i = 20; i < 50; i++) {
		squares[i].textContent = "";
		squares[i].style.backgroundColor = color2;
		squares[i].style.borderColor = color1;
	}
	let keys = document.getElementsByClassName("key");
	for (let i = 0; i < 2*keyboard.length; i++) {
		keys[i].style.backgroundColor = color2;
		keys[i].style.borderColor = color1;
		keys[i].style.color = color1;
	}
	pos = 20;
	minPos = pos;
	maxPos = pos + 5;
	gameWon = false;
	document.getElementById("alert").style.opacity ="0";
}

function openHelpScreen() {
	document.getElementById("helpScreen").style.height = "100%";
}

function closeHelpScreen() {
	document.getElementById("helpScreen").style.height = "0%";
}

function openFriendGuess() {
	document.getElementById("friendGuessScreen").style.height = "100%";
}

function closeFriendGuess() {
	clearFriendWord();
	document.getElementById("friendGuessScreen").style.height = "0%";
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
		document.getElementById("overlayCircleBack").style.filter="invert(100%)";
		document.getElementById("overlayHelp").style.filter="invert(100%)";
		document.getElementById("overlayFriends").style.filter="invert(100%)";
	} else {
		color1 = "black";
		color2 = "white";
		document.getElementById("circleback").style.filter="invert(0%)";
		document.getElementById("help").style.filter = "invert(0%)";
		document.getElementById("dark").src = "./images/moon.png";
		document.getElementById("dark").style.filter = "invert(0%)";
		document.getElementById("friends").style.filter = "invert(0%)";
		document.getElementById("github").style.filter="invert(0%)";
		document.getElementById("overlayCircleBack").style.filter="invert(0%)";
		document.getElementById("overlayHelp").style.filter="invert(0%)";
		document.getElementById("overlayFriends").style.filter="invert(0%)";
	}
	// Inverts colors of all elements
	document.body.style.background                            = color2;
	document.getElementById("title").style.color              = color1;
	document.getElementById("header").style.borderBottomColor = color1;
	// Inverts colors of guessing board
	for (let i = 0; i < 50; i++) {
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
		if (square.style.backgroundColor === color2) {
			square.style.backgroundColor = color1;
		} else if (square.style.backgroundColor === color1){
			square.style.backgroundColor = color2;
		}
	}
	// Inverts keyboard colors
	for (let j = 0; j < 2*keyboard.length; j++) {
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
	document.getElementById('helpScreen').style.backgroundColor = color2;
	document.getElementsByClassName('closebtn')[0].style.color = color1;
	document.getElementsByClassName('closebtn')[0].style.borderColor = color1;
	let overlayText = document.getElementsByClassName('overlayText');
	for (let i = 0; i < overlayText.length; i++) {
		overlayText[i].style.color = color1;
	}
	document.getElementsByClassName('instructions')[0].style.borderBottomColor = color1;
	document.getElementsByClassName('examples')[0].style.borderBottomColor = color1;
	// Inverts colors on friend guess page
	document.getElementById("friendGuessScreen").style.backgroundColor = color2;
	document.getElementsByClassName('closebtn')[1].style.color = color1;
	document.getElementsByClassName('closebtn')[1].style.borderColor = color1;
	
}

function createString(pos) {
	let userGuess = "";
	for(let i = pos - 5; i < pos; i++) {
		userGuess += document.getElementsByClassName("letter")[i].textContent;
	}
	return userGuess;
}

function keyPressed(key) {
	// Handles key events based on what key was pressed
	if ((97 <= key && key <= 122) || (65 <= key && key <= 90)){ //a to z or A to Z
		
		let letter = String.fromCharCode(key).toUpperCase();
		let keyIndex = keyboard.findIndex((x) => x === letter);
		if (document.getElementById("friendGuessScreen").style.height === "0%") {
			addToBoard(letter);
			keyPressedStyle(keyIndex + 28);
		} else {
			addToFriendWord(letter);
			keyPressedStyle(keyIndex);
		}		
		
	} else if (key === 13) { //Enter
		keyPressedStyle(19);
		keyPressedStyle(47);
		if (document.getElementById("friendGuessScreen").style.height === "100%" && friendPos === 20) {
			randomWordPromise = submitFriendWord(createString(friendPos));
	    } else if ((pos % 5 == 0) && (pos > minPos) && !gameWon) {
			enterGuess(createString(pos));
		}
		
	} else if (key === 8 || key === 46) { //Delete or Backspace
		keyPressedStyle(27);
		keyPressedStyle(55);
		if (document.getElementById("friendGuessScreen").style.height === "0%") {
			deleteFromBoard();
		} else if (friendPos > 15) {
			friendPos--;
			let square = document.getElementsByClassName("letter")[friendPos];
			square.textContent = "";
			square.style.color = color2;
		}
	} else if (key === 27) { //Esc
		closeHelpScreen();
		closeFriendGuess();
		let keys = document.getElementsByClassName("closebtn");
		// Key press animation for help screen escape
		for (let i = 0; i < 2; i++) {
			keys[i].style.fontWeight = "bold";
			keys[i].style.borderWidth = "2px"
			setTimeout(function() {
				keys[i].style.fontWeight = "normal";
				keys[i].style.borderWidth = "1px";
			},50);
		}
	}
}

function keyPressedStyle(keyIndex) {
	
	let key = document.getElementsByClassName("key")[keyIndex]
	// Manually create a key pressed animation using setTimeout
	key.style.fontWeight = "bold";
	key.style.borderWidth = "2px"
	setTimeout(function() {
		key.style.fontWeight = "normal";
		key.style.borderWidth = "1px";
	},50);
	
}

function addToFriendWord(letter) {
	if (friendPos < 20) {
		let square  = document.getElementsByClassName("letter")[friendPos];
		square.textContent = letter;
		square.style.color = color1;
		friendPos++;
	}
}

function clearFriendWord() {
	let squares = document.getElementsByClassName("letter");
	for (let i = 15; i < 20; i++) {
		squares[i].textContent = "";
		squares[i].style.backgroundColor = color2;
		squares[i].style.borderColor = color1;
	}
}

function submitFriendWord(word) {
	let friendWordPromise = wordListPromise.then(data => {
		if(data.includes(word.toLowerCase())) {
			clearBoard();
			friendPos = 15;
			closeFriendGuess();
			console.log(word.toLowerCase());
			return word.toLowerCase();
		} else {
			invalidWordStyle(friendPos);
			clearBoard();
			randomWordIndex = Math.floor(Math.random()*(data.length - 1));
			console.log(data[randomWordIndex]);
			return data[randomWordIndex];
		}
	});
	return friendWordPromise;
}

function keyClicked(i) {
	
	if (document.getElementById("friendGuessScreen").style.height === "0%") {
		if (i !== 47 && i !== 55) {   // 47 is submit and 55 is delete
			addToBoard(keyboard[i-28]);
		} else if (i === 55 && pos > 20) {
			deleteFromBoard();
		} else if (i === 47 && (pos % 5 == 0) && (pos > minPos)) {  // ">20" makes sure pos is not at initial square
			enterGuess(createString(pos));
		} 
	} else {
		if (i !== 19 && i !== 27) {
			addToFriendWord(keyboard[i]);
		} else if (i === 19 && friendPos === 20) {
			randomWordPromise = submitFriendWord(createString(friendPos));
		} else if (i === 27 && friendPos > 15) {
			friendPos--;
			let square = document.getElementsByClassName("letter")[friendPos];
			square.textContent = "";
			square.style.color = color2;
		}
		
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
	for (let i = 0; i < 2*keyboard.length; i++) {
		// Listen for click
		document.getElementsByClassName("key")[i].addEventListener("click",function() {
			keyClicked(i);
		});
	}

}
