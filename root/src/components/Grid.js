import React from "react";
import Grid from "../util/Life";

class LifeGrid extends React.Component {
  state = {
    generation: 0,
    gameRunning: false,
    canvasSize: 300,
    cellSize: 10,
    grid: new Grid(10, 300),
    gridAnimating: false
  };

  componentDidMount() {
    this.makeGrid();
    this.state.grid.createGrids();
    console.log(this.state.grid);
  }

  // creates grid drawing
  makeGrid = () => {
    // grab canvas and set its context
    let canvas = this.refs.canvas;
    let context = canvas.getContext("2d");
    context.lineWidth = 1;
    context.strokeStyle = "gray";

    // start path, then loop and create the vertical lines of grid
    context.beginPath();
    for (
      let x = 0;
      x <= this.state.grid.gridSize;
      x += this.state.grid.cellSize
    ) {
      context.moveTo(x, 0);
      context.lineTo(x, this.state.grid.gridSize);
    }
    context.stroke();

    // start path, then loop and create the horizontal lines of the grid
    context.beginPath();
    for (
      let y = 0;
      y <= this.state.grid.gridSize;
      y += this.state.grid.cellSize
    ) {
      context.moveTo(0, y);
      context.lineTo(this.state.grid.gridSize, y);
    }
    context.stroke();
  };

  handleGridClick = e => {
    let canvas = this.refs.canvas;
    let context = canvas.getContext("2d");
    let canvasBoundingBox = canvas.getBoundingClientRect();

    let xIndex = Math.floor(
      (e.clientX - canvasBoundingBox.x) / this.state.grid.cellSize
    );
    let yIndex = Math.floor(
      (e.clientY - canvasBoundingBox.y) / this.state.grid.cellSize
    );

    // toggle state
    let currentCell = this.state.grid.data[xIndex][yIndex];
    currentCell.toggle();

    // fill cell with appropriate fill
    context.fillStyle = currentCell.alive ? "black" : "white";
    context.fillRect(
      xIndex * this.state.grid.cellSize,
      yIndex * this.state.grid.cellSize,
      this.state.cellSize - 1,
      this.state.cellSize - 1
    );
  };

  displayNextGen = () => {
    // use requestAnimationFrame to create the animation
    this.setState({
      gridAnimating: true
    });

    let start = null;

    const step = timestamp => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      if (this.state.gridAnimating) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
    // this will call this.state.grid.update() which will flip this.data with this.buffer
  };

  render() {
    return (
      <>
       <p>Generation: {this.state.generation}</p>
        <canvas
          ref="canvas"
          width={this.state.canvasSize}
          height={this.state.canvasSize}
          onClick={e => this.handleGridClick(e)}
        />
        <form onSubmit={e => this.changeGridSize(e)}>
          <input type="number" placeholder="Grid size" />
          <button type="submit">Change Grid Size</button>
        </form>
        <button>Start</button>
        <button>Stop</button>
        <button>Clear</button>
      </>
    );
  }
}

export default LifeGrid;
