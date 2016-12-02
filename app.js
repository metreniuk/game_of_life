



var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');

//VARIABLES
var grid = [];
var FPS = 10;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var rows = parseInt(canvasHeight / CELL_RATIO);
var cols = parseInt(canvasWidth / CELL_RATIO);
var CELL_COUNT = 5000;
var CELL_RATIO = 4;
var CELL_COLOR = '';
var CANVAS_COLOR = '';

function setConfig() {
	CELL_COUNT = document.getElementById('cellCount').value || (rows * cols) / 4;
	CELL_RATIO = document.getElementById('cellRatio').value || 4;
	rows = parseInt(canvasHeight / CELL_RATIO);
	cols = parseInt(canvasWidth / CELL_RATIO);
	CELL_COLOR = document.getElementById('cellColor').value || 'black';
	CANVAS_COLOR = document.getElementById('backgroundColor').value || 'white';
	canvas.style.backgroundColor = CANVAS_COLOR;	
	var configForm = document.getElementById('configForm').style.visibility = 'hidden';
	canvas.style.visibility = 'visible';
	init();
	start();
}

init();

function init() {
	rows = parseInt(canvasHeight / CELL_RATIO);
	cols = parseInt(canvasWidth / CELL_RATIO);
	grid = generateGrid(rows, cols);
	grid = seedGrid(grid, CELL_COUNT);
	
}

function tick() {
	clearCanvas();
	grid = nextGrid(grid);
	drawGrid(grid);
}

var timer;
function render() {
	drawGrid(grid);
    timer = setTimeout(function() {
        requestAnimationFrame(render);
 		tick();
    }, 1000 / FPS); 
}

function start() {
	if (!grid.length) init();
	render();
}

function stop() {
	clearTimeout(timer);
}

function reset() {
	stop();	
	clearCanvas();
	grid = [];
}

function draw() {
	init();
	drawGrid(grid);
	printGrid(grid);
}

function printTwoDimArray(arr) {
	var rows = "";
	for(var i = 0; i < arr.length; i++) {
		for (var j = 0; j < arr[0].length; j++) {
			rows += arr[i][j] + " ";
		}
		rows += "\n";
	}
	console.log(rows)
}

//return random int between min and max
function randomInt(min, max) {
	return Math.floor(Math.random() * (max)) + min;
}

function generateGrid(rows, cols) {
	var grid = [];
	for(var i = 0; i < rows; i++) {
		grid[i] = [];
		for (var j = 0; j < cols; j++) {
			grid[i][j] = 0;
		}
	}

	return grid;
}

function seedGrid(grid, cellsCount) {
	var rows = grid.length;
	var cols = grid[0].length;

	if(cellsCount > (rows * cols)) {
		cellsCount = rows * cols;
		console.log("To many cells");
	}

	for (var i = 0; i < cellsCount; i++) {
		var r = randomInt(0, rows);
		var c = randomInt(0, cols);
		while (grid[r][c] == 1) {
			r = randomInt(0, rows);
			c = randomInt(0, cols);
		} 
		grid[r][c] = 1;
	};

	return grid;
}

function printGrid(grid) {
	printTwoDimArray(grid);
}

// args: cell - cell's value; n - neighbours alived
function nextCell(cell, n) {
	if (n >= 0 && n <= 8) {
		//Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
		if (n === 3 && cell === 0) return 1
			else
		//Any live cell with fewer than two live neighbours dies, as if caused by under-population.
		//Any live cell with more than three live neighbours dies, as if by over-population.
		//Any live cell with two or three live neighbours lives on to the next generation.
			if (cell === 1 && (n === 2 || n === 3)) return 1
				else return 0;
	} else return null;		
}



function nextGrid(oldGrid) {
	var rows = oldGrid.length;
	var cols = oldGrid[0].length;
	var grid = generateGrid(rows, cols);
	
	var i = 1, j = 1, n = 0;

	for (i = 1; i < rows - 1; i++) {
		for (j = 1; j < cols - 1; j++) {
			n = oldGrid[i-1][j-1] + oldGrid[i-1][j] + oldGrid[i-1][j+1] + oldGrid[i][j-1] + oldGrid[i][j+1] + oldGrid[i+1][j-1] + oldGrid[i+1][j] + oldGrid[i+1][j+1];
			grid[i][j] = nextCell(oldGrid[i][j], n);
			n = 0;
		};
	};

	return grid;
}

function drawGrid(grid) {
	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < cols; j++) {
			if(grid[i][j] == 1)
				drawCell(i, j);
		};
	};
}

//Canvas functions
function drawCell(x, y) {
	ctx.fillStyle = CELL_COLOR || 'black';
	ctx.fillRect(y * CELL_RATIO, x * CELL_RATIO, CELL_RATIO, CELL_RATIO);	
}

function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}




