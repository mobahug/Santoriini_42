const mapDisplay = document.querySelector('.parent');
const p1 = document.querySelector('.player1');
const p2 = document.querySelector('.player2');
const guide = document.querySelector('.guide');

let stage = 0;
let isGameOver = false;
let count = 0;

const rows = [
	['', '', '', '', ''],
	['', '', '', '', ''],
	['', '', '', '', ''],
	['', '', '', '', ''],
	['', '', '', '', '']
]

/*	initiate players	*/

p1.setAttribute('level', 0);
p1.setAttribute('selected', 'false');
p1.setAttribute('inPlay', 'true');
p1.addEventListener('click', () => handleClickPlayer(p1));

p2.setAttribute('level', 0);
p2.setAttribute('selected', 'false');
p2.setAttribute('inPlay', 'false');
p2.addEventListener('click', () => handleClickPlayer(p2));

function handleClickPlayer(player)
{
	let selected = player.getAttribute('selected');
	if (selected.localeCompare('false') == 0)
		player.setAttribute('selected', 'true');
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
	let inPlay1 = p1.getAttribute('inPlay');
	let inPlay2 = p2.getAttribute('inPlay');
	console.log(stage);
	if (selected1.localeCompare('true') == 0 && (stage == 0 || stage == 2))
	{
		movePlayer(p1, tileElement, prevLevel);
		checkIfGameOver(prevLevel);
		switchStage('p1');
	}
	else if (selected2.localeCompare('true') == 0 && (stage == 1 || stage == 4))
	{
		movePlayer(p2, tileElement, prevLevel);
		checkIfGameOver(prevLevel);
		switchStage('p2');
	}
	else if (stage == 3 || stage == 5)
	{
		if (inPlay1.localeCompare('true') == 0)
		{
			if (checkIfValidMove(p1, tileElement, prevLevel, free) == false)
				return (false);
			movePlayer(p1, tileElement, prevLevel);
			checkIfGameOver(prevLevel);
			p1.setAttribute('inPlay', 'false');
		}
		else if (inPlay2.localeCompare('true') == 0)
		{
			if (checkIfValidMove(p2, tileElement, prevLevel, free) == false)
				return (false);
			movePlayer(p2, tileElement, prevLevel);
			checkIfGameOver(prevLevel);
			p2.setAttribute('inPlay', 'false');
		}
		else if (free.localeCompare('true') == 0)
			switchTileColor(tileElement, prevLevel);
	}
}

/*	checks if valid position player is trying to move to	*/
/*	checks if it's free to move there	*/
/*	checks that player doesn't try to move heigher up that possible	*/
/*	checks player try to move inside 3x3 square	*/

function checkIfValidMove(player, tileElement, prevLevel, free)
{
	const level = player.getAttribute('level');
	let dif = prevLevel - level;
	if (free.localeCompare('false') == 0)
	{
		//return error message to user
		return (false);
	}
	else if (dif >= 2)
	{
		//return error message to user
		return (false);
	}
	else
	{
		if (checkIfTileIsCloseEnough(player, tileElement) == false)
		{
			//return error message to user
			return (false);
		}
	}
	// need to check if its in the 3x3 square of the player
	// current level (prevlevel+1) cannot be more than 1 heigher than current
}

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
}

/*	move player	*/

function movePlayer(player, tileElement, prevLevel)
{
	const prevTile = player.parentNode;
	prevTile.setAttribute('free', 'true');
	tileElement.appendChild(player);
	player.setAttribute('level', prevLevel);
	tileElement.setAttribute('free', 'false');
}

/*	switches the stage depending on the current player	*/

function switchStage(player)
{
	if (player.localeCompare('p1') == 0)
	{
		if (stage == 0)
		{
			stage = 1;
			switchActivePlayer('p2');
		}
		else
		{
			stage = 3;
			switchActivePlayer('build');
		}
	}
	else if (player.localeCompare('p2') == 0)
	{
		if (stage == 1)
		{
			stage = 2;
			switchActivePlayer('p1');
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
			switchActivePlayer('p2');
			stage = 4;
		}
		else
		{
			switchActivePlayer('p1');
			stage = 2;
		}
	}
}

/*	switch which one is the active player	*/

function switchActivePlayer(player)
{
	if (player.localeCompare('p1') == 0)
	{
		p1.setAttribute('inPlay', 'true');
		p1.setAttribute('selected', 'false');
		p2.setAttribute('inPlay', 'false');
	}
	else if (player.localeCompare('p2') == 0)
	{
		p2.setAttribute('inPlay', 'true');
		p2.setAttribute('selected', 'false');
		p1.setAttribute('inPlay', 'false');
	}
	else
	{
		p1.setAttribute('selected', 'false');
		p2.setAttribute('selected', 'false');
	}
}

/*	switch tile color	*/

function switchTileColor(tileElement, prevLevel)
{
	if (prevLevel <= 3)
	{
		tileElement.setAttribute('level', prevLevel + 1);
		if (prevLevel == 0)
			tileElement.style.backgroundColor = 'white';
		else if (prevLevel == 1)
			tileElement.style.backgroundColor = 'purple';
		else if (prevLevel == 2)
			tileElement.style.backgroundColor = 'black';
	}
	if (prevLevel == 3)
	{
		tileElement.style.backgroundColor = 'blue';
		tileElement.setAttribute('free', 'false');
	}
	switchStage('build');
}

/*	checks if game is over	*/

function checkIfGameOver(prevLevel)
{
	if (prevLevel == 3)
	{
		isGameOver = true;
		console.log("GAME OVER");
	}
}

//Need to fix so you can't just build wherever you want but also contain that to where your players are touching
//make error messages
//change text of move / build text
//game over screen with winning player text? then restart the game afterwards
//