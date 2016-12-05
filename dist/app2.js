'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
//VARIABLES
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let rows = parseInt(canvasHeight / CELL_RATIO);
let cols = parseInt(canvasWidth / CELL_RATIO);
let FPS = 10;
let CELL_COUNT = 5000;
let CELL_RATIO = 4;
let CELL_COLOR = '';
let CANVAS_COLOR = '';

function setConfig() {
	CELL_COUNT = document.getElementById('cellCount').value || 6000;
	CELL_RATIO = document.getElementById('cellRatio').value || 4;
	rows = parseInt(canvasHeight / CELL_RATIO);
	cols = parseInt(canvasWidth / CELL_RATIO);
	CELL_COLOR = document.getElementById('cellColor').value || 'black';
	CANVAS_COLOR = document.getElementById('backgroundColor').value || 'white';
	canvas.style.backgroundColor = CANVAS_COLOR;	
	let configForm = document.getElementById('configForm').style.visibility = 'hidden';
	canvas.style.visibility = 'visible';
	init();
	start();
}
*/

//return random int between min and max
function randomInt(min, max) {
	return Math.floor(Math.random() * max) + min;
}

var Game = function () {
	function Game(settings) {
		_classCallCheck(this, Game);

		this.settings = settings;
		settings.canvasSelector = settings.canvasSelector || "#gameCanvas";
		settings.fps = settings.fps || 10;
		settings.cellColor = settings.cellColor || 'black';
		settings.backgroundColor = settings.backgroundColor || 'white';
		settings.cellsCount = settings.cellCount || 2000;
		settings.cellRatio = settings.cellRatio || 4;

		var canvas = document.querySelector(settings.canvasSelector);
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		this.rows = parseInt(canvas.height / settings.cellRatio);
		this.cols = parseInt(canvas.width / settings.cellRatio);
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");

		this.grid = this.generateGrid();
	}

	//INSIDE LOGIC METHODS


	_createClass(Game, [{
		key: 'generateGrid',
		value: function generateGrid() {
			var rows = this.rows;
			var cols = this.cols;
			var grid = [];
			for (var i = 0; i < rows; i++) {
				grid[i] = [];
				for (var j = 0; j < cols; j++) {
					grid[i][j] = 0;
				}
			}
			return grid;
		}
	}, {
		key: 'seedGrid',
		value: function seedGrid() {
			var rows = this.rows;
			var cols = this.cols;
			var cellsCount = this.settings.cellsCount;

			if (cellsCount > rows * cols) {
				cellsCount = rows * cols;
				console.log("To many cells");
			}

			for (var i = 0; i < cellsCount; i++) {
				var r = randomInt(0, rows);
				var c = randomInt(0, cols);
				while (this.grid[r][c] == 1) {
					r = randomInt(0, rows);
					c = randomInt(0, cols);
				}
				this.grid[r][c] = 1;
			};
		}
	}, {
		key: 'printGrid',
		value: function printGrid() {
			var rows = "";
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.grid[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var row = _step.value;

					for (var j = 0; j < this.cols; j++) {
						rows += row[j] + " ";
					}
					rows += "\n";
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			console.log(rows);
		}
	}, {
		key: 'getNeighboursSum',
		value: function getNeighboursSum(i, j) {
			return this.grid[i - 1][j - 1] + this.grid[i - 1][j] + this.grid[i - 1][j + 1] + this.grid[i][j - 1] + this.grid[i][j + 1] + this.grid[i + 1][j - 1] + this.grid[i + 1][j] + this.grid[i + 1][j + 1];
		}
	}, {
		key: 'nextCell',
		value: function nextCell(cell, n) {
			if (n >= 0 && n <= 8) {
				//Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
				if (n === 3 && cell === 0) return 1;else
					//Any live cell with fewer than two live neighbours dies, as if caused by under-population.
					//Any live cell with more than three live neighbours dies, as if by over-population.
					//Any live cell with two or three live neighbours lives on to the next generation.
					if (cell === 1 && (n === 2 || n === 3)) return 1;else return 0;
			} else return null;
		}
	}, {
		key: 'nextGrid',
		value: function nextGrid() {
			var rows = this.rows;
			var cols = this.cols;
			var grid = this.generateGrid();
			var n = 0;
			for (var i = 1; i < rows - 1; i++) {
				for (var j = 1; j < cols - 1; j++) {
					grid[i][j] = this.nextCell(this.grid[i][j], this.getNeighboursSum(i, j));
					n = 0;
				};
			};

			this.grid = grid;
			return grid;
		}

		//CANVAS INTERACTION METHODS

	}, {
		key: 'drawCell',
		value: function drawCell(x, y) {
			this.ctx.fillStyle = this.settings.cellColor;
			this.ctx.fillRect(y * this.settings.cellRatio, x * this.settings.cellRatio, this.settings.cellRatio, this.settings.cellRatio);
		}
	}, {
		key: 'drawGrid',
		value: function drawGrid() {
			var rows = this.rows;
			var cols = this.cols;
			for (var i = 0; i < rows; i++) {
				for (var j = 0; j < cols; j++) {
					if (this.grid[i][j] == 1) this.drawCell(i, j);
				};
			};
		}
	}, {
		key: 'clearCanvas',
		value: function clearCanvas() {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		}
	}, {
		key: 'nextTick',
		value: function nextTick() {
			this.clearCanvas();
			this.grid = this.nextGrid(this.grid);
			this.drawGrid(this.grid);
		}

		//GAME PROCCESS

	}, {
		key: 'start',
		value: function start() {
			g.generateGrid();
			g.seedGrid();
			g.drawGrid();
		}
	}]);

	return Game;
}();

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

var timer = void 0;
function render() {
	drawGrid(grid);
	timer = setTimeout(function () {
		requestAnimationFrame(render);
		tick();
	}, 1000 / FPS);
}

function start() {
	if (!grid.length) init();
	render();
}

function draw() {
	init();
	drawGrid(grid);
}

var g = new Game({ 'fps': 30, 'cellRatio': 6 });

g.start();
setInterval(function () {
	g.nextTick();
}, 300);