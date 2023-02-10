"use strict";

//////////////////////
// variables
//////////////////////

const body = document.querySelector("body");
const playerSelected = document.querySelector(".header__player-selected");
const buttonReset = document.querySelector(".header__reset");
const gridCells = document.querySelectorAll(".grid__cell");
const gridButtons = document.querySelectorAll(".grid__button");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal__content");
const modalOverlay = document.querySelector(".modal__overlay");
const buttonClose = document.querySelector(".btn-close");
const containerSelect = document.querySelector(".container__select");
const checkboxMouse = document.getElementById("mode-mouse");
const checkboxKeyboard = document.getElementById("mode-keyboard");

let player = 1;
const gridArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let gridPosition;
let isDraw = false;
let keyboardSelect = false;
let cellKeyboard;
let buttonKeyboard;
let coord;

//////////////////////
// functions
//////////////////////

const disableButton = function (btn) {
  btn.classList.add("grid__button--disabled");
};

const enableButton = function (btn) {
  btn.classList.remove("grid__button--disabled");
};

const resetGame = function () {
  player = 1;
  playerSelected.classList.remove("header__player-selected--player-2");
  isDraw = false;

  gridArray.forEach((_, i) => (gridArray[i] = 0));

  gridButtons.forEach((button) => {
    button.innerHTML = "";
    enableButton(button);
  });

  containerSelect.dataset.coord = "0";
  gridPosition = 0;

  modalContent.innerHTML = "";
};

const renderIcon = function (currentPlayer, btn) {
  const html = `
    <div class="grid__icon grid__icon--player${currentPlayer}">
      ${currentPlayer === 1 ? "X" : "O"}
    </div>
  `;

  btn.insertAdjacentHTML("afterbegin", html);
};

const changePlayer = function (currentPlayer) {
  currentPlayer === 1 ? (player = 2) : (player = 1);
  playerSelected.classList.toggle("header__player-selected--player-2");
};

const assingPlayer = function (btn, position, currentPlayer) {
  renderIcon(currentPlayer, btn);
  disableButton(btn);
  gridArray[position] = currentPlayer;
};

const closeModal = function () {
  modal.classList.remove("show-modal");
  resetGame();
};

const showResult = function (currentPlayer) {
  modal.classList.add("show-modal");
  const html = `
    <div class="modal__text">
      ${isDraw ? "It's a draw!" : "Player " + currentPlayer + " wins!"}
    </div>
  `;
  modalContent.insertAdjacentHTML("afterbegin", html);

  [modalOverlay, buttonClose].forEach((element) => {
    element.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("show-modal")) {
      closeModal();
    }
  });
};

const differentFromZero = (arr) => arr.every((val) => val !== 0);

const checkDraw = function () {
  isDraw = differentFromZero(gridArray);

  if (isDraw) showResult();
};

const checkWinner = function (curPlayer) {
  if (
    (gridArray[0] === curPlayer &&
      gridArray[1] === curPlayer &&
      gridArray[2] === curPlayer) ||
    (gridArray[0] === curPlayer &&
      gridArray[3] === curPlayer &&
      gridArray[6] === curPlayer) ||
    (gridArray[0] === curPlayer &&
      gridArray[4] === curPlayer &&
      gridArray[8] === curPlayer) ||
    (gridArray[1] === curPlayer &&
      gridArray[4] === curPlayer &&
      gridArray[7] === curPlayer) ||
    (gridArray[2] === curPlayer &&
      gridArray[4] === curPlayer &&
      gridArray[6] === curPlayer) ||
    (gridArray[2] === curPlayer &&
      gridArray[5] === curPlayer &&
      gridArray[8] === curPlayer) ||
    (gridArray[3] === curPlayer &&
      gridArray[4] === curPlayer &&
      gridArray[5] === curPlayer) ||
    (gridArray[6] === curPlayer &&
      gridArray[7] === curPlayer &&
      gridArray[8] === curPlayer)
  ) {
    showResult(curPlayer);
  } else {
    checkDraw(gridArray);
  }
};

const checkRound = function (b, pos, pl) {
  assingPlayer(b, pos, pl);
  checkWinner(pl);
  changePlayer(pl);
};

const checkPosition = function (button, gridPosition, player) {
  if (gridArray[gridPosition] === 1 || gridArray[gridPosition] === 2) return;

  if (gridArray[gridPosition] === 0) {
    checkRound(button, gridPosition, player);
  }
};

const toggleKeyboardSelect = function () {
  containerSelect.classList.toggle("container__select--show");
  checkboxMouse.classList.toggle("header__mode-select--selected");
  checkboxKeyboard.classList.toggle("header__mode-select--selected");
  keyboardSelect = !keyboardSelect;
};

const updateSelectCoord = function (newCoord) {
  setTimeout(() => {
    containerSelect.dataset.coord = newCoord;
  }, 100);
};

const keyboardData = function (pos) {
  cellKeyboard = document.querySelector(`[data-position="${pos}"]`);
  buttonKeyboard = cellKeyboard.querySelector(".grid__button");
  gridPosition = pos;
};

//////////////////////
// event listeners
//////////////////////

buttonReset.addEventListener("click", resetGame);

gridButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (keyboardSelect) {
      toggleKeyboardSelect();
    }
    const gridCell = e.target.closest(".grid__cell");
    gridPosition = +gridCell.dataset.position;

    checkPosition(button, gridPosition, player);
  });
});

document.addEventListener("keydown", function (e) {
  // Show select
  if (!keyboardSelect) {
    toggleKeyboardSelect();
    return;
  }

  // Hide select
  if (e.key === "Escape" && keyboardSelect) {
    toggleKeyboardSelect();
  }

  coord = +containerSelect.dataset.coord;
  // Move select
  if (e.key === "ArrowRight") {
    if (coord === 2 || coord === 5 || coord === 8) {
      coord = coord - 2;
    } else {
      coord = coord + 1;
    }
  }
  if (e.key === "ArrowLeft") {
    if (coord === 0 || coord === 3 || coord === 6) {
      coord = coord + 2;
    } else {
      coord = coord - 1;
    }
  }
  if (e.key === "ArrowDown") {
    if (coord === 6 || coord === 7 || coord === 8) {
      coord = coord - 6;
    } else {
      coord = coord + 3;
    }
  }
  if (e.key === "ArrowUp") {
    if (coord === 0 || coord === 1 || coord === 2) {
      coord = coord + 6;
    } else {
      coord = coord - 3;
    }
  }
  updateSelectCoord(coord);

  if (e.key === "Enter") {
    keyboardData(coord);
    checkPosition(buttonKeyboard, gridPosition, player);
  }
});
