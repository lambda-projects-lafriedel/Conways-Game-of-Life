import React from "react";
import LifeGrid from "./components/Grid";
import Rules from "./components/Rules";
import About from './components/About';
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
        <div>
          <LifeGrid />
          <Rules />
          <About />
        </div>
      </>
    );
  }
}

export default App;
