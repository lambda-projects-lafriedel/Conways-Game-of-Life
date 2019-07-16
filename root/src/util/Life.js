class Grid {
  constructor(cellSize, gridSize) {
    this.cellSize = cellSize;
    this.gridSize = gridSize;
    this.data = [];
  }

  createGrid = () => {
    // create rows
    for (let i = 0; i < (this.gridSize/this.cellSize); i++) {
      this.data[i] = []
    }

    // create cols and insert cells
    for (let x = 0; x < (this.gridSize/this.cellSize); x++) {
      for (let y = 0; y < (this.gridSize/this.cellSize); y++) {
        this.data[x][y] = new Cell(false, this.cellSize * x, this.cellSize * y)
      }
    }
  }

  getNeighborStates = (x,y) => {
    let aliveNeighbors = 0;

    // if the cell is not on the top edge
    if (x > 0) {
      
      // if the cell is not on the top AND not on left edge
      if (y > 0) {
        // get cell northwest
        if (this.data[x-1][y-1].alive) {
          aliveNeighbors++
        }
      }
      
      // if the cell is not on the top AND not on right edge
      if (y < this.gridSize/this.cellSize - 1) {
        
        // get cell northeast
        if (this.data[x-1][y+1].alive) {
          aliveNeighbors++
        }
      }

      // get cell north
      if (this.data[x-1][y].alive) {
        aliveNeighbors++
      }
    }

    // if the cell is not on the bottom edge
    if (x < this.gridSize/this.cellSize - 1) {

      // if the cell is not on bottom AND not on left edge
      if (y > 0) {
        // get cell southwest
          if (this.data[x+1][y-1].alive) {
            aliveNeighbors++
          }
      }

      // if the cell is not on bottom AND not on right edge
      if (y < this.gridSize/this.cellSize - 1) {
        // get cell southeast
        if (this.data[x+1][y+1].alive) {
          aliveNeighbors++
        }
      }

      // get cell south
      if (this.data[x+1][y].alive) {
        aliveNeighbors++
      }
    }

    // if the cell is not on the left edge
    if (y > 0) {
      // get cell west
      if (this.data[x][y-1].alive) {
        aliveNeighbors++
      }
    }
    
    // if the cell is not on the right edge
    if (y < this.gridSize/this.cellSize - 1) {
      // get cell east
      if (this.data[x][y+1].alive) {
        aliveNeighbors++
      }
    }


    return aliveNeighbors;
  }

  // method that applies Game of Life rules to the grid
  applyRulesAndUpdate = () => {
    // for each row in the grid
    for (let x = 0; x < (this.gridSize/this.cellSize); x++) {
      // for each cell in that row
      for (let y = 0; y < (this.gridSize/this.cellSize); y++) {
        // get its neighbors' states
        const aliveNeighbors = this.getNeighborStates(x,y);
        // apply rules to cell with switch statement
        // where does this get affected? I need a duplicate grid, don't I, for the "buffer"
        console.log(x,y,aliveNeighbors)
      }
    }

  }
  // 
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
