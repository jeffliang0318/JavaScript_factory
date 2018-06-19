# Connect Four

 **To play this game, please open index.html**

## Development Process

The first thing comes to my mind is TicTacToe, the differences between

Connect Four and TicTacToe are 1. matrix size, 2. how to place disk/mark.

For 2., TicTacToe players can put the mark on the coordinate [row, column] directly if the spot is empty.

But Connect Four players only choose the [column], then the disk will drop from [0, column] to the lowest empty spot.

So the development process will be **1.** create matrix, **2.** develop checkWinner function,

**3.** develop disk moving logic, **4.** make it as two player mode, **5.** implement it at web.

### Create Matrix

grid = new Array(6)

for (let row = 0; row < grid.length; row++){
  grid[row] = new Array(7).fill(0);
}
------------------------------------------------------------------------
grid = [
[0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0]
]

### checkWinner()

For function checkWinner, it will check if player is win by connect 4 (1)in row,

(2)in column, (3)slope = 1, (4)slope = -1. So there will be these 4 help functions

to check is player is win under either one of these conditions.

function checkWinner(){
  if (rowWinner()) return rowWinner();
  if (columnWinner()) return columnWinner();
  if (slopeOne()) return slopeOne();
  if (slopeNegtiveOne()) return slopeNegtiveOne();
  return;
}

Then implement these helper functions. The idea is using the coordinate of

last dropped disk to check if there is a winner on not.

let lastPos = [row, column]

rowWinner(grid, lastPos){
  let lastRow = lastPos[0];
  let lastCol = lastPos[1];
  let disk = grid[lastRow][lastCol]
  //checking from left to right
  let left = lastCol - 3;
  let right = lastCol + 3;
  let count = 0;
  for ( col = left; row <= right; col++ ){
    //if the coordinate is out of boundary condition, don't have to count
    if (col < 0) continue;
    if (col > 6) break;
    if (grid[lastRow][col] === disk){
      count++;
    } else {
      count = 0;
    }
    if(count === 4) return disk;
  }
  return;
}

Same logic for columnWinner(), check from top to bottom

For slopeOne(), start from [ lastRow + 3, lastCol - 3 ], and the row-- col++, to [ lastRow - 3, lastCol + 3 ].

For slopeNegtiveOne(), check from [ lastRow - 3, lastCol - 3 ], to [ lastRow + 3, lastCol + 3 ].

Each method takes 7 steps, check from(-(n - 1) ~ 0 ~ +(n - 1)(row, column, slope 1 and -1), so it is linear time O(n).

n is number you want to connect to win.

### disk moving logic

Player can only decide column coordinate from 0 to 6, and drop form row = 0 to (row = 5 || grid[row][col] !== 0)

       0  1  2  3  4  5  6
      --------------------
  0 | [0, 0, 0, 0, 0, 0, 0]
  1 | [0, 0, 0, 0, 0, 0, 0]
  2 | [0, 0, 0, 0, 0, 0, 0]
  3 | [0, 0, 0, 0, 0, 0, 0]
  4 | [0, 0, 0, 0, 0, 0, 0]
  5 | [0, 0, 0, 0, 0, 0, 0]

player1 = 1
player2 = 2

function drop(grid, player, playerInputCol){
  //drop from row = 0
  grid[0][playerInputCol] = player
  let row = 0;

  // keep dropping until grid[row + 1][col] is not 0
  while( grid[row + 1][playerInputCol] === 0){
    grid[row + 1][playerInputCol] = player;
    grid[row][playerInputCol] = 0;
    row++;
  }
}

drop(grid, player1, 4)
drop(grid, player2, 4)

should be looks like following

     0  1  2  3  4  5  6
    --------------------
0 | [0, 0, 0, 0, 0, 0, 0]
1 | [0, 0, 0, 0, 0, 0, 0]
2 | [0, 0, 0, 0, 0, 0, 0]
3 | [0, 0, 0, 0, 0, 0, 0]
4 | [0, 0, 0, 0, 2, 0, 0]
5 | [0, 0, 0, 0, 1, 0, 0]

### Switch player

  Every time drop() been invoked, moves should increment by 1.

  And currPlayer will depends on (moves) % 2
  let moves = 1;

  function switchPlayer(){
    if (moves % 2 === 0){
      return player2;
    } else {
      return player1;
    }
  }

  so drop() should be

  function drop(){
    ...
    ...
    ...
    moves++;
  }

### Web development

To make it playable on web page, the each element in the grid needs to be converted as an image.

So el = 0 will be an image of empty spot, el = 1 can be yellow, el = 2 can be red.

Player can use keyboard to play this game, using left/right key to show player which column they are going to drop.

Press space bar to drop.
