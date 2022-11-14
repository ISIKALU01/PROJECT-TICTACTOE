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
    const playerX = Player("X");
    const playerO = Player("O");
    let round = 0;

  

    const playRound = (fieldIndex) => {
      gameBoard.setField(fieldIndex, getCurrentPlayerSign());
      round++;
    };
  
    const getCurrentPlayerSign = () => {
      return round % 2 === 1 ? playerX.getSign() : playerO.getSign();
    };
  
    const getIsOver = () => {
      return isOver;
    };
  
    const reset = () => {
      round = 1;
      isOver = false;
    };
  
    return { playRound, getIsOver, reset };
  })();







  const gameBoard = (() => {
  const _board = new Array(9);

  const setField = (index, sign) => {
    if (index > _board.length) return;
    _board[index] = sign;
  };

  const getField = (index) => {
    if (index > _board.length) return;
    return _board[index];
  };

  const reset = () => {
    for (let i = 0; i < _board.length; i++) {
      _board[i] = "";
    }
  };

  return { setField, getField, reset };
})();


