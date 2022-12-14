const Player = (sign) => {
    let _sign = sign;
  
    const getSign = () => {
      return _sign;
    };
  
    return { getSign };
  };


const fieldElements = document.querySelectorAll(".field");
const updateGameboard = () => {
  for (let i = 0; i < fieldElements.length; i++) {
    fieldElements[i].textContent = gameBoard.getField(i);  
  }
};





const displayController = (() => {
    const restartButton = document.querySelector(".restart-button");

    restartButton.addEventListener("click", (e) => {
      gameBoard.reset();
      gameController.reset();
      updateGameboard();   
    });

    fieldElements.forEach((field) =>
    field.addEventListener("click", (e) => {
    if(field.textContent)return;
    gameController.playRound(parseInt(e.target.dataset.index));
    updateGameboard()
    })
  )
  })();
  










  
const gameController = (() => {
  const _huPlayer = Player("X");
  const _aiPlayer = Player("O");

  const getHumanPlayer = () => _huPlayer;
  const getAiPlayer = () => _aiPlayer;
  let round = 0;

  const playRound = (fieldIndex) => {
    gameBoard.setField(fieldIndex, getHumanPlayer().getSign());
    const emptyCells = gameBoard.getEmptyFields();
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    if(checkWinner(fieldIndex)){
      gameBoard.setField(emptyCells[randomIndex], "")
    }else{
      gameBoard.setField(emptyCells[randomIndex], getAiPlayer().getSign());
    }
    
    round++;

    const modal = document.querySelector('.modal')
    const overlay = document.querySelector('.overlay');
    const huMsg = document.querySelector('.x')
    const aiMsg = document.querySelector('.o')
    const draw = document.querySelector('.draw')

    function closeModal(){
      overlay.classList.remove('active')
      modal.classList.remove('active')
      gameBoard.reset()
      reset()
      updateGameboard()
      huMsg.textContent = ""
      draw.textContent = ""
      aiMsg.textContent = ""
    }

    if(checkWinner(fieldIndex)){
      overlay.classList.add('active')
      modal.classList.add('active')
      huMsg.textContent = "YOU HAVE WON"
    }else if(round == 5 && checkWinner(fieldIndex) == false){
      overlay.classList.add('active')
      modal.classList.add('active')
      draw.textContent = "IT'S A DRAW"
    }else if(checkAiWinner(emptyCells[randomIndex])){
      overlay.classList.add('active')
      modal.classList.add('active')
      aiMsg.textContent = "AI PLAYER WINS"
    }

    overlay.onclick = closeModal
    modal.onclick = closeModal
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

  
  const reset = () => {
    round = 0;
  };

    return { playRound, reset};
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









