//args: arr - array with values
//return: sum of array elements
function arraySum(arr) {
	return arr.reduce(function(a, b) { return a + b }, 0);
}

function randomInt(min, max) {
	min = Math.ceil(min);
  	max = Math.floor(max);
  	return Math.floor(Math.random() * (max - min)) + min;
}

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

var game = require('./game.js');

//TEST randomInt
/*
console.log("TEST randomInt(5, 100):");
for (var i = 0; i < 10000; i++) {
	if(randomInt(5, 100) > 100 || randomInt(5, 100) < 0)
		console.log("randomInt failed");
};
console.log("randomInt passed");
*/

//TEST generateGrid
/*
var grid1 = game.generateGrid(10,10);
var k = 0;
var rows = grid1.length;
var cols = grid1[0].length;
for(var i = 0; i < rows; i++) {
	for (var j = 0; j < cols; j++) {
		if(grid1[i][j] == 0) k++
	}
}
var grid1 = game.generateGrid(10, 10);
console.log("TEST generateGrid(10,10):");
console.log("Number of cells: " + k);
console.log("Shoul be: " + rows * cols);
*/

//TEST printGrid

/*
var grid1 = game.generateGrid(10, 10);
game.printGrid(grid1);
*/

//TEST seedGrid

var grid1 = game.generateGrid(400,400);
var k = 0;
var c = 1000;
var grid2 = game.seedGrid(grid1, c);
var rows = grid1.length;
var cols = grid1[0].length;

for(var i = 0; i < rows; i++) {
	for (var j = 0; j < cols; j++) {
		if(grid1[i][j] == 1) k++
	}
}
console.log("TEST seedGrid");
game.printGrid(grid2);
console.log("cellsCount " + c + "\ncells alive " + k);


//TEST arraySum
/*

var arr = [1, 2, 3, 4, 5];
console.log("arraySum test\nComputed " + arraySum(arr) + "\nShould be: 15");
*/

//TEST nextCell

/*

console.log("nextCell test");
//By rules
//#1
console.log("#1");
console.log("Computed: " + nextCell(1, 0) + "\nShould be: 0");
console.log("Computed: " + nextCell(1, 1) + "\nShould be: 0");
//#2
console.log("#2");
console.log("Computed: " + nextCell(1, 2) + "\nShould be: 1");
console.log("Computed: " + nextCell(1, 3) + "\nShould be: 1");
//#3
console.log("#3");
console.log("Computed: " + nextCell(1, 4) + "\nShould be: 0");
console.log("Computed: " + nextCell(1, 5) + "\nShould be: 0");
//#4
console.log("#4");
console.log("Computed: " + nextCell(0, 3) + "\nShould be: 1");
//#5
console.log("#5");
console.log("Computed: " + nextCell(0, 23) + "\nShould be: null");
*/

//TEST nextGrid
/*
function nextGrid(oldGrid) {
	var rows = oldGrid.length;
	var cols = oldGrid[0].length;
	var grid = game.generateGrid(rows, cols);
	
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
var grid1 = game.generateGrid(50, 50);

*/