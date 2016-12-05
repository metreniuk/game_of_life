
//return random int between min and max
function randomInt(min, max) {
	return Math.floor(Math.random() * (max)) + min;
}

class Game {
	constructor(settings) {

		this.settings = settings;	
		settings.canvasSelector = settings.canvasSelector || "#gameCanvas";
		settings.fps = parseInt(settings.fps) || 10;
		settings.cellColor = settings.cellColor || 'black';
		settings.backgroundColor = settings.backgroundColor || 'white';
		settings.cellsCount = parseInt(settings.cellCount) || 10000;
		settings.cellRatio = parseInt(settings.cellRatio) || 4;
		
		console.log(this.settings);

		let canvas = document.querySelector(settings.canvasSelector);
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		this.rows = parseInt(canvas.height / settings.cellRatio);
		this.cols = parseInt(canvas.width / settings.cellRatio);
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");
		canvas.style.backgroundColor = settings.backgroundColor;

		this.grid = this.generateGrid();
	}

	//INSIDE LOGIC METHODS
	generateGrid() {
		let rows = this.rows;
		let cols = this.cols;
		let grid = [];
		for(let i = 0; i < rows; i++) {
			grid[i] = [];
			for (let j = 0; j < cols; j++) {
				grid[i][j] = 0;
			}
		}
		return grid;
	}

	seedGrid() {
		let rows = this.rows;
		let cols = this.cols;
		let cellsCount = this.settings.cellsCount;

		if(cellsCount > (rows * cols)) {
			cellsCount = rows * cols;
			console.log("To many cells");
		}

		for (let i = 0; i < cellsCount; i++) {
			let r = randomInt(0, rows);
			let c = randomInt(0, cols);
			while (this.grid[r][c] == 1) {
				r = randomInt(0, rows);
				c = randomInt(0, cols);
			} 
			this.grid[r][c] = 1;
		};
	}

	printGrid() {
		let rows = "";
		for(let row of this.grid) {
			for (let j = 0; j < this.cols; j++) {
				rows += row[j] + " ";
			}
			rows += "\n";
		}
		console.log(rows);
	}

	getNeighboursSum(i, j) {
		return this.grid[i-1][j-1] + this.grid[i-1][j] + this.grid[i-1][j+1] + this.grid[i][j-1] + this.grid[i][j+1] + this.grid[i+1][j-1] + this.grid[i+1][j] + this.grid[i+1][j+1];
	}

	nextCell(cell, n) {
		if (n >= 0 && n <= 8) {
			//Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
			if (n === 3 && cell === 0) return 1
				else
			//Any live cell with fewer than two live neighbours dies, as if caused by under-population.
			//Any live cell with more than three live neighbours dies, as if by over-population.
			//Any live cell with two or three live neighbours lives on to the next generation.
				if (cell === 1 && (n === 2 || n === 3)) return 1
					else return 0;
		} else 
			return null;	
	}

	nextGrid() {
		let grid = this.generateGrid();
		let n = 0;
		for (let i = 1; i < this.rows - 1; i++) {
			for (let j = 1; j < this.cols - 1; j++) {
				grid[i][j] = this.nextCell(this.grid[i][j], this.getNeighboursSum(i, j));
				n = 0;
			};
		};
		this.grid = grid;
		return grid;
	}

	//CANVAS INTERACTION METHODS
	drawCell(x, y) {
		this.ctx.fillStyle = this.settings.cellColor;
		this.ctx.fillRect(y * this.settings.cellRatio, x * this.settings.cellRatio, this.settings.cellRatio, this.settings.cellRatio);	
	}

	drawGrid() {
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				if(this.grid[i][j] == 1)
					this.drawCell(i, j);
			};
		};
	}

	clearCanvas() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	nextTick() {
		this.clearCanvas();
		this.grid = this.nextGrid(this.grid);
		this.drawGrid(this.grid);
	}

	//GAME PROCCESS
	start() {
		g.generateGrid();
		g.seedGrid();
		g.drawGrid();
	}
}

const g = new Game({'fps': 30, 
	'cellRatio': 5, 
	'cellsCount': "sdf",
	'backgroundColor': 'ewrewr',
	'cellColor': 'asdsad'
});


g.start()
setInterval(() => {
	g.nextTick()
}, 300)
