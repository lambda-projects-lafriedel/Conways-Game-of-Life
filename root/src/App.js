import React from "react";
import LifeGrid from './components/Grid';
// generate board grid - static to start, but make it dynamic for "custom functionality"

class App extends React.Component {
  state = {
    // generation, game running
    generation: 0,
    gameRunning: false,
    canvasWidth: 150,
    canvasHeight: 150

  }
  render() {
    return (
      <>
        <h1>Conway's Game of Life</h1>
        <p>Generation: 0</p>
        <LifeGrid height={this.state.canvasHeight} width={this.state.canvasWidth} />
        <input type="number" placeholder="Grid height" />
        <input type="number" placeholder="Grid width" />
        <button>Start</button>
        <button>Stop</button>
        <button>Clear</button>
      </>
    );
  }
}

export default App;
