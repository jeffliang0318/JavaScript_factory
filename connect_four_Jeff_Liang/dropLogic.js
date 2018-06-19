document.onkeydown = function(e){
  switch (e.keyCode) {
// when press space bar
    case 32:
    let row = 0;
    if (grid[row][pointer.x] !== 0){
      alert("This column is full, please choose another column!")
      break;
    }
    grid[row][pointer.x] = currPlayer;
    while(grid[row + 1][pointer.x] === 0){
      grid[row + 1][pointer.x] = currPlayer;
      grid[row][pointer.x] = 0;
      row++;
    }
    lastPos = [row, pointer.x];
    moves++;
    currPlayer = switchPlayer();
    currentPlayer.innerHTML = ""
    if (currPlayer === 1){
      currentPlayer.innerHTML += "<p>Player 1</p><div class='current yellow'></div>";
    } else {
      currentPlayer.innerHTML += "<p>Player 2</p><div class='current red'></div>";
    }

    if(checkForWinner()){
      let winnerName = checkForWinner() === 1 ? "Player1" : "Player2";
      document.onkeydown = null;
      player.style.display = 'none';
      let h = document.createElement("H1");
      let t = document.createTextNode(`${winnerName} win!`);
      h.appendChild(t);
      wineer.appendChild(h);

    }
    // console.log(grid);
    break;

    case 37:
    if (grid[6][pointer.x - 1] === 4 ) {
      grid[6][pointer.x] = 4;
      pointer.x = pointer.x - 1;
      grid[6][pointer.x] = 5;
    }
    // console.log(grid);
    break;

    case 39:
    if (grid[6][pointer.x + 1] === 4 ) {
      grid[6][pointer.x] = 4;
      pointer.x = pointer.x + 1;
      grid[6][pointer.x] = 5;
    }
    // console.log(grid);
    break;
  }
}
