
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
	min = Math.ceil(min);
  	max = Math.floor(max);
  	return Math.floor(Math.random() * (max - min)) + min;
}

exports.generateGrid = function(rows, cols) {
	var grid = [];
	for(var i = 0; i < rows; i++) {
		grid[i] = [];
		for (var j = 0; j < cols; j++) {
			grid[i][j] = 0;
		}
	}

	return grid;
}

exports.seedGrid = function(grid, cellsCount) {
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

exports.printGrid = function(grid) {
	printTwoDimArray(grid);
}

//
// grid1 - current grid; grid2 - next grid; i, j - indexes
exports.isAlive = function(grid, i, j) {
	if (grid[i][j] == 1)
		return true
	else 
		return false;
}
