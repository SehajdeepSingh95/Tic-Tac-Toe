let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let msgContainer = document.querySelector(".msg-container");
let newGameBtn = document.querySelector("#new-btn");
let newMatchBtn = document.querySelector("#new-match-btn");

let turnX = true;
let x = 0;
let y = 0;
let count = 0;

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

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnX) {
      box.innerText = "X";
    } else {
      box.innerText = "O";
    }

    colorChange(box);
    box.disabled = true;
    turnX = !turnX;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

function colorChange(box) {
  if (box.innerText === "O") {
    box.style.color = "green";
  } else {
    box.style.color = "red";
  }
}

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let val1 = boxes[pattern[0]].innerText;
    let val2 = boxes[pattern[1]].innerText;
    let val3 = boxes[pattern[2]].innerText;

    if (val1 !== "" && val1 === val2 && val2 === val3) {
      document.querySelector("#msg").innerText = `Congratulations, Winner is ${val1}`;
      msgContainer.classList.remove("hide");
      disableAllBoxes();

      if (val1 === "X") {
        x++;
        document.querySelector(".player-1").innerHTML = "Player 1 Score = " + x;
      } else {
        y++;
        document.querySelector(".player-2").innerHTML = "Player 2 Score = " + y;
      }

      return true;
    }
  }

  return false;
};

const gameDraw = () => {
  document.querySelector("#msg").innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableAllBoxes();
};

const disableAllBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

const resetGame = () => {
  turnX = true;
  count = 0;
  EnableAllBoxes();
};

const EnableAllBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
    msgContainer.classList.add("hide");
  });
};

const newSet = () => {
  turnX = true;
  count = 0;
  EnableAllBoxes();
  x = 0;
  y = 0;
  document.querySelector(".player-1").innerHTML = "Player 1 Score = " + x;
  document.querySelector(".player-2").innerHTML = "Player 2 Score = " + y;
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
newMatchBtn.addEventListener("click", newSet);
