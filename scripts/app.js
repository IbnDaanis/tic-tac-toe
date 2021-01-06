const gameboard = (() => {
  let scoreboard = ['', '', '', '', '', '', '', '', '']
  const gameboardEl = document.querySelector('#gameboardEl')
  const winningScores = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  const createGame = () => {
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div')
      cell.classList.add('cell')
      cell.setAttribute('data-index', i)
      console.log(scoreboard)
      cell.textContent = scoreboard[i]
      gameboardEl.appendChild(cell)
    }
  }
  const updateScoreboard = scores => {
    scoreboard = scores
  }
  return {
    createGame,
    scoreboard,
    updateScoreboard,
    winningScores,
  }
})()

gameboard.updateScoreboard(['', '', '', '', '', 'X', 'X', ''])
gameboard.createGame()
