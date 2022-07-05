const gameBoard = (() => {
  const getboard = () => document.querySelectorAll(".cell");

  getboard().forEach((cell, i) => {
    if (i === 1 || i == 7) {
      cell.style.borderLeft = "2px solid black";
      cell.style.borderRight = "2px solid black";
    };
    if (i === 3 || i === 5) {
      cell.style.borderTop = "2px solid black";
      cell.style.borderBottom = "2px solid black";
    };
    if(i === 4) {
      cell.style.border = "2px solid black";
    };
  })

  return {
    getboard
  };
})();

const player = (() => {
  const playerOneInput = document.getElementById("playerOne");
  const playerTwoInput = document.getElementById("playerTwo");
  let playerOne;
  let playerTwo;
  const playerFactory = (name, marker) => ({ name, marker });

  const getPlayer = () => {
    if(playerOneInput.value !== "" && playerTwoInput.value !== "") {
      playerOne = playerOneInput.value;
      playerTwo = playerTwoInput.value;


      playerOne = playerFactory(playerOne, "X")
      playerTwo = playerFactory(playerTwo, "O")

      return {
        playerOne, playerTwo
      };
    };
  };

  return {
    getPlayer
  };

})();

const renderChoices = (() => {

  const setChoice = (player, cell) => {
    if(player.marker === "X") {
      cell.innerText = "X";
    } else {
      cell.innerText = "O";
    }
  }

  return {
    setChoice
  };
})();

const game = (() => {
  const btnStartGame = document.getElementById("btn-game");
  const board = gameBoard.getboard();
  let playerOne;
  let playerTwo;
  let gameTurn = "playerOne";

  btnStartGame.addEventListener("click", () => {
    playerOne = player.getPlayer().playerOne;
    playerTwo = player.getPlayer().playerTwo;
  })

  board.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      if(gameTurn === "playerOne" && cell.innerText === "") {
        renderChoices.setChoice(playerOne, cell);
        gameTurn = "playerTwo";
      }
      if (gameTurn === "playerTwo" && cell.innerText === "") {
        renderChoices.setChoice(playerTwo, cell);
        gameTurn = "playerOne";
      }
      if(board[0].innerText === "X" && board[3].innerText === "X" && board[6].innerText === "X") {
        console.log("kk")
      }
    })
  })



})();
