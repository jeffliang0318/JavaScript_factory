function checkForWinner() {
  if (rowWinner()) return rowWinner();
  if (columnWinner()) return columnWinner();
  if (slopeOne()) return slopeOne();
  if (slopeNegtiveOne()) return slopeNegtiveOne();
}

function rowWinner() {
  const lastRow = lastPos[0];
  const lastCol = lastPos[1];
  const disk = grid[lastRow][lastCol]

  let counter = 0;

  for (let col = lastCol - 3; col <= lastCol + 3; col++) {
    if (col < 0) continue;
    if (col > 6) break;

    if (grid[lastRow][col] === disk){
      counter++;
    } else {
      counter = 0;
    }
    if(counter === 4) return disk;
  }
  return;
}

function columnWinner() {
  const lastRow = lastPos[0];
  const lastCol = lastPos[1];
  const disk = grid[lastRow][lastCol];

  let counter = 0;

  for (let row = lastRow - 3; row <= lastRow + 3; row++) {
    if (row < 0) continue;
    if (row > 5) break;

    if (grid[row][lastCol] === disk) {
      counter += 1;
    } else {
      counter = 0;
    }

    if (counter === 4) return disk;
  }
}

function slopeOne() {
  const lastRow = lastPos[0];
  const lastCol = lastPos[1];
  const disk = grid[lastRow][lastCol];

  let counter = 0;

  for (let offset = -3; offset <= 3; offset++) {
    let row = lastRow - offset;
    let col = lastCol + offset;

    if (row > 6 || col < 0) continue;
    if (row < 0 || col > 7) break;

    if (grid[row][col] === disk) {
      counter += 1;
    } else {
      counter = 0;
    }

    if (counter === 4) return disk;
  }
}

function slopeNegtiveOne() {
  let lastRow = lastPos[0];
  let lastCol = lastPos[1];
  const disk = grid[lastRow][lastCol];

  let counter = 0;

  for (let offset = -3; offset <= 3; offset++) {
    const row = lastRow + offset;
    const col = lastCol + offset;

    if (row < 0 || col < 0) continue;
    if (row > 6 || col > 7 ) break;

    if (grid[row][col] === disk) {
      counter += 1;
    } else {
      counter = 0;
    }

    if (counter === 4) return disk;
  }
}
