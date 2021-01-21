const gameboard = (() => {
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
  let scoreboard = ['', '', '', '', '', '', '', '', '']
  let scoreX = 0
  let scoreO = 0
  let player = 'X'
  let filledSpaces = 0
  const restartGame = () => {
    scoreboard = ['', '', '', '', '', '', '', '', '']
    scoreX = 0
    scoreO = 0
    filledSpaces = 0
    playerTurn = true
    endGame.classList.remove('end')
    gameboardEl.classList.remove('over')
  }

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
  }

  const playerMove = e => {
    if (filledSpaces === 9) return
    const index = e.target.dataset.index
    scoreboard[index] = player
    filledSpaces++
    e.target.textContent = player
    if (player === 'X') {
      player = 'O'
    } else if (player === 'O') {
      player = 'X'
    }
    const winner = checkWinner()
    console.log(winner)
  }

  const checkWinner = () => {
    let winner
    winningScores.forEach(win => {
      const scores = []
      win.forEach(index => {
        scores.push(scoreboard[index])
      })
      if (scores.every(score => score === 'X')) {
        winner = 'X'
      } else if (scores.every(score => score === 'O')) {
        winner = 'O'
      } else if (filledSpaces === 9) {
        winner = 'tie'
      }
    })
    return winner
  }

  const mainMenu = document.querySelector('.main-menu')
  const endGame = document.querySelector('.end-game')
  const message = document.querySelector('.message')
  const restartBtn = document.querySelector('#restartBtn')
  const humanBtn = document.querySelector('#human')
  const aiBtn = document.querySelector('#ai')

  return {
    createGame,
    playerMove,
    mainMenu,
    humanBtn,
    aiBtn,
    gameboardEl,
  }
})()

gameboard

const player = (XorO, AIorHuman) => {
  const name = XorO
  const type = AIorHuman
  return { name, type }
}

const X = player('X', 'human')
let O

gameboard.humanBtn.onclick = e => {
  O = player('O', 'human')
  gameboard.mainMenu.classList.add('started')
  gameboard.createGame()
}

gameboard.gameboardEl.onclick = e => gameboard.playerMove(e)

gameboard.aiBtn.onclick = () => {
  O = player('O', 'AI')
  gameboard.mainMenu.classList.add('started')
  gameboard.createGame()
}
