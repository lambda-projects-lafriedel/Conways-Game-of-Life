class Grid {
  constructor(cellSize, gridSize) {
    this.cellSize = cellSize;
    this.gridSize = gridSize;
    this.data = [];
    this.buffer = [];
  }

  createGrids = () => {
    // create rows
    for (let i = 0; i < this.gridSize / this.cellSize; i++) {
      this.data[i] = [];
      this.buffer[i] = [];
    }

    // create cols and insert cells
    for (let x = 0; x < this.gridSize / this.cellSize; x++) {
      for (let y = 0; y < this.gridSize / this.cellSize; y++) {
        this.data[x][y] = new Cell(false, this.cellSize * x, this.cellSize * y);
        this.buffer[x][y] = new Cell(
          false,
          this.cellSize * x,
          this.cellSize * y
        );
      }
    }
  };

  generateRandomFirstGen = () => {
    this.clearGridAndBuffer();
    for (let x = 0; x < this.gridSize / this.cellSize; x++) {
      for (let y = 0; y < this.gridSize / this.cellSize; y++) {
        if (Math.random() < 0.25) {
          this.data[x][y].alive = true;
        }
      }
    }
  };

  getNeighborStates = (x, y) => {
    let aliveNeighbors = 0;
    let neighbors = [];
    // if the cell is not on the top edge -- FIXED
    if (y > 0) {
      // if the cell is not on the top AND not on left edge -- FIXED
      if (x > 0) {
        // get cell northwest -- FIXED
        if (this.data[x - 1][y - 1].alive) {
          aliveNeighbors++;
          neighbors.push(this.data[x - 1][y - 1]);
        }
      }

      // if the cell is not on the top AND not on right edge -- FIXED
      if (x < (this.gridSize / this.cellSize) - 1) {
        // get cell northeast -- FIXED
        if (this.data[x + 1][y - 1].alive) {
          aliveNeighbors++;
          neighbors.push(this.data[x + 1][y - 1]);
        }
      }

      // get cell north -- FIXED
      if (this.data[x][y - 1].alive) {
        aliveNeighbors++;
        neighbors.push(this.data[x][y - 1]);
      }
    }

    // if the cell is not on the bottom edge -- FIXED
    if (y < (this.gridSize / this.cellSize) - 1) {
      // if the cell is not on bottom AND not on left edge -- FIXED
      if (x > 0) {
        // get cell southwest -- FIXED
        if (this.data[x - 1][y + 1].alive) {
          aliveNeighbors++;
          neighbors.push(this.data[x - 1][y + 1]);
        }
      }

      // if the cell is not on bottom AND not on right edge -- FIXED
      if (x < (this.gridSize / this.cellSize) - 1) {
        // get cell southeast -- FIXED
        if (this.data[x + 1][y + 1].alive) {
          aliveNeighbors++;
          neighbors.push(this.data[x + 1][y + 1]);
        }
      }

      // get cell south -- FIXED
      if (this.data[x][y + 1].alive) {
        aliveNeighbors++;
        neighbors.push(this.data[x][y + 1]);
      }
    }

    // if the cell is not on the left edge -- FIXED
    if (x > 0) {
      // get cell west -- FIXED
      if (this.data[x - 1][y].alive) {
        aliveNeighbors++;
        neighbors.push(this.data[x - 1][y]);
      }
    }

    // if the cell is not on the right edge -- FIXED
    if (x < (this.gridSize / this.cellSize) - 1) {
      // get cell east -- FIXED
      if (this.data[x + 1][y].alive) {
        aliveNeighbors++;
        neighbors.push(this.data[x + 1][y]);
      }
    }
    // console.log("ALIVE NEIGHBORS", neighbors)
    return aliveNeighbors;
  };

  clearGridAndBuffer = () => {
    for (let x = 0; x < this.gridSize / this.cellSize; x++) {
      for (let y = 0; y < this.gridSize / this.cellSize; y++) {
        this.data[x][y].alive = false;
        this.buffer[x][y].alive = false;
      }
    }
  };

  updateGridAndBuffer = () => {
    // switch this.data and this.buffer
    this.applyRulesAndMigrateToBuffer();

    let data = this.data;
    this.data = this.buffer;
    this.buffer = data;
  };

  // applies Game of Life rules to the grid and migrates the next gen to this.buffer
  applyRulesAndMigrateToBuffer = () => {
    // for each row in the grid
    for (let x = 0; x < this.gridSize / this.cellSize; x++) {
      // for each cell in that row
      for (let y = 0; y < this.gridSize / this.cellSize; y++) {
        // get its neighbors' states
        const aliveNeighbors = this.getNeighborStates(x, y);
        // apply rules to cell
        let newCell = new Cell(this.data[x][y].alive, x, y)
        this.buffer[x][y] = newCell;

        if (this.data[x][y].alive) {
          if (aliveNeighbors !== 2 && aliveNeighbors !== 3)
            // make the currentCell dead, but on the copy/buffer of the grid
            this.buffer[x][y].alive = false;
          } else {
            if (aliveNeighbors === 3) {
              // make the currentCell alive, but on the copy/buffer of the grid
              this.buffer[x][y].alive = true;
            }
          }
        }
      }
    }
  };

class Cell {
  constructor(alive, x, y) {
    this.alive = alive;
    this.x = x;
    this.y = y;
  }

  toggle = () => {
    this.alive = !this.alive;
  };
}

export default Grid;
