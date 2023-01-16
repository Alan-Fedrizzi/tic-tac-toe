"use strict";

//////////////////////
// variables
//////////////////////

const playerSelected = document.querySelector(".header__player-selected");
const buttonReset = document.querySelector(".header__reset");
const gridCells = document.querySelectorAll(".grid__cell");
const gridButtons = document.querySelectorAll(".grid__button");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal__content");
const modalOverlay = document.querySelector(".modal__overlay");
const buttonClose = document.querySelector(".btn-close");

let player = 1;
const gridArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let isDraw = false;

//////////////////////
// functions
//////////////////////

const resetGame = function () {
  player = 1;
  playerSelected.classList.remove("header__player-selected--player-2");
  isDraw = false;

  gridArray.forEach((_, i) => (gridArray[i] = 0));

  gridButtons.forEach((button) => {
    button.innerHTML = "";
    button.classList.remove("grid__button--disabled");
  });

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

const disableButton = function (btn) {
  btn.classList.add("grid__button--disabled");
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

//////////////////////
// event listeners
//////////////////////

buttonReset.addEventListener("click", resetGame);

gridButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const gridCell = e.target.closest(".grid__cell");
    const gridPosition = +gridCell.dataset.position;

    if (gridArray[gridPosition] === 1 || gridArray[gridPosition] === 2) return;

    if (gridArray[gridPosition] === 0) {
      checkRound(button, gridPosition, player);
    }
  });
});
