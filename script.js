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

/*
gridButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (player === 0) {
      assignPlayerGrid();

      // gridCell.classList.add("grid__cell--player-0");
      // gridCell.classList.add("grid__cell--disabled");
      // console.log(`click player ${player}`);
      player = 2;
    } else if (player === 1) {
      const gridCell = e.target.closest(".grid__cell");

      console.log(gridCell.dataset.position);

      // gridCell.classList.add("grid__cell--player-1");
      // gridCell.classList.add("grid__cell--disabled");
      // console.log(`click player ${player}`);
      player = 1;
    }
  });
});
*/
