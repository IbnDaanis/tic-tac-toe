const gameboard = (() => {
  let scoreboard = ['', '', '', '', '', '', '', '', '']
  let scoreX = 0
  let scoreO = 0
  let player = false
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
    gameboardEl.innerHTML = ''
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div')
      cell.classList.add('cell')
      cell.setAttribute('data-index', i)
      cell.textContent = scoreboard[i]
      gameboardEl.appendChild(cell)
    }
    gameboardEl.style.opacity = '1'
    playerMove()
  }

  const checkWinner = () => {
    winningScores.forEach(win => {
      if (scoreX === 3 || scoreO === 3) return
      scoreX = 0
      scoreO = 0
      win.forEach(cell => {
        if (scoreboard[cell] === 'X') {
          scoreX++
        } else if (scoreboard[cell] === 'O') {
          scoreO++
        }
      })
    })
    return (scoreX === 3 && 'X won') || (scoreO === 3 && 'O won') || 'Draw'
  }
  const updateScoreboard = (index, player) => {
    if (scoreboard[index]) return
    scoreboard[index] = player
    createGame()
  }

  const playerMove = () => {
    document.querySelectorAll('.cell').forEach(cell => {
      cell.addEventListener('click', e => {
        if (scoreX === 3 || scoreO === 3) return
        const cellNumber = e.target.dataset.index

        player = !player
        updateScoreboard(cellNumber, player ? 'O' : 'X')
        console.log(checkWinner())
      })
    })
  }
  return {
    createGame,
    scoreboard,
    updateScoreboard,
    winningScores,
    checkWinner,
    playerMove,
  }
})()

gameboard.createGame()
gameboard.playerMove()
