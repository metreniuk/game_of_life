
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

var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');

//VARIABLES
var grid = [];
var ratio = 4;
var fps = 3;
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var rows = parseInt(canvasHeight / ratio);
var cols = parseInt(canvasWidth / ratio);
var cellsCount = 10;

grid = generateGrid(rows, cols);
grid = seedGrid(grid, 10);

function draw() {
	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < rows; j++) {
			if(grid[i][j] == 1)
				ctx.fillRect(i * ratio, j * ratio, ratio, ratio);	
		};
	};
}
draw();