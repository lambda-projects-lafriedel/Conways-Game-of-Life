import React from "react";
import Grid from '../util/Life';

class LifeGrid extends React.Component {
  state = {
    grid: new Grid(this.props.cellSize, this.props.height)
  };

  componentDidMount() {
    this.makeGrid();
    this.state.grid.createGrid();
    console.log(this.state.grid);
  }

  // creates grid drawing
  makeGrid = () => {
    // grab canvas and set its context
    let canvas = this.refs.canvas;
    let context = canvas.getContext('2d');
    context.lineWidth = 1;
    context.strokeStyle = 'gray';

    // start path, then loop and create the vertical lines of grid
    context.beginPath();
    for (let x = 0; x <= this.state.grid.gridSize; x += this.state.grid.cellSize) {
      context.moveTo(x, 0);
      context.lineTo(x, this.state.grid.gridSize);
    }
    context.stroke();

    // start path, then loop and create the horizontal lines of the grid
    context.beginPath();
    for (let y = 0; y <= this.state.grid.gridSize; y += this.state.grid.cellSize) {
      context.moveTo(0, y);
      context.lineTo(this.state.grid.gridSize, y);
    }
    context.stroke();
  }

  handleGridClick = (e) => {
    let canvas = this.refs.canvas;
    let context = canvas.getContext('2d');
    let canvasBoundingBox = canvas.getBoundingClientRect();

    let xIndex = Math.floor((e.clientX - canvasBoundingBox.x) / this.state.grid.cellSize);
    let yIndex = Math.floor((e.clientY - canvasBoundingBox.y) / this.state.grid.cellSize);
 
    // toggle state
    let currentCell = this.state.grid.data[xIndex][yIndex];
    currentCell.toggle()

    // fill cell with appropriate fill
    context.fillStyle = currentCell.alive ? 'black' : 'white';
    context.fillRect(xIndex * this.state.grid.cellSize, yIndex * this.state.grid.cellSize, this.props.cellSize - 1, this.props.cellSize - 1)
  }

  render() {
    return (
      <>
        <canvas
          ref="canvas"
          width={this.props.width}
          height={this.props.height}
          onClick={e => this.handleGridClick(e)}
        />
      </>
    );
  }
}

export default LifeGrid;
