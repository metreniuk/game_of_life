
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

//Canvas functions
function drawCell(x, y) {
	ctx.fillRect(x * ratio, y * ratio, ratio, ratio);	
}

/*
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
		for (var j = 0; j < cols; j++) {
			if(grid[i][j] == 1)
				drawCell(i, j);
		};
	};

}
*/

//n - neighbours alived
function nextCell(cell, i, j, n) {
	//Any live cell with fewer than two live neighbours dies, as if caused by under-population.
	//Any live cell with more than three live neighbours dies, as if by over-population.
	if ((n < 2 || n > 3) && cell == 1) cell == 0;
	//Any live cell with two or three live neighbours lives on to the next generation.
	if ((n == 2 || n == 3) && cell == 1) cell == 1;
	//Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
	if (n == 3 && cell == 0) cell == 1;
	
	return cell;
}

function isBorderCell(grid, i, j) {

}

//n - neighbours alived
function nextGrid(oldGrid) {
	var grid = oldGrid.slice();
	var rows = grid.length;
	var cols = grid[0].length;
	var i = 0, j = 0, n = 0;

//corners
	if (i == 0 && j == 0) {
		n = grid[i][j+1] + grid[i+1][j] + grid[i+1][j+1];
	}

	if (i == 0 && j == cols - 1) {
		n = grid[i][j-1] + grid[i+1][j-1] + grid[i+1][j];
	}

	if (i == rows - 1 && j == 0) {
		n = grid[i-1][j] + grid[i-1][j+1] + grid[i][j+1];
	}

	if (i == rows - 1 && j == cols -1) {
		n = grid[i-1][j-1] + grid[i-1][j] + grid[i][j-1];
	}
//borders
	if (i == 0) {
		n = grid[i][j-1] + grid[i][j+1] + grid[i+1][j-1] + grid[i+1][j] + grid[i+1][j+1];
	}

	if (j == 0) {
		n =  grid[i-1][j] + grid[i-1][j+1] + grid[i][j+1] + grid[i+1][j] + grid[i+1][j+1];
	}

	if (i == rows - 1) {
		n = grid[i-1][j-1] + grid[i-1][j] + grid[i-1][j+1] + grid[i][j-1] + grid[i][j+1];
	}

	if (j == cols - 1) {
		n = grid[i-1][j-1] + grid[i-1][j] + grid[i][j-1] + grid[i+1][j-1] + grid[i+1][j];
	}
//inside
	n = grid[i-1][j-1] + grid[i-1][j] + grid[i-1][j+1] + grid[i][j-1] + grid[i][j+1] + grid[i+1][j-1] + grid[i+1][j] + grid[i+1][j+1];
	//Any live cell with fewer than two live neighbours dies, as if caused by under-population.
	//Any live cell with more than three live neighbours dies, as if by over-population.
	if ((n < 2 || n > 3) && grid1[i][j] == 1) grid2[i][j] == 0;
	//Any live cell with two or three live neighbours lives on to the next generation.
	if ((n == 2 || n == 3) && grid1[i][j] == 1) grid2[i][j] == 1;
	//Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
	if (n == 3 && grid1[i][j] == 0) grid2[i][j] == 1;

	return grid2;
}
