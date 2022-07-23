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

    horizontal.push([board[0].innerText, board[1].innerText, board[2].innerText], [board[3].innerText, board[4].innerText, board[5].innerText], [board[6].innerText, board[7].innerText, board[8].innerText]);

    vertical.push([board[0].innerText, board[3].innerText, board[6].innerText], [board[1].innerText, board[4].innerText, board[7].innerText], [board[2].innerText, board[5].innerText, board[8].innerText])

    sides.push([board[0].innerText, board[4].innerText, board[8].innerText], [board[2].innerText, board[4].innerText, board[6].innerText])

    return {
      horizontal, vertical, sides
    }
  };


  return {
    getMatriz
  }
})()

const game = (() => {
  const gridContainer = document.querySelector(".grid-container");
  const btnStartGame = document.getElementById("btn-game");
  const playerOneScore = document.querySelector(".playerOne_score");
  const playerTwoScore = document.querySelector(".playerTwo_score");
  const winner = document.querySelector(".winner");
  const board = gameBoard.board;
  let gameTurn = "playerOne";
  let playerOne;
  let playerTwo;
  let matrizHorizontal = matriz.getMatriz().horizontal;
  let matrizVertical = matriz.getMatriz().vertical;
  let matrizSides = matriz.getMatriz().sides;

  btnStartGame.addEventListener("click", () => {
    playerOne = player.getPlayer().playerOne;
    playerTwo = player.getPlayer().playerTwo;
  })

  board.forEach((cell, i) => {
    cell.addEventListener("click", () => {
      if(playerOneScore.innerText < 5) {
        if(game.gameTurn === "playerOne" && cell.innerText === "") {
          renderChoices.setChoice(playerOne, cell);
          game.gameTurn = "playerTwo";
  
          matrizHorizontal = matriz.getMatriz().horizontal;
          matrizVertical = matriz.getMatriz().vertical;
          matrizSides = matriz.getMatriz().sides;
          
          if(/X,X,X/.test(matrizHorizontal[0]) || /X,X,X/.test(matrizHorizontal[1]) || /X,X,X/.test(matrizHorizontal[2]) || /X,X,X/.test(matrizVertical[0]) || /X,X,X/.test(matrizVertical[1]) || /X,X,X/.test(matrizVertical[2]) || /X,X,X/.test(matrizSides[0]) || /X,X,X/.test(matrizSides[1])) {
            winner.innerText = `${playerOne.name} venceu`;
            gridContainer.style.pointerEvents = 'none';
            
            setTimeout(() => {
              restart.restartBoard();
              playerOneScore.innerText = Number(playerOneScore.innerText) + 1;
              gridContainer.style.pointerEvents = 'all';
            }, 1000);
  
          }
        }
      } else {
        restart.restartScore();
      }
      if(playerTwoScore.innerText < 5) {
        if (game.gameTurn === "playerTwo" && cell.innerText === "") {
          renderChoices.setChoice(playerTwo, cell);
          game.gameTurn = "playerOne";
  
          matrizHorizontal = matriz.getMatriz().horizontal;
          matrizVertical = matriz.getMatriz().vertical;
          matrizSides = matriz.getMatriz().sides;
  
          if(/O,O,O/.test(matrizHorizontal[0]) || /O,O,O/.test(matrizHorizontal[1]) || /O,O,O/.test(matrizHorizontal[2]) || /O,O,O/.test(matrizVertical[0]) || /O,O,O/.test(matrizVertical[1]) || /O,O,O/.test(matrizVertical[2]) || /O,O,O/.test(matrizSides[0]) || /O,O,O/.test(matrizSides[1])) {
            winner.innerText = `${playerOne.name} venceu`;
            gridContainer.style.pointerEvents = 'none';
            
            setTimeout(() => {
              playerTwoScore.innerText = Number(playerTwoScore.innerText) + 1;
              restart.restartBoard();
              gridContainer.style.pointerEvents = 'all';
            }, 1000);
  
          }
        }
      } else {
        restart.restartScore();
      }
    })
  })

  return {
    board, gameTurn, playerOneScore, playerTwoScore
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

