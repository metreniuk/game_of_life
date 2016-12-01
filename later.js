function nextGrid(oldGrid) {
	var grid = oldGrid;
	var rows = grid.length;
	var cols = grid[0].length;
	var i = 0, j = 0, n = 0;

	for (i = 0; i < rows; i++) {
		for (j = 0; j < cols; j++) {
			
			//corners
			if (i == 0 && j == 0) {
				n = grid[i][j+1] + grid[i+1][j] + grid[i+1][j+1];
			} else

			if (i == 0 && j == cols - 1) {
				n = grid[i][j-1] + grid[i+1][j-1] + grid[i+1][j];
			} else

			if (i == rows - 1 && j == 0) {
				n = grid[i-1][j] + grid[i-1][j+1] + grid[i][j+1];
			} else

			if (i == rows - 1 && j == cols -1) {
				n = grid[i-1][j-1] + grid[i-1][j] + grid[i][j-1];
			} else
		//borders
			if (i == 0 && j != 0) {
				n = grid[i][j-1] + grid[i][j+1] + grid[i+1][j-1] + grid[i+1][j] + grid[i+1][j+1];
			} else

			if (j == 0 && i != 0) {
				n = grid[i-1][j] + grid[i-1][j+1] + grid[i][j+1] + grid[i+1][j] + grid[i+1][j+1];
			} else

			if (i == rows - 1) {
				n = grid[i-1][j-1] + grid[i-1][j] + grid[i-1][j+1] + grid[i][j-1] + grid[i][j+1];
			} else

			if (j == cols - 1) {
				n = grid[i-1][j-1] + grid[i-1][j] + grid[i][j-1] + grid[i+1][j-1] + grid[i+1][j];
			} else
		//inside
			n = grid[i-1][j-1] + grid[i-1][j] + grid[i-1][j+1] + grid[i][j-1] + grid[i][j+1] + grid[i+1][j-1] + grid[i+1][j] + grid[i+1][j+1];

			console.log(n);
			game.printGrid(grid);
			grid[i][j] = nextCell(grid[i][j], n);
			console.log(nextCell(grid[i][j], n))

		};
	};

	return grid;
}

var str = "15bo31b$16bo30b$14b3o30b6$44bo2b$44bobo$obo11bo29b2ob$b2o11b4o29b$bo13b4o10b2o16b$4b2o9bo2bo9bobo16b$4b2o9b4o8b3o8b2o7b$14b4o8b3o9b2o7b$14bo12b3o17b$28bobo16b$6b2o21b2o16b$7b2o38b$6bo40b$37b2o8b$37bobo7b$37bo";
	console.log(str);

	var o = [], b = [], oCount = [];
	var r = str.split('$');
	console.log(r);
	for (var i in r) {
		oCount.push(r[i].match(/o/))
		o.push(r[i].split('o'));
	}
	console.log(o);