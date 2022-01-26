let pos = 0;

const keyboard = ["Q","W","E","R","T","Y","U","I","O","P","A","S","D",
					"F","G","H","J","K","L","Submit","Z","X","C","V","B",
					"N","M","Del"]

function addToBoard(letter) {
	let square = document.getElementsByClassName("letter")[pos];
	square.textContent = letter;
	square.style.color = "black";
	pos++;
	
}

function keyPressed(i) {
	console.log(i);
	if (i != 19 && i != 27) {
		addToBoard(keyboard[i]);
	}
}

function keyboardListen() {
	for (let i = 0; i < keyboard.length; i++) {
		document.getElementsByClassName("key")[i].addEventListener("click",function() {
			keyPressed(i);
		});
	}
}

keyboardListen();

