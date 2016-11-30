var app = require('./app.js');

//TEST randomInt
/*
var one = 0, zero = 0;
for (var i = 0; i < 10000; i++) {
	if(randomInt(0, 1) == 0)
		zero++
	else
		one++
};
console.log('zero ' + zero + '\none ' + one);
*/

//TEST generateGrid
/*
var grid1 = generateGrid(10,10);
var k = 0;
var rows = grid1.length;
var cols = grid1[0].length
for(var i = 0; i < rows; i++) {
	for (var j = 0; j < cols; j++) {
		if(grid1[i][j] == 0) k++
	}
}
console.log(grid1.toString());
*/

//TEST seedGrid
/*
var k = 0;
var c = 50
var grid2 = seedGrid(generateGrid(50,50), c);

for(var i = 0; i < rows; i++) {
	for (var j = 0; j < cols; j++) {
		if(grid2[i][j] == 1) k++
	}
}
console.log("cellCount " + c + "\n cells alive " + k);
*/

//TEST printGrid

var grid1 = generateGrid(10, 10);
printGrid(grid1);
