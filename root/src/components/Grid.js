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

  handleCellClick = e => {
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

  drawNextGen = () => {
    const canvas = this.refs.canvas;
    let context = canvas.getContext("2d");

    for (
      let x = 0;
      x < this.state.grid.gridSize / this.state.grid.cellSize;
      x++
    ) {
      for (
        let y = 0;
        y < this.state.grid.gridSize / this.state.grid.cellSize;
        y++
      ) {
        context.fillStyle = this.state.grid.data[x][y].alive
          ? "black"
          : "white";
        context.fillRect(
          x * this.state.grid.cellSize,
          y * this.state.grid.cellSize,
          this.state.cellSize - 1,
          this.state.cellSize - 1
        );
      }
    }
  };

  tick = () => {
    if (this.state.gridAnimating) {
    this.drawNextGen();
    this.state.grid.updateGridAndBuffer();
    this.setState(prevState => ({
      generation: prevState.generation++
    }));
    requestAnimationFrame(this.tick);
  }
  };

  startGame = () => {
    this.setState({
      gridAnimating: true
    });
    requestAnimationFrame(this.tick);
  };

  stopGame = () => {
    this.setState({
      gridAnimating: false
    })
  }

  clearCanvas = () => {
    // set all cell states to dead
    this.state.grid.clearGridAndBuffer();

    // set generation to 0 and gridAnimating to false
    this.setState({
      generation: 0,
      gridAnimating: false
    })
    // draw the state of the grid
    this.drawNextGen();
  }

  render() {
    return (
      <>
        <p>Generation: {this.state.generation}</p>
        <canvas
          ref="canvas"
          width={this.state.canvasSize}
          height={this.state.canvasSize}
          onClick={e => this.handleCellClick(e)}
        />
        <form onSubmit={e => this.changeGridSize(e)}>
          <input type="number" placeholder="Grid size" />
          <button type="submit">Change Grid Size</button>
        </form>
        <button onClick={this.startGame}>Start</button>
        <button onClick={this.stopGame}>Stop</button>
        <button onClick={this.clearCanvas}>Clear</button>
      </>
    );
  }
}

export default LifeGrid;
