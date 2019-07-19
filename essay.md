# Building Conway's Game of Life

*This post assumes that you already know some basic Javascript and React, and understand the rules of Conway's Game of Life. If you don't, you can read about Conway's Game of Life [here](<https://simple.wikipedia.org/wiki/Conway%27s_Game_of_Life>) and get a taste of React on [React's official website](<https://reactjs.org/>).*

This week I built a simulation of Conway's Game of Life and would love to share how I approached building it! My hope is that this guide will help someone evaluate how to plan out their own version of the game. Check out my [deployed project](https://conway-game-of-life-4a4e2.firebaseapp.com/) to understand the context from which I'll be speaking. Then, let's get started!

Looking at and experiencing my implementation, you can see that it allows you to manually click on cells to create the first generation of cells, or you can click the "Gimme random!" button that will generate a random first generation. You then have a button to start the game, which will quickly animate each successive generation until the game ends or you stop it by clicking "Stop". If you'd rather see each generation manually, you can click the "Step 1 Gen" button to see each generation for as long as you'd like. Additionally, there are options provided to change the cell and/or grid size before you create the first generation and begin the game.

## Starting Out

So, initially, this was a big project to tackle. I kept thinking, *"How do I create this?"* without making any progress for a short while. I was overwhelmed. But by working through the project using [Polya's Four Steps to Problem-Solving](<http://www.ms.uky.edu/~lee/ma310sp15/polya.pdf>), I was able to break it down into manageable chunks.

Before I began, I made sure I understood what the goal was, and that I understood the rules of the game. I conducted some research to help clarify some questions by reading some Wikipedia and Medium articles about it, and the history of it as well.

Once I felt comfortable with that, I began to formulate my plan of attack.

From a high-level view, here are the items I knew needed to be built:

* The data structure of the game that holds information about the grid and each cell
* The visual depiction of the game, which would be a graph that contains cells and visually depict the alive/dead state of each cell
* The functionality that would change the data structure per generation
* The functionality that would change the visual depiction of the game per generation
* Controls displayed on the page (buttons, text inputs, etc.) that would allow game customization

Let's go through an overview of each bullet point above and further break down each item.

## Creating the game's basic data structure

The game needs a way to store information about the grid and its current state. It's best to separate this out from the visual depiction of the game, so that your code stays organized.

At a basic level I knew I'd need:

* A vanilla Javascript class called `Grid`, which would contain data about the size of the grid, a two-dimensional array that would hold the cells, and a duplicate two-dimensional array used as a buffer (this will be explained more in the next section)
* A vanilla Javascript `Cell` class, which would hold the x and y coordinate of the cell, as well as its current state (alive or dead)
* A method inside the `Grid` class called `createGrid` that would actually create the grid inside the data structure
* A method inside the `Cell` class called `toggle` that would toggle the cell's state from alive to dead

The `createGrid` method inside `Grid` would take into account the overall grid size (represented as the canvas' pixel width) and a cell's size in pixels. Nested for loops are then used to create a new `Cell` class at each (x,y) coordinate of the grid, and are then inserted into the grid's two-dimensional array and the buffer's two-dimensional array. Initially, every cell in the grid and buffer starts off as dead.

## Creating the basic visual depiction of the game

The data structure would need to be visually depcited to the screen, so I knew I needed to implement a surface where the game would be shown. The data structure would then be "layered" on top of the visual depiction, and they would mirror each other. There are a few different ways one could go about this, and I decided to use the HTML5 `<canvas>` element due to its built-in functionality.

So for the visual depiction of the game, I knew I'd need:

* A React class component called `LifeGrid` that would contain the canvas, its user-facing controls, and all the functions needed to make the game work
* A graph built on the canvas that had a set of evenly spaced vertical lines and evenly spaced horizontal lines
* The ability to click on a cell that, when clicked, changed its fill color (from white to black, signifying the cell is alive, or from black to white, signifying the cell is dead)

At this point, the functions needed inside the React component are:

* `createBothGrids` which creates the data structure's empty grid and the canvas' grid. This function is called when the component first mounts.
* `handleCellClick` which uses the canvas' positioning on the webpage to find a clicked x and y coordinate. These coordinates are used to map it to the grid inside the data structure and toggle that particular cell's state for every time it is clicked. For each click, the color of the cell changes, denoting its current state.

## Creating the ability to generate new game generations

Now that we have a plan for the basic data structure and the basic visual grid, we need to add more functionality to the data structure. The `Grid` class would need to have these methods:

* `getNeighborStates` which gets the state of each cell's neighbor and returns the number of neighbors that are currently alive. This is important since that number determines whether the current cell's state would remain the same or change
* `applyRulesAndMigrateToBuffer` which, after receiving the number of alive neighbors, applies the rules of Conway's Game of Life to each cell. After that is determined, the buffer receives the new state of each cell so that it can start creating the next generation
* `updateGridAndBuffer` which calls the function above, and then switches the grid's information with the buffer's information. This creates a constant switching of generation "frames" for the game, which will be the basis of the game animation
* `clearGridAndBuffer` which would set all the cells' states to dead to reset the game

These methods together create the ability to continually generate new generations of the game, and will be utilized inside the React component to help drive the game animation.

## Making the game animate and change the visual depiction of the game

Now that the data structure has more functionality, it's time to actually animate the game! 

First some basic controls need to be displayed in the React component:

* A start button
* A stop button
* A clear button

The React component also needs these functions:

* `startGame` which is initiated when a user presses the "Start" button. It utilizes Javascript's `requestAnimationFrame` function, which initiates a native animation API
* `drawNextGen` which takes the data structure's current state and fills in the appropriate cells on the canvas
* `tick` which is the driving force behind the constant animation. It calls the data structure's `updateGridAndBuffer` method and the component's `drawNextGen` function, and then continually calls `requestAnimationFrame` as long as the user has not pressed the "Stop" button
* `stopGame` which is called when the user presses the "Stop" button, and pauses the game
* `clearCanvas` which is called when the user presses the "Clear" button. It calls the data structure's `clearGridAndBuffer` method and also calls `drawNextGen` to update all the cells to appear as dead. Additionally, it resets the generation count to 0

Once these are all properly written and implemented, the game should run! Exciting! But I wanted to add some additional functionality to encourage further experimentation with the game.

## Creating controls to enable game play

In addition to the "Start," "Stop," and "Clear" buttons, I wanted to create:

* A "Gimme random!" button that would generate a random composition
* A "Step 1 Gen" button to allow the user to step one generation at a time manually
* A text input and submit button that allows the user to change the overall size of the grid (prior to initiating the game animation)
* A text input and submit button that allows the user to change the size of each cell (prior to initiating the game animation)

The "Gimme random!" button required a couple additonal functions:

* `generateRandomFirstGen` method inside the `Grid` class, that would utilize `Math.random()` to decide whether a cell was alive or dead. Since `Math.random()` returns a number between 0 and 1 (exclusive of 0 and 1), I decided I wanted a 25% chance that a cell would be alive. So if `Math.random()` returned a number less than `0.25` that cell would be alive.
* `randomGen` function inside the React component that would call the above method and `drawNextGen` (to display the randomly created generation)

The "Step 1 Gen" button required one additional function inside the React component:

* `stepOneGen` which would call the grid's `updateGridAndBuffer` method to create the next generation, and `drawNextGen` to draw it on the canvas. Note that even though it's technically "animating" the game, it is not using `requestAnimationFrame` since we're only moving one frame at a time

The text inputs required, you guessed it, more functions inside the React component:

* `changeCellSize` and `changeGridSize` which takes the values from the inputs and creates a new instance of `Grid` with the updated values, and replaces the original grid

## Evaluating my work

With everything listed above appropriately written in React and vanilla Javascript, all the functionality should work as intended and create a fun and impressive project!

After writing a first pass solution, it's always good to evaluate your work and see where you can improve. This is where Polya's fourth and final step comes in. Are there ways that the solution you came up with be improved?

I didn't have too much time to go back and attempt to improve my code, but overall I felt that my first pass (and debugging along the way as needed) was a decent solution. The code is fairly organized, separating the concerns of the data structure from the UI. Inside each of these two sections, methods and functions are written in a decently compartmentalized way with appropriately placed comments to understand what the code is doing.

To improve, I might find where I'm repeating myself and see if I could make my code more DRY. One part that pops out to me immediately is fetching the reference to the canvas and its context inside multiple component functions. I might be able to isolate this into it's own smaller method and call that inside every function that needs it.

The frequency of nested for loops also concerns me, since the time complexity of that results in O(n^2), meaning the more input given to the functions using the for loops, the longer it will take (exponentionally). I'd try to see if some of them could be simplified out into for loops on the same level, but many of them are necessary in order to access cells located inside the two-dimensional array. Even though the time complexity is not ideal, the game animation still runs rapidly. I suppose it's fine for a small grid, but a lag in performance would certainly be noticed in a large grid with very small cells.

Finally, at the current time of writing the app is not styled in a way I'd like. This is mainly because I prioritized functionality over form (which is frequently important in programming), and I wasn't able to focus on form within the initial time constraint given. I'd ideally like to improve the look of the overall page as well as the game so that it will be more engaging to game players.

## In conclusion

Overall, I'm happy with the current result of my project. It works properly and efficiently and the code is decently organized. Even though I initially approached this project as a really steep hurdle to climb over, I found that by taking the time to evaluate the goal and formulate a plan, I was able to see the steps I'd need to take to create the project. If you're ever approaching a project that seems complicated, I recommend using Polya's problem-solving method to help you focus on what needs to be done.