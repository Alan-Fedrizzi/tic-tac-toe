"use strict";

const gridCells = document.querySelectorAll(".grid__cell");
const gridButtons = document.querySelectorAll(".grid__button");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal__content");

let player = 1;
const gridArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];

const resetGame = function () {
  player = 1;
  gridArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  gridButtons.forEach((button) => {
    button.innerHTML = "";
  });
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
};

const assingPlayer = function (btn, position, currentPlayer) {
  renderIcon(currentPlayer, btn);
  disableButton(btn);
  gridArray[position] = currentPlayer;
};

const showWinner = function (currentPlayer) {
  modal.classList.add("show-modal");
  const html = `
    <div class="modal__text">
      Player ${currentPlayer} wins!
    </div>
  `;
  modalContent.insertAdjacentHTML("afterbegin", html);
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
  )
    showWinner(curPlayer);
};

const checkRound = function (b, pos, pl) {
  assingPlayer(b, pos, pl);
  checkWinner(pl);
  changePlayer(pl);
};

gridButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const gridCell = e.target.closest(".grid__cell");
    const gridPosition = +gridCell.dataset.position;

    if (gridArray[gridPosition] === 1 || gridArray[gridPosition] === 2) return;

    if (gridArray[gridPosition] === 0) {
      if (player === 1) {
        checkRound(button, gridPosition, player);
      } else if (player === 2) {
        checkRound(button, gridPosition, player);
      }
    }
  });
});
