

var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');

//VARIABLES
var grid = [];
var CELL_RATIO = 8;
var FPS = 5;
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var rows = parseInt(canvasHeight / CELL_RATIO);
var cols = parseInt(canvasWidth / CELL_RATIO);
var CELL_COUNT = 1000;
var CELL_COLOR = '';
var CANVAS_COLOR = '';

canvas.style.backgroundColor = CANVAS_COLOR;

//init
init();

//fullScreen();

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

function fullScreen () {
	ctx.canvas.width  = window.innerWidth;
	ctx.canvas.height = window.innerHeight;

	rows = parseInt(window.innerWidth / CELL_RATIO);
	cols = parseInt(window.innerHeight / CELL_RATIO);
	grid = generateGrid(rows, cols);
	grid = seedGrid(grid, CELL_COUNT);
	start();
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




