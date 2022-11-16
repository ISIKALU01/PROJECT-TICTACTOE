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

  
  const playRound = (fieldIndex) => {
    gameBoard.setField(fieldIndex, getHumanPlayer().getSign()); 
    bestSpot()
    round++;
  };
  
  const getIsOver = () => {
    return isOver;
  };
  
  const reset = () => {
    round = 0;
    isOver = false;
  };

  const bestSpot = () => {
    const emptyCells = gameBoard.getEmptyFields()
    gameBoard.setField(emptyCells[0], getAiPlayer().getSign())  
  }
  
  
    return { playRound, getIsOver, reset, bestSpot };
  })();









const gameBoard = (() => {
  const _board = new Array(9);
  //const _board = ["", "", "", "", "", "", "", "", ""];

  const setField = (index, sign) => {
    if (index > _board.length) return;
    _board[index] = sign;
  };

  const getField = (index) => {
    if (index > _board.length) return;
    console.log(_board)
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




