
//VARIABLES

/*
var grid = [];
var cellsScale = 4;
var fps = 3;
var rows = parseInt(canvas.height / cellsScale);
var cols = parseInt(canvas.width / cellsScale);
var cellsCount = 20;

console.log(rows);
console.log(cols)
*/

//return random int between min and max (inclusive max)
function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
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

module.exports = {
	
}