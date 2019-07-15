class Grid {
  constructor(cellSize, gridSize) {
    this.cellSize = cellSize;
    this.gridSize = gridSize;
    this.data = [];
  }

  createGrid = () => {
    // create rows
    for (let i = 0; i < this.gridSize; i++) {
      this.data[i] = []
    }

    // create cols and insert cells
    for (let x = 0; x < this.gridSize; x++) {
      for (let y = 0; y < this.gridSize; y++) {
        this.data[x][y] = new Cell(false, this.cellSize * x, this.cellSize * y)
      }
    }
  }
}

class Cell {
  constructor(alive, x, y) {
    this.alive = alive;
    this.x = x;
    this.y = y;
  }

  toggle = () => {
    this.alive = !this.alive
  }
}

export default Grid;
