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
  const board = gameBoard.board;
  let playerOne = "";
  let playerTwo = "";
  let gameTurn = "playerOne";
  let regExpPlayerOne = /X,X,X/;
  let regExpPlayerTwo = /O,O,O/;

  sidesMatriz = matriz.getMatriz().sides.join("");

  btnStartGame.addEventListener("click", () => {
    playerOne = player.getPlayer().playerOne;
    playerTwo = player.getPlayer().playerTwo;
  })

  board.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      if(gameTurn === "playerOne" && cell.innerText === "") {
        renderChoices.setChoice(playerOne, cell);
        gameTurn = "playerTwo";

        let horizontalMatriz = matriz.getMatriz().horizontal.toString();
        let verticalMatriz = matriz.getMatriz().vertical.toString();
        let sidesMatriz = matriz.getMatriz().sides.toString();

        if(regExpPlayerOne.test(horizontalMatriz) || regExpPlayerOne.test(verticalMatriz) || regExpPlayerOne.test(sidesMatriz)) {
          console.log("jogador um é o vencedor");
        }
      }
      else if (gameTurn === "playerTwo" && cell.innerText === "") {
        renderChoices.setChoice(playerTwo, cell);
        gameTurn = "playerOne";

        let horizontalMatriz = matriz.getMatriz().horizontal.toString();
        let verticalMatriz = matriz.getMatriz().vertical.toString();
        let sidesMatriz = matriz.getMatriz().sides.toString();

        if(regExpPlayerTwo.test(horizontalMatriz) || regExpPlayerTwo.test(verticalMatriz) || regExpPlayerTwo.test(sidesMatriz)) {
          console.log("jogador dois é o vencedor");
        }
      }
    })
  })

  return {
    board
  }
})();

const restart = (() => {
  const btnRestart = document.getElementById("btn-restart")
  const board = game.board;

  btnRestart.addEventListener("click", () => {
    board.forEach(item => {
      item.innerText = "";
    })
  })

})()

