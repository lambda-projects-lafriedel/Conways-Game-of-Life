import React from "react";

class Grid extends React.Component {
  state = {};

  componentDidMount() {
    this.makeGrid();
  }

  makeGrid = () => {
    // grab canvas and set its context
    let canvas = this.refs.canvas;
    let context = canvas.getContext('2d');
    // get image data and create screen buffer
    let imageData = context.getImageData(0,0,canvas.width,canvas.height);
    let screenBuffer = imageData.data;
    console.log(context);
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

export default Grid;
