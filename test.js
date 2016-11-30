function randomInt(min, max) {
	return Math.floor(Math.random() * (max)) + min;
}

var game = require('./app.js');

//TEST randomInt

/*
var one = 0, zero = 0;
for (var i = 0; i < 10000; i++) {
	if(game.randomInt(0, 1) == 0)
		zero++
	else
		one++
};
console.log("TEST randomInt(0, 1):");
console.log('zero ' + zero + '\none ' + one);
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

var grid1 = game.generateGrid(10,10);
var k = 0;
var c = 10;
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


