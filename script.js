const mapDisplay = document.querySelector('.parent');
const mapDisplay2 = document.querySelector('.parent2');

const pl1 = document.querySelector('.player1');
const pl2 = document.querySelector('.player2');
const p1 = document.querySelector('.piece1');
const p2 = document.querySelector('.piece2');
const p3 = document.querySelector('.piece3');
const p4 = document.querySelector('.piece4');
const guide = document.querySelector('.guide');
const resetButton = document.querySelector('.resetButton');

resetButton.addEventListener('click', () => {
	window.location.reload();
});

let stage = 0;
let isGameOver = false;
let countCompleteTowers = 0;

const rows = [
	['', '', '', '', ''],
	['', '', '', '', ''],
	['', '', '', '', ''],
	['', '', '', '', ''],
	['', '', '', '', '']
]

const cards = [
	['', '', '', '', '', '']
]

/*	initiate players	*/

/*	player 1 pieces	*/

guide.style.color = 'red';
guide.textContent = 'Player 1: Place both pieces on the board';

pl1.setAttribute('inPlay', 'true');
pl2.setAttribute('inPlay', 'false');

p1.setAttribute('level', 0);
p1.setAttribute('selected', 'false');
p1.setAttribute('init', 'false');
p1.addEventListener('click', () => handleClickPlayer(p1, p3));

p3.setAttribute('level', 0);
p3.setAttribute('selected', 'false');
p3.setAttribute('init', 'false');
p3.addEventListener('click', () => handleClickPlayer(p3, p1));

/*	player 2 pieces	*/

p2.setAttribute('level', 0);
p2.setAttribute('selected', 'false');
p2.setAttribute('init', 'false');
p2.addEventListener('click', () => handleClickPlayer(p2, p4));

p4.setAttribute('level', 0);
p4.setAttribute('selected', 'false');
p4.setAttribute('init', 'false');
p4.addEventListener('click', () => handleClickPlayer(p4, p2));

function handleClickPlayer(player, player2)
{
	let selected = player.getAttribute('selected');
	player2.setAttribute('selected', 'false');
	if (selected.localeCompare('false') == 0)
	{
		player.setAttribute('selected', 'true');
	}
}

function cardButton0()
{
	/*Minotaur*/
	alert("Win condition: You also win if your worker moves down two or more levels.");
}

function cardButton1()
{
	/*Chronus*/
	alert("Win condition: You also win when there are at least five Complete Towers on the board.");
}

function cardButton2()
{
	/*Hera*/
	alert("Opponent's turn: An opponent cannot win by moving into a perimeter space.");
}

function cardButton3()
{
	/*Zeus*/
	alert("Your build: Your worker may build a block under itself.");
}

function cardButton4()
{
	/*Limus*/
	alert("Opponent's turn: opponent workers cannot build on spaces neighboring your workers, unless building a dome to create a Complete Tower.");
}

function cardButton5()
{
	/*Zeus*/
	alert("The Player choose to not have Hero card.");
}

/*	creates map	*/

rows.forEach((row, rowIndex) => {
	const rowElement = document.createElement('div');
	rowElement.setAttribute('id', 'row-' + rowIndex);
	rowElement.setAttribute('class', 'container');
	row.forEach((tile, tileIndex) => {
		const tileElement = document.createElement('div');
		tileElement.setAttribute('id', 'row-' + rowIndex + '-tile-' + tileIndex);
		tileElement.setAttribute('level', 0);
		tileElement.setAttribute('free', 'true');
		tileElement.classList.add('tile');
		tileElement.addEventListener('click', () => handleClick(tileElement));
		rowElement.append(tileElement);
	})
	mapDisplay.append(rowElement);
})

cards.forEach((card, cardIndex) => {
	let index = 0;
	const cardElement = document.createElement('div');
	cardElement.setAttribute('id', 'card-' + cardIndex);
	cardElement.setAttribute('class', 'container2');
	card.forEach((tile, tileIndex) => {
		const tileElement = document.createElement('div');
		tileElement.setAttribute('id', 'card-' + cardIndex + '-tile-' + tileIndex);
		//tileElement.addEventListener('click', () => handleClick(tileElement));
		IndexOfCards(index);
		index++;
		cardElement.append(tileElement);
	})
	mapDisplay2.append(cardElement);
})

function IndexOfCards(index)
{
	if (index == 0)
	{
		cards.textContent = 'Minotaur';
	}
	else if (index == 1)
	{
		cards.textContent = 'Chronus';
	}
	else if (index == 2)
	{
		cards.textContent = 'Hera';
	}
	else if (index == 3)
	{
		cards.textContent = 'Zeus';
	}
	else if (index == 4)
	{
		cards.textContent = 'Limus';
	}
	else if (index == 5)
	{
		cards.textContent = 'NoCard';
	}
}

/*	when tile is clicked this function is executed	*/

function handleClick(tileElement)
{
	let prevLevel = Number(tileElement.getAttribute('level'));
	let free = tileElement.getAttribute('free');
	let selected1 = p1.getAttribute('selected');
	let selected2 = p2.getAttribute('selected');
	let selected3 = p3.getAttribute('selected');
	let selected4 = p4.getAttribute('selected');
	let init1 = p1.getAttribute('init');
	let init2 = p2.getAttribute('init');
	let init3 = p3.getAttribute('init');
	let init4 = p4.getAttribute('init');
	let inPlay1 = pl1.getAttribute('inPlay');
	let inPlay2 = pl2.getAttribute('inPlay');
	console.log(stage);
	if (free.localeCompare('true') == 0)
	{
		if (selected1.localeCompare('true') == 0 && (stage == 0 || stage == 2))
			moveCheckPlace1(p1, tileElement, prevLevel, 'pl1', init1, init3);
		else if (selected3.localeCompare('true') == 0 && (stage == 0 || stage == 2))
			moveCheckPlace1(p3, tileElement, prevLevel, 'pl1', init3, init1);
		else if (selected2.localeCompare('true') == 0 && (stage == 1 || stage == 4))
			moveCheckPlace1(p2, tileElement, prevLevel, 'pl2', init2, init4);
		else if (selected4.localeCompare('true') == 0 && (stage == 1 || stage == 4))
			moveCheckPlace1(p4, tileElement, prevLevel, 'pl2', init4, init2);
		if (inPlay1.localeCompare('true') == 0)
		{
			if (selected1.localeCompare('true') == 0)
				moveCheckPlace2(p1, tileElement, prevLevel, 'pl1', pl1);
			else if (selected3.localeCompare('true') == 0)
				moveCheckPlace2(p3, tileElement, prevLevel, 'pl1', pl1);
		}
		else if (inPlay2.localeCompare('true') == 0)
		{
			if (selected2.localeCompare('true') == 0)
				moveCheckPlace2(p2, tileElement, prevLevel, 'pl2', pl2);
			else if (selected4.localeCompare('true') == 0)
				moveCheckPlace2(p4, tileElement, prevLevel, 'pl2', pl2);
		}
		else if (free.localeCompare('true') == 0 && (stage == 3 || stage == 5))
		{
			if (stage == 3)
			{
				if (checkIfTileIsCloseEnough(p1, tileElement) == false && checkIfTileIsCloseEnough(p3, tileElement) == false)
					return (false);
				switchTileColor(tileElement, prevLevel);
			}
			else if (stage == 5)
			{
				if (checkIfTileIsCloseEnough(p2, tileElement) == false && checkIfTileIsCloseEnough(p4, tileElement) == false)
					return (false);
				switchTileColor(tileElement, prevLevel);
			}
		}
	}
}

/*	function called in initialization fase	*/

function moveCheckPlace1(player, tileElement, prevLevel, name, init, init2)
{
	movePlayer(player, tileElement, prevLevel);
	player.setAttribute('init', 'true');
	if (init.localeCompare('false') == 0 && init2.localeCompare('false') == 0)
		return (false);
	checkIfGameOver(prevLevel, name);
	switchStage(name);
}

/*	function called throughout game	*/

function moveCheckPlace2(player, tileElement, prevLevel, name, pl)
{
	if (checkIfValidMove(player, tileElement, prevLevel) == false)
	{
		// return error message to user or maybe play audio that it is wrong move
		return (false);
	}
	movePlayer(player, tileElement, prevLevel);
	checkIfGameOver(prevLevel, name);
	pl.setAttribute('inPlay', 'false');
	changeGuideTextBuild();
}

/*	checks if valid position player is trying to move to	*/
/*	checks if it's free to move there	*/
/*	checks that player doesn't try to move heigher up that possible	*/
/*	checks player try to move inside 3x3 square	*/

function checkIfValidMove(player, tileElement, prevLevel)
{
	const level = player.getAttribute('level');
	let dif = prevLevel - level;
	if (dif >= 2)
		return (false);
	else
	{
		if (checkIfTileIsCloseEnough(player, tileElement) == false)
			return (false);
	}
}

/*	checks if the tile we are trying to move the player to is within range	*/

function checkIfTileIsCloseEnough(player, tileElement)
{
	const currentTile = tileElement.getAttribute('id');
	const prevTile = player.parentNode.getAttribute('id');
	var row = Number(currentTile.match(/\d+/)[0]);
	var tile = Number(currentTile.match(/\d+$/)[0]);
	var playerX = Number(prevTile.match(/\d+/)[0]);
	var playerY = Number(prevTile.match(/\d+$/)[0]);
	let difX = playerX - row;
	let difY = playerY - tile;
	if (difX > 1 || difX < -1)
		return (false);
	else if (difY > 1 || difY < -1)
		return (false);
	return (true);
}

/*	move player	*/

function movePlayer(player, tileElement, prevLevel)
{
	let curInit = player.getAttribute('init');
	if (curInit.localeCompare('true') == 0)
	{
		const prevTile = player.parentNode;
		prevTile.setAttribute('free', 'true');
	}
	tileElement.appendChild(player);
	player.setAttribute('level', prevLevel);
	tileElement.setAttribute('free', 'false');
}

/*	switches the stage depending on the current player	*/

function switchStage(player)
{
	if (player.localeCompare('pl1') == 0)
	{
		if (stage == 0)
		{
			stage = 1;
			switchActivePlayer('pl2');
		}
		else
		{
			stage = 3;
			switchActivePlayer('build');
		}
	}
	else if (player.localeCompare('pl2') == 0)
	{
		if (stage == 1)
		{
			stage = 2;
			switchActivePlayer('pl1');
		}
		else
		{
			stage = 5;
			switchActivePlayer('build');
		}
	}
	else
	{
		if (stage == 3)
		{
			switchActivePlayer('pl2');
			stage = 4;
		}
		else
		{
			switchActivePlayer('pl1');
			stage = 2;
		}
	}
}

/*	switch which one is the active player	*/

function switchActivePlayer(player)
{
	if (player.localeCompare('pl1') == 0)
	{
		changeGuideTextP1();
		pl1.setAttribute('inPlay', 'true');
		p1.setAttribute('selected', 'false');
		p3.setAttribute('selected', 'false');
		pl2.setAttribute('inPlay', 'false');
	}
	else if (player.localeCompare('pl2') == 0)
	{
		changeGuideTextP2();
		pl2.setAttribute('inPlay', 'true');
		p2.setAttribute('selected', 'false');
		p4.setAttribute('selected', 'false');
		pl1.setAttribute('inPlay', 'false');
	}
	else
	{
		p1.setAttribute('selected', 'false');
		p2.setAttribute('selected', 'false');
		p3.setAttribute('selected', 'false');
		p4.setAttribute('selected', 'false');
	}
}

/*	switch tile color	*/

function switchTileColor(tileElement, prevLevel)
{
	if (prevLevel <= 3)
	{
		tileElement.setAttribute('level', prevLevel + 1);
		if (prevLevel == 0)
		{
			tileElement.textContent = 'LV1';
			tileElement.style.backgroundColor = 'white';
		}
		else if (prevLevel == 1)
		{
			tileElement.textContent = 'LV2';
			tileElement.style.backgroundColor = 'purple';
		}
		else if (prevLevel == 2)
		{
			tileElement.textContent = 'LV3';
			tileElement.style.backgroundColor = 'black';
		}
	}
	if (prevLevel == 3)
	{
		tileElement.textContent = 'LV4';
		tileElement.style.backgroundColor = 'blue';
		tileElement.setAttribute('free', 'false');
		/*countCompleteTowers++;
		if (cardPlayer1.localeCompare('Chronus') == 0 && countCompleteTowers > 5)
		{
			isGameOver = true;
			console.log("GAME OVER");
		}*/
	}
	switchStage('build');
}

function changeGuideTextP1()
{
	guide.style.color = 'red';
	if (stage == 0)
	{
		guide.textContent = 'Player 1: Place both pieces on the board';
	}
	else
		guide.textContent = 'Player 1: Move ';
}

function changeGuideTextP2()
{
	guide.style.color = 'blue';
	if (stage == 1)
		guide.textContent = 'Player 2: Place both pieces on the board';
	else
		guide.textContent = 'Player 2: Move ';
}

function changeGuideTextBuild()
{
	if (stage == 3)
		guide.textContent = 'Player 1: Build';
	else
		guide.textContent = 'Player 2: Build';
}

/*	checks if game is over	*/

function checkIfGameOver(prevLevel, player)
{
	//const cardPlayer1 = document.getAttribute('player1'); grab the parent
	//const cardPlayer2 = document.getAttribute('player2'); grab the parent
	if (prevLevel == 3)
	{
		isGameOver = true;
		gameOverDisplay(player);
	}
	/*else if (card.localeCompare('Minotaur') == 0)
	{
		let dif = prevLevel - level;
		if (dif <= -2)
		{
			isGameOver = true;
			console.log("GAME OVER");
			if (player.localeCompare('p1') == 0 || player.localeCompare('p3') == 0)
				console.log("PLAYER 1 WINS");
			if (player.localeCompare('p2') == 0 || player.localeCompare('p4') == 0)
				console.log("PLAYER 2 WINS");
		}
	}*/
}

function	gameOverDisplay(player)
{
	if (player.localeCompare('pl1') == 0)
		alert('GAME OVER\nPLAYER 1 WINS!');
	else if (player.localeCompare('pl2') == 0)
		alert('GAME OVER\nPLAYER 2 WINS!');
}

// make two pieces for each player
// change text of move / build text - have them be two seperate pieces?
// make God cards?
// make error messages or sound or add sound each time you click and move piece
// game over screen with winning player text?
// retry button

/*

- boxes that says G1, G2..etc.. and an option for playing with no god cards ex NONE
- if you hover over the box with the mouse - display in a text box what the God card gives you of attributes
- if you click the box the player whose turn it is to select a God card will get the God card attribute (would have to be in the beginning stage of the game before placing the pieces)

possible God cards

- Minotaur:
	Win condition: You also win if your worker moves down two or more levels.

- Chronus:
	Win condition: You also win when there are at least five Complete Towers on the board.

- Hera:
	Opponent's turn: An opponent cannot win by moving into a perimeter space.

- Zeus:
	Your build: Your worker may build a block under itself.

- Limus:
	Opponent's turn: opponent workers cannot build on spaces neighboring your workers, unless building a dome to create a Complete Tower.



add another thing called card:
if card == 'false'
	no card
if (card == 'Minotaur')
{
	let dif = prevLevel - level;
	if (dif <= -2)

}


*/

// bug if a player can't move any of their pieces - immediate lose?