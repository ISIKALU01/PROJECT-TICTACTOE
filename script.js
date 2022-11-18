const Player = (sign) => {
    let _sign = sign;
  
    const getSign = () => {
      return _sign;
    };
  
    return { getSign };
  };











const displayController = (() => {
    const fieldElements = document.querySelectorAll(".field");
    const restartButton = document.querySelector(".restart-button");

    
    fieldElements.forEach((field) =>
      field.addEventListener("click", (e) => {
        if(field.textContent)return;
        gameController.playRound(parseInt(e.target.dataset.index));
        updateGameboard();
      })
    );

    restartButton.addEventListener("click", (e) => {
      gameBoard.reset();
      gameController.reset();
      updateGameboard();   
    });
  
    const updateGameboard = () => {
      for (let i = 0; i < fieldElements.length; i++) {
        fieldElements[i].textContent = gameBoard.getField(i);  
      }
    };


  })();
  









  
const gameController = (() => {
  const _huPlayer = Player("X");
  const _aiPlayer = Player("O");

  const getHumanPlayer = () => _huPlayer;
  const getAiPlayer = () => _aiPlayer;
  let round = 0;
  let aiRound = 0;

  const playRound = (fieldIndex) => {
    gameBoard.setField(fieldIndex, getHumanPlayer().getSign()); 
    aiPlay()
    round++;
    //console.log(checkWinner(fieldIndex))
    //console.log(round)
    // console.log(aiRound)
  };
  
 


  const checkWinner = (fieldIndex) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];



    return winConditions
      .filter((combination) => combination.includes(fieldIndex))
      .some((possibleCombination) =>
        possibleCombination.every(
          (index) => gameBoard.getField(index) === getHumanPlayer().getSign()
        )
      );
  };


  const getIsOver = () => {
    return isOver;
  };
  
  const reset = () => {
    round = 0;
    isOver = false;
  };

  const aiPlay = () => {
    const emptyCells = gameBoard.getEmptyFields()
    gameBoard.setField(emptyCells[1], getAiPlayer().getSign())
    aiRound++;
    //console.log(emptyCells[1])
    //console.log(checkAiWinner(emptyCells[1]))
  }

  const checkAiWinner = (aiField) => {
    const aiWinConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return aiWinConditions
      .filter((combination) => combination.includes(aiField))
      .some((possibleCombination) =>
        possibleCombination.every(
          (index) => gameBoard.getField(index) === getAiPlayer().getSign()
        )
      );
  }
    return { playRound, getIsOver, reset, aiPlay };
  })();


















const gameBoard = (() => {
  const _board = new Array(9);

  const setField = (index, sign) => {
    if (index > _board.length) return;
    _board[index] = sign;
  };

  const getField = (index) => {
    if (index > _board.length) return;
    //console.log(_board)
    return _board[index];
  };

  const getEmptyFields = () => {
    fields = [];
    for (let i = 0; i < _board.length; i++) {
        const field = _board[i];
        if (field == undefined) {
            fields.push(i);
        }
    }
    return fields;
  }

  const reset = () => {
    for (let i = 0; i < _board.length; i++) {
      _board[i] = undefined;
    }
  };

  return { setField, getField, reset, getEmptyFields};
})();




