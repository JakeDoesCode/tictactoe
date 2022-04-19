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

//ai opponent

//player name input

//start of game
start();

function start() {
  circleTurn = true;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove('show');
}



//click by player
function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
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
// deals with draw and displays win message
function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}
function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!';
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? 'O' : 'X'} Wins!`;
  }
  winningMessageElement.classList.add('show');
}
//restart
restartBtn.addEventListener('click', start);

