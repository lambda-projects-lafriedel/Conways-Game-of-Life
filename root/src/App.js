import React from "react";
import LifeGrid from "./components/Grid";
// generate board grid - static to start, but make it dynamic for "custom functionality"

class App extends React.Component {
  state = {
    // generation, game running
    generation: 0,
    gameRunning: false,
    canvasSize: 300,
    cellSize: 10
  };

  // changeGridSize = e => {
  //   e.preventDefault();
  //   console.log(e.target)
  //   this.setState({
  //     canvasSize: e.target.value
  //   }, console.log(this.state));
  // };

  // handleInputChange = e => {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   })
  // }

  render() {
    return (
      <>
        <h1>Conway's Game of Life</h1>
        <p>Generation: {this.state.generation}</p>
        <LifeGrid
          height={this.state.canvasSize}
          width={this.state.canvasSize}
          cellSize={this.state.cellSize}
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

export default App;
