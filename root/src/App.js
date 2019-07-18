import React from "react";
import LifeGrid from "./components/Grid";
// generate board grid - static to start, but make it dynamic for "custom functionality"

class App extends React.Component {
  state = {
    // generation: 0,
    // gameRunning: false,
    // canvasSize: 300,
    // cellSize: 10,
    // grid: new Grid(this.props.cellSize, this.props.height),
    // gridAnimating: false
  };

  render() {
    return (
      <>
        <h1>Conway's Game of Life</h1>
        <LifeGrid />
      </>
    );
  }
}

export default App;
