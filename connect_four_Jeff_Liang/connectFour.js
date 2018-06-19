const player1 = 1;
const player2 = 2;
let grid;
let moves = 1;
let currPlayer = player1;
let lastPos;
let wineer = document.getElementById("winner");
let currentPlayer = document.getElementById("currentPlayer");
let player = document.getElementById("player");
let pointer = {
  x: 0
}
function createGrid(){
   grid = new Array(7);

  for (let row = 0; row < grid.length; row++){
    grid[row] = new Array(7).fill(0);
  }
  for(let i = 0; i < 7; i++){
    grid[6][i] = 4;
  }
  grid[6][pointer.x] = 5
};
createGrid();

function switchPlayer(){
  if(moves % 2 === 1){
    return player1;
  }
  return player2;
}

function draw() {
  // console.log(grid);
  let game = document.getElementById("game");
  game.innerHTML = "";
  let string =  "";
  for (var j = 0; j < grid.length; j++) {
    for (var i = 0; i < grid[j].length; i++) {
      switch (grid[j][i]) {
        case 0:
        string +=
        "<div class='element empty'></div>";
        break;

        case 1:
        string +=
        "<div class='element yellow'></div>";
        break;

        case 2:
        string +=
        "<div class='element red'></div>";
        break;

        case 4:
        string +=
        "<div class='element last'></div>";
        break;

        case 5:
        string +=
        "<div class='element pointer'></div>";
        break;
      }
    }
    string += "<br>";
  }
  game.innerHTML = string;

}
(function drawCurrentPlayer(){
  if (currPlayer === 1){
    currentPlayer.innerHTML += "<p>Player 1</p><div class='current yellow'></div>";
  } else {
    currentPlayer.innerHTML += "<p>Player 2</p><div class='current red'></div>";
  }
})();

setInterval(draw, 100);
