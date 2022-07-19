const gameBoard = (() => {
  const board = document.querySelectorAll(".cell");

  board.forEach((cell, i) => {
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
    board
  };
})();

const player = (() => {
  const playerOneInput = document.getElementById("playerOne");
  const playerTwoInput = document.getElementById("playerTwo");
  const playerFactory = (name, marker) => ({ name, marker });

  const getPlayer = () => {
    if(playerOneInput.value !== "" && playerTwoInput.value !== "") {
      let playerOne = playerOneInput.value;
      let playerTwo = playerTwoInput.value;


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

const matriz = (() => {
  const board = gameBoard.board;

  const getMatriz = () => {
    let horizontal = [];
    let vertical = [];
    let sides = [];

    board.forEach(item => {
      horizontal.push(item.innerText)
    })

    vertical.push(board[0].innerText, board[3].innerText, board[6].innerText, board[1].innerText, board[4].innerText, board[7].innerText, board[2].innerText, board[5].innerText, board[8].innerText);
    sides.push(board[0].innerText, board[4].innerText, board[8].innerText, board[2].innerText, board[4].innerText, board[6].innerText);

    return {
      horizontal, vertical, sides
    }
  };


  return {
    getMatriz
  }
})()

const game = (() => {
  const btnStartGame = document.getElementById("btn-game");
  const playerOneScore = document.querySelector(".playerOne_score");
  const playerTwoScore = document.querySelector(".playerTwo_score");
  const winner = document.querySelector(".winner");
  const board = gameBoard.board;
  let gameTurn = "playerOne";
  let playerOne;
  let playerTwo;
  let horizontalMatriz = matriz.getMatriz().horizontal.toString();
  let verticalMatriz = matriz.getMatriz().vertical.toString();
  let sidesMatriz = matriz.getMatriz().sides.toString();

  btnStartGame.addEventListener("click", () => {
    playerOne = player.getPlayer().playerOne;
    playerTwo = player.getPlayer().playerTwo;
  })

  board.forEach((cell, i) => {
    cell.addEventListener("click", () => {
      if(game.gameTurn === "playerOne" && cell.innerText === "") {
        renderChoices.setChoice(playerOne, cell);
        game.gameTurn = "playerTwo";

        game.horizontalMatriz = matriz.getMatriz().horizontal.toString();
        game.verticalMatriz = matriz.getMatriz().vertical.toString();
        game.sidesMatriz = matriz.getMatriz().sides.toString();

        console.log(`Horizontal ${game.horizontalMatriz}`);
        console.log(`Vertical ${game.verticalMatriz}`);
        console.log(`Sides ${game.sidesMatriz}`);

        if(/X,X,X/.test(horizontalMatriz) || /X,X,X/.test(verticalMatriz) || /X,X,X/.test(sidesMatriz)) {
          winner.innerText = `${playerOne.name} venceu`;
          console.log("jogador um venceu");

          if(Number(playerOneScore.innerText) <= 5) {
            playerOneScore.innerText = Number(playerOneScore.innerText) + 1;
            restart.restartBoard();
          } else {
            restart.restartScore();
          }
        }
      }
      else if (game.gameTurn === "playerTwo" && cell.innerText === "") {
        renderChoices.setChoice(playerTwo, cell);
        game.gameTurn = "playerOne";

        game.horizontalMatriz = matriz.getMatriz().horizontal.toString();
        game.verticalMatriz = matriz.getMatriz().vertical.toString();
        game.sidesMatriz = matriz.getMatriz().sides.toString();

        console.log(`Horizontal ${horizontalMatriz}`);
        console.log(`Vertical ${verticalMatriz}`);
        console.log(`Sides ${sidesMatriz}`);

        if(/O,O,O/.test(horizontalMatriz) || /O,O,O/.test(verticalMatriz) || /O,O,O/.test(sidesMatriz)) {
          winner.innerText = `${playerTwo.name} venceu`;
          console.log("jogador dois venceu");

          if(Number(playerTwoScore.innerText) <= 5) {
            playerTwoScore.innerText = Number(playerTwoScore.innerText) + 1;
            restart.restartBoard();
          } else {
            restart.restartScore();
          }
        }
      }
    })
  })

  return {
    board, gameTurn, playerOneScore, playerTwoScore, horizontalMatriz, verticalMatriz, sidesMatriz
  }
})();

const restart = (() => {
  const btnRestart = document.getElementById("btn-restart")
  const board = game.board;
  const restartBoard = () => {
    board.forEach(cell => {
      cell.innerText = "";
    })
    game.gameTurn = "playerOne";
  }
  const restartScore = () => {
    game.playerOneScore.innerText = "";
    game.playerTwoScore.innerText = "";
  }

  btnRestart.addEventListener("click", () => {
    board.forEach(cell => {
      cell.innerText = "";
    })
    game.gameTurn = "playerOne";
  })

  return {
    restartBoard, restartScore
  }
})()

