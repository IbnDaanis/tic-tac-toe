const gameboard = (() => {
  const scoreboard = []
  const gameboardEl = document.querySelector('#gameboardEl')

  const createGame = () => {
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div')
      cell.classList.add('cell')
      scoreboard.push(cell.textContent)
      gameboardEl.appendChild(cell)
    }
  }
  return {
    createGame,
    scoreboard,
  }
})()

gameboard.createGame()
