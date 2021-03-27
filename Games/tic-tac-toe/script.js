document.addEventListener('DOMContentLoaded', (event) => {
  const box = document.querySelectorAll('.box')
  let playerOneTurn = true
  let turn = 1

  let playerOneBoxes = []
  let playerTwoBoxes = []

  box.forEach(element => {
    element.addEventListener('click', () => {
      if (element.dataset.isSelected !== 'true') {
        if (turn >= box.length) {
          endGame()
        } else {
          if (playerOneTurn) {
            element.style.backgroundColor = 'red'
            playerOneBoxes.push(parseInt(element.id))
            analyseCondition(playerOneBoxes, 'Player One')
          } else {
            element.style.backgroundColor = 'blue'
            playerTwoBoxes.push(parseInt(element.id))
            analyseCondition(playerTwoBoxes, 'Player Two')
          }
          element.dataset.isSelected = 'true'
          playerOneTurn = !playerOneTurn
        }
        turn++
      }
    })
  })
})

//End game function
function endGame (finalMessage) {
  const resultScreen = document.querySelector('#game-result-screen')
  const finalMessageElement = document.querySelector('#final-message')
  resultScreen.style.display = 'flex'
  finalMessageElement.innerHTML = finalMessage !== undefined
    ? finalMessage
    : 'Draw'
}

//Analysing if the player has won
function analyseCondition (playerNumbers, playerName) {
  const winningConditions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ]

  if (playerNumbers.length < 2) {
    return null
  }

  winningConditions.forEach(winningNumbers => {
    let matched = 0
    playerNumbers.forEach(playerNumber => {
      if (winningNumbers.includes(playerNumber)) {
        matched++
      }
    })
    if (matched === 3) {
      endGame(playerName + ' Won!')
    }
  })

}