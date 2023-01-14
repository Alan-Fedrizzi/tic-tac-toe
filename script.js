"use strict";

const gridCells = document.querySelectorAll(".grid__cell");
const gridButtons = document.querySelectorAll(".grid__button");

let player = 1;
const gridArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];

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

const assingPlayer = function (btn, currentPlayer) {
  renderIcon(currentPlayer, btn);
  disableButton(btn);
  changePlayer(currentPlayer);
};

const checkWinner = function (gridPosition, currentPlayer) {
  if (gridPosition === 0) {
    // 0 - 1 - 2
    // 0 - 3 - 6
    // 0 - 4 - 8
  } else if (gridPosition === 1) {
    // 1 - 4 - 7
  } else if (gridPosition === 2) {
    // 2 - 5 - 8
    // 2 - 4 - 6
  } else if (gridPosition === 3) {
    // 3 - 4 - 5
  } else if (gridPosition === 6) {
    // 6 - 7 - 8
  }
};

gridButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const gridCell = e.target.closest(".grid__cell");
    const gridPosition = gridCell.dataset.position;

    if (gridArray[gridPosition] === 1 || gridArray[gridPosition] === 2) return;

    if (gridArray[gridPosition] === 0) {
      if (player === 1) {
        assingPlayer(button, player);
      } else if (player === 2) {
        assingPlayer(button, player);
      }
    }
    console.log(gridPosition);
  });
});
