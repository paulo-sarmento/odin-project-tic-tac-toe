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

const boardMatriz = (() => {
  const board = gameBoard.getboard();
  let horizontal = [];
  let vertical = [];
  let sides = [];

  board.forEach(item => {
    horizontal.push(item)
  })
  vertical.push(board[0], board[3], board[6], board[1], board[4], board[7], board[2], board[5], board[8]);
  sides.push(board[0], board[4], board[8], board[2], board[4], board[6])

  return {
    horizontal, vertical, sides
  }
})()

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
    })
  })

  console.log(boardMatriz.horizontal);
  console.log(boardMatriz.vertical);
  console.log(boardMatriz.sides);

})();

