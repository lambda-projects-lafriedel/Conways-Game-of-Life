import React from "react";
import Grid from '../util/Life';

class LifeGrid extends React.Component {
  state = {
    grid: new Grid(this.props.cellSize, this.props.height)
  };

  componentDidMount() {
    this.makeGrid();
  }

  makeGrid = () => {
    // grab canvas and set its context
    let canvas = this.refs.canvas;
    let context = canvas.getContext('2d');

    // start path, then loop and create the vertical lines of grid
    context.beginPath();
    for (let x = 0; x < this.state.grid.gridSize; x += this.state.grid.cellSize) {
      context.moveTo(x, 0);
      context.lineTo(x, this.state.grid.gridSize);
    }
    context.stroke();

    // start path, then loop and create the horizontal lines of the grid
    context.beginPath();
    for (let y = 0; y < this.state.grid.gridSize; y += this.state.grid.cellSize) {
      context.moveTo(0, y);
      context.lineTo(this.state.grid.gridSize, y);
    }
    context.stroke();

  
    // get image data and create screen buffer
    let imageData = context.getImageData(0,0,canvas.width,canvas.height);
    let screenBuffer = imageData.data;
    

  }

  render() {
    return (
      <>
        <canvas
          ref="canvas"
          width={this.props.width}
          height={this.props.height}
        />
      </>
    );
  }
}

export default LifeGrid;
