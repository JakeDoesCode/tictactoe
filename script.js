// variables
const X_CLASS = 'x';
const CIRCLE_CLASS = 'o';
const WIN_COND = [
  //  rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  //   columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  //   diagonal
  [0, 4, 8],
  [2, 4, 6],
];

let circleTurn;
const cellElements = document.querySelectorAll(`[data-cell]`);
const board = document.getElementById('board');
const winningMessageTextElement = document.querySelector(
  `[data-winning-message-text]`
);

const winningMessageElement = document.getElementById('winMessage');
const restartBtn = document.getElementById('restart');

//checks if cell is occupied
function hasClass(cell, clsName) {
  return (' ' + cell.className + ' ').indexOf(' ' + clsName + ' ') > -1;
}
// repeat code, used to check specificially if computer won as currentClass is out of scope
function winCheck() {
  if (checkWin(X_CLASS)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurn();
    setBoardHoverClass();
  }
}
// computer random selection and placement.
function computerPlay() {
  let selection = Math.floor(Math.random() * 9);
  if (
    circleTurn === false &&
    !hasClass(cellElements[selection], X_CLASS) &&
    !hasClass(cellElements[selection], CIRCLE_CLASS)
  ) {
    placeMark(cellElements[selection], 'x');
    winCheck();
  } else if (
    hasClass(cellElements[selection], 'x') ||
    hasClass(cellElements[selection], 'o')
  ) {
    computerPlay();
  }
}

// adds class to cell for X or O
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}
//resets turn to opposing player
function swapTurn() {
  circleTurn = !circleTurn;
}
//will add correct class depending on which player's turn it is
function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}
// checks if win conditions are met
function checkWin(currentClass) {
  return WIN_COND.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
// checks for draw, if all cells have X or CIRCLE Class
function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

// displays endgame message based on win/draw conditions
function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!';
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? 'O' : 'X'} Wins!`;
  }
  winningMessageElement.classList.add('show');
}

// allows player selection 1P vs AI or 2P and starts the game

function playerSelection() {
  //starts the game with O player first, and resets the board
  function start1P() {
    circleTurn = true;
    cellElements.forEach((cell) => {
      cell.classList.remove(X_CLASS);
      cell.classList.remove(CIRCLE_CLASS);
      cell.removeEventListener('click', handleClick1P);
      cell.addEventListener('click', handleClick1P, { once: true });
    });

    //set hover effect
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
  }

  function handleClick1P(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    if (!hasClass(cell, X_CLASS) && !hasClass(cell, CIRCLE_CLASS)) {
      placeMark(cell, currentClass);
      if (checkWin(currentClass)) {
        endGame(false);
      } else if (isDraw()) {
        endGame(true);
      } else {
        swapTurn();
        computerPlay();
        setBoardHoverClass();
      }
    }
  }
  const onePlayer = document.getElementById('onePlayer');
  onePlayer.addEventListener('click', start1P, handleClick1P);

  function start2P() {
    circleTurn = true;
    cellElements.forEach((cell) => {
      cell.classList.remove(X_CLASS);
      cell.classList.remove(CIRCLE_CLASS);
      cell.removeEventListener('click', handleClick2P);
      cell.addEventListener('click', handleClick2P, { once: true });
    });
  }
  function handleClick2P(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    if (!hasClass(cell, X_CLASS) && !hasClass(cell, CIRCLE_CLASS)) {
      placeMark(cell, currentClass);
      if (checkWin(currentClass)) {
        endGame(false);
      } else if (isDraw()) {
        endGame(true);
      } else {
        swapTurn();
        setBoardHoverClass();
      }
    }
  }
  const twoPlayer = document.getElementById('twoPlayer');
  twoPlayer.addEventListener('click', start2P, handleClick2P);
  //restart
  restartBtn.addEventListener('click', start1P, handleClick1P);
}

//start of game
playerSelection();
