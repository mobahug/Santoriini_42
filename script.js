const mapDisplay = document.querySelector('.parent');
const p1 = document.querySelector('.player1');
const p2 = document.querySelector('.player2');

let stage = 0;
let isGameOver = false;

const rows = [
	['', '', '', '', ''],
	['', '', '', '', ''],
	['', '', '', '', ''],
	['', '', '', '', ''],
	['', '', '', '', '']
]

p1.setAttribute('level', 0);
p1.setAttribute('selected', 'false');
p1.addEventListener('click', () => handleClickPlayer(p1));

p2.setAttribute('level', 0);
p2.setAttribute('selected', 'false');
p2.addEventListener('click', () => handleClickPlayer(p2));

function handleClickPlayer(player)
{
	let selected = player.getAttribute('selected');
	if (selected.localeCompare('false') == 0)
	{
		player.setAttribute('selected', 'true');
	}
}

rows.forEach((row, rowIndex) => {
	const rowElement = document.createElement('div');
	rowElement.setAttribute('id', 'row-' + rowIndex);
	rowElement.setAttribute('class', 'container');
	row.forEach((tile, tileIndex) => {
		const tileElement = document.createElement('div');
		tileElement.setAttribute('id', 'row-' + rowIndex + '-tile-' + tileIndex);
		tileElement.setAttribute('level', 0);
		tileElement.setAttribute('free', 'true');
		tileElement.setAttribute('ondrop', 'drop(event)');
		tileElement.setAttribute('ondragover', 'allowDrop(event)');
		tileElement.classList.add('tile');
		//tileElement.onclick = function () { toggleTile(tileElement.id) }
		tileElement.addEventListener('click', () => handleClick(tileElement));
		rowElement.append(tileElement);
	})
	mapDisplay.append(rowElement);
})

function handleClick(tileElement)
{
	//if player.level = current tile - 1 || + 1
			//	change level = level + 1
	let prevLevel = Number(tileElement.getAttribute('level'));
	let selected1 = p1.getAttribute('selected');
	let selected2 = p2.getAttribute('selected');
	if (selected1.localeCompare('true') == 0)// && (stage == 0 || stage == 2))
	{
		tileElement.appendChild(p1);
		p1.addEventListener('click', () => handleClickPlayer(p2));
		p1.setAttribute('selected', 'false');
		p1.setAttribute('level', prevLevel);
		if (prevLevel == 3)
		{
			isGameOver = true;
		}
		//stage = 2;
	}
	else if (selected2.localeCompare('true') == 0)// && (stage == 1 || stage == 4))
	{
		tileElement.appendChild(p2);
		p2.addEventListener('click', () => handleClickPlayer(p2));
		p2.setAttribute('selected', 'false');
		p2.setAttribute('level', prevLevel);
		if (prevLevel == 3)
		{
			isGameOver = true;
		}
		//stage = 1;
	}
	else// if (stage == 3 || stage == 5)
	{
		if (prevLevel <= 4)
		{
			tileElement.setAttribute('level', prevLevel + 1);
			console.log(prevLevel);
			if (prevLevel == 0)
				tileElement.style.backgroundColor = 'white';
			else if (prevLevel == 1)
				tileElement.style.backgroundColor = 'purple';
			else if (prevLevel == 2)
				tileElement.style.backgroundColor = 'yellow';
			else if (prevLevel == 3)
				tileElement.style.backgroundColor = 'black';
		}
		if (prevLevel == 4)
			tileElement.style.backgroundColor = 'blue';
	}
}
/*
function allowDrop(ev) {
	ev.preventDefault();
	ev.dataTransfer.setData("text", ev.target.id);
}

function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
	ev.preventDefault();
	var data = ev.dataTransfer.getData("text");
	ev.target.appendChild(document.getElementById(data));
}*/