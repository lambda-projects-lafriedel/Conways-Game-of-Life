import React from 'react';

const About = () => {
  return (
    <>
    <h2>About Conway's Game of Life</h2>
    <p>The Game of Life, created by John H. Conway, is an example of cellular automata. Cellular automata were invented by Stanislaw Ulam with the intention of simulating John von Neumann's definition of life and theoretical electromagnetic constructions.</p>
    <p>Cellular automata is a model used in computer science and mathematics that consists of a grid of cells with each cell exhibiting one of a finite number of states. Once a genesis generation has been created, a new generation is created according to a fixed set of rules applied to each cell's current state and the state of it's neighbors.</p>
    <p>Inspired by this idea, Conway, an English mathematician, began experimenting with different rules applied to cellular automata, with the goal of discovering a pattern that would create something unique and unpredictable. After many experiments, Mr. Conway decided on the rules above.</p>
    <p>The major significance of Conway's Game of Life is that it is Turing complete and therefore satisfies the definition of a Turing machine. Meaning: anything that can be computed algorithmically can in theory be computed by the game. However, it is also an example of the halting problem: Given a genesis generation and proceeding generation, nothing can compute the possibility of the proceeding pattern existing in the context of the genesis generation.</p>
    </>
  )
}

export default About;