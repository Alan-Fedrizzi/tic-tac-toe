"use strict";

const gridCells = document.querySelectorAll(".grid__cell");
const gridButtons = document.querySelectorAll(".grid__button");
let player = 0;

gridButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (player === 0) {
      const gridCell = e.target.closest(".grid__cell");
      gridCell.classList.add("grid__cell--player-0");
      gridCell.classList.add("grid__cell--disabled");
      // console.log(`click player ${player}`);
      player = 1;
    } else if (player === 1) {
      const gridCell = e.target.closest(".grid__cell");
      gridCell.classList.add("grid__cell--player-1");
      gridCell.classList.add("grid__cell--disabled");
      // console.log(`click player ${player}`);
      player = 0;
    }
  });
});
