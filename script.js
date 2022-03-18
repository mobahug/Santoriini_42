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

/*	grab hero cards	*/

const	minotaur = document.getElementById("Minotaur");
const	chronus = document.getElementById("Chronus");
const	hera = document.getElementById("Hera");
const	zeus = document.getElementById("Zeus");
const	limus = document.getElementById("Limus");
const	noCard = document.getElementById("NoCard");

minotaur.addEventListener('click', () => selectHero(minotaur));
chronus.addEventListener('click', () => selectHero(chronus));
hera.addEventListener('click', () => selectHero(hera));
zeus.addEventListener('click', () => selectHero(zeus));
limus.addEventListener('click', () => selectHero(limus));
noCard.addEventListener('click', () => selectHero(noCard));

resetButton.addEventListener('click', () => {
	window.location.reload();
});

let stage = -2;
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

guide.style.color = 'black';
guide.textContent = 'Player 1: Select God Card';

pl1.setAttribute('inPlay', 'true');
pl2.setAttribute('inPlay', 'false');
pl1.setAttribute('card', 'nocard');
pl2.setAttribute('card', 'nocard');

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
	if (stage >= 0)
	{
		let selected = player.getAttribute('selected');
		player2.setAttribute('selected', 'false');
		if (selected.localeCompare('false') == 0)
		{
			player.setAttribute('selected', 'true');
		}
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

/*	assign card attribute to player	*/

function	selectHero(card)
{
	let picked = card.getAttribute('selected');
	if ((stage == -2 || stage == -1) && picked.localeCompare('false') == 0)
	{
		let inPlay1 = pl1.getAttribute('inPlay');
		let inPlay2 = pl2.getAttribute('inPlay');
		let godCard = card.getAttribute('id');

		if (inPlay1.localeCompare('true') == 0)
		{
			pl1.setAttribute('card', godCard);
			switchStage('pl1');
		}
		else if (inPlay2.localeCompare('true') == 0)
		{
			pl2.setAttribute('card', godCard);
			switchStage('pl2');
		}
		card.setAttribute('selected', 'true');
	}
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
	if (free.localeCompare('true') == 0 && stage >= 0)
	{
		if (selected1.localeCompare('true') == 0 && (stage == 0))
		{
			if (pl1.children.length == 1 && init1.localeCompare('true') == 0 && stage == 0)
				return (false);
			moveCheckPlace1(p1, tileElement, prevLevel, 'pl1', init1, init3);
		}
		else if (selected3.localeCompare('true') == 0 && (stage == 0))
		{
			if (pl1.children.length == 1 && init3.localeCompare('true') == 0 && stage == 0)
				return (false);
			moveCheckPlace1(p3, tileElement, prevLevel, 'pl1', init3, init1);
		}
		else if (selected2.localeCompare('true') == 0 && (stage == 1))
		{
			if (pl2.children.length == 1 && init2.localeCompare('true') == 0 && stage == 1)
				return (false);
			moveCheckPlace1(p2, tileElement, prevLevel, 'pl2', init2, init4);
		}
		else if (selected4.localeCompare('true') == 0 && (stage == 1))
		{
			if (pl2.children.length == 1 && init4.localeCompare('true') == 0 && stage == 1)
				return (false);
			moveCheckPlace1(p4, tileElement, prevLevel, 'pl2', init4, init2);
		}
		else
		{
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
			else
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
}

/*	function called in initialization fase	*/

function moveCheckPlace1(player, tileElement, prevLevel, name, init, init2)
{
	movePlayer(player, tileElement, prevLevel);
	player.setAttribute('init', 'true');
	if (init.localeCompare('false') == 0 && init2.localeCompare('false') == 0)
		return (false);
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
	switchStage(name);
	changeGuideTextBuild();
}

/*	checks if valid position player is trying to move to	*/
/*	checks if it's free to move there	*/
/*	checks that player doesn't try to move heigher up that possible	*/
/*	checks player try to move inside 3x3 square	*/

function checkIfValidMove(player, tileElement, prevLevel)
{
	const playerCard = pl1.getAttribute('card');
	const level = player.getAttribute('level');
	const piece = player.getAttribute('class');

	var nbr = Number(piece.match(/\d+/)[0]);
	let dif = prevLevel - level;
	if (dif >= 2)
		return (false);
	else if (dif <= -2 && playerCard.localeCompare('Minotaur') == 0)
	{
		if (nbr == 1 || nbr == 3)
			gameOverDisplay('pl1');
		else if (nbr == 2 || nbr == 4)
			gameOverDisplay('pl2');
	}
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
	console.log(stage);
	if (player.localeCompare('pl1') == 0)
	{
		if (stage == -2)
		{
			stage = -1;
			switchActivePlayer('pl2');
		}
		else if (stage == 0)
		{
			stage = 1;
			switchActivePlayer('pl2');
		}
		else if (stage == 2)
		{
			stage = 3;
			switchActivePlayer('build');
		}
	}
	else if (player.localeCompare('pl2') == 0)
	{
		if (stage == -1)
		{
			stage = 0;
			switchActivePlayer('pl1');
		}
		else if (stage == 1)
		{
			stage = 2;
			switchActivePlayer('pl1');
		}
		else if (stage == 4)
		{
			stage = 5;
			switchActivePlayer('build');
		}
	}
	else
	{
		if (stage == 3)
		{
			stage = 4;
			switchActivePlayer('pl2');
		}
		else if (stage == 5)
		{
			stage = 2;
			switchActivePlayer('pl1');
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

function switchTileColor(tileElement, prevLevel, name)
{
	const player1Card = pl1.getAttribute('card');
	const player2Card = pl2.getAttribute('card');
	
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
		countCompleteTowers++;
		if (countCompleteTowers >= 5)
		{
			if (player1Card.localeCompare('Chronus') == 0)
				gameOverDisplay('pl1');
			else if (player2Card.localeCompare('Chronus') == 0)
				gameOverDisplay('pl2');
		}
		/*
		const playerCard = pl1.getAttribute('card');
	const level = player.getAttribute('level');
	const piece = player.getAttribute('class');*/
	}
	switchStage('build');
}

function changeGuideTextGodCard()
{
	guide.style.color = 'black';
	if (stage == -1)
	{
		guide.textContent = 'Player 2: Select God Card';
	}
}

function changeGuideTextP1()
{
	guide.style.color = 'red';
	if (stage == 0)
	{
		guide.textContent = 'Player 1: Place both pieces on the board';
	}
	else if (stage == 2)
		guide.textContent = 'Player 1: Move ';
}

function changeGuideTextP2()
{
	guide.style.color = 'blue';
	if (stage == 1)
		guide.textContent = 'Player 2: Place both pieces on the board';
	else if (stage == 4)
		guide.textContent = 'Player 2: Move ';
}

function changeGuideTextBuild()
{
	if (stage == 3)
	{
		guide.style.color = 'red';
		guide.textContent = 'Player 1: Build';
	}
	else if (stage == 5)
	{
		guide.style.color = 'blue';
		guide.textContent = 'Player 2: Build';
	}
}

/*	checks if game is over	*/

function checkIfGameOver(prevLevel, player)
{
	if (prevLevel == 3)
	{
		isGameOver = true;
		if (player.localeCompare('pl1') == 0)
			gameOverDisplay('pl1');
		else
			gameOverDisplay('pl2');
	}
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