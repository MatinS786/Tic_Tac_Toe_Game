let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  enableBtns();
  msgContainer.classList.add("hide");
};

const gameDraw = () => {
  msg.innerText = `Game Was A Draw`;
  msg.classList.add("winner-text");
  msgContainer.classList.remove("hide");
  disableBtns();
};
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "X";
      turnO = false;
    } else {
      box.innerText = "O";
      turnO = true;
    }
    box.disabled = true;

    checkWinner();
  });
});

const disableBtns = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBtns = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations , Winner is ${winner}`;
  msg.classList.add("winner-text");
  msgContainer.classList.remove("hide");
  disableBtns();
};

const checkWinner = () => {
  let isDraw = true;

  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;
    if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
      showWinner(pos1Val);
      return;
    }
  }

  boxes.forEach((box) => {
    if (box.innerText === "") {
      isDraw = false;
    }
  });
  if (isDraw) {
    gameDraw();
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
