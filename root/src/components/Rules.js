import React from 'react';

const Rules = () => {
  return (
    <>
    <h2>Welcome to Conway's Game of Life. Let's Play!</h2>
    <p>In this game, cells, represented by a square on the graph, are either alive or dead. At the start, all the cells are dead (signified by the color white). Begin by either clicking on random squares to create a composition of alive cells (they will turn black), or using the "Gimme Random!" button to generate a random composition.</p>
    <p>Optionally, change the cell and/or grid size before you create your composition. Multiples of 5 work best, but choose any dimensions you'd like!</p>
    <p>When you are satisfied, click Start to initiate the game! The cells will then begin to rapidly change according to these rules:</p>
    <ul>
      <li>If a cell is alive and has less than 2 or more than 3 alive neighbors, it will die.</li>
      <li>If a cell is dead and has 3 alive neighbors, it springs to life.</li>
    </ul>
    <p>The game ends when the cells are stuck in a back-and-forth mutation pattern, or every cell is alive or every cell is dead.</p>
    </>
  )
}

export default Rules;