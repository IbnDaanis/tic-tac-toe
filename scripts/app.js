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
  const restartGame = () => {
    scoreboard = ['', '', '', '', '', '', '', '', '']
    scoreX = 0
    scoreO = 0
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
    if (checkWinner()) return
    const index = e.target.dataset.index
    scoreboard[index] = player
    e.target.textContent = player
    // if (player === 'X') {
    //   player = 'O'
    // } else if (player === 'O') {
    //   player = 'X'
    // }
    console.log({ scoreboard })
    bestMove()
    createGame()
    const winner = checkWinner()
    console.log({ winner })
  }

  const checkWinner = () => {
    let winner = null
    winningScores.forEach(win => {
      if (
        scoreboard[win[0]] === 'X' &&
        scoreboard[win[1]] === 'X' &&
        scoreboard[win[2]] === 'X'
      ) {
        winner = 'X'
      } else if (
        scoreboard[win[0]] === 'O' &&
        scoreboard[win[1]] === 'O' &&
        scoreboard[win[2]] === 'O'
      ) {
        winner = 'O'
      }
    })
    let openSpots = 0
    for (let i = 0; i < 9; i++) {
      if (scoreboard[i] === '') {
        openSpots++
      }
    }
    if (winner == null && openSpots === 0) {
      winner = 'tie'
    }
    return winner
  }

  const bestMove = () => {
    let bestScore = -Infinity
    let move
    for (let i = 0; i < 3; i++) {
      if (scoreboard[i] == '') {
        scoreboard[i] = 'O'
        let score = minimax(scoreboard, 0, false)
        scoreboard[i] = ''
        if (score > bestScore) {
          bestScore = score
          move = i
        }
      }
    }
    scoreboard[move] = 'O'
  }

  let scores = {
    X: 10,
    O: -10,
    tie: 0,
  }

  const minimax = (board, depth, isMaximizing) => {
    let result = checkWinner()
    if (result !== null) {
      return scores[result]
    }
    if (isMaximizing) {
      let bestScore = -Infinity
      for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
          board[i] = 'O'
          let score = minimax(board, depth + 1, false)
          board[i] = ''
          bestScore = Math.max(score, bestScore)
        }
      }
      return bestScore
    } else {
      let bestScore = Infinity
      for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
          board[i] = 'X'
          let score = minimax(board, depth + 1, true)
          board[i] = ''
          bestScore = Math.min(score, bestScore)
        }
      }
      return bestScore
    }
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
    bestMove,
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

gameboard.humanBtn.onclick = () => {
  O = player('O', 'human')
  gameboard.mainMenu.classList.add('started')
  gameboard.bestMove()
  gameboard.createGame()
  gameboard.gameboardEl.onclick = e => gameboard.playerMove(e)
}

gameboard.aiBtn.onclick = () => {
  O = player('O', 'AI')
  gameboard.mainMenu.classList.add('started')
  gameboard.bestMove()
  gameboard.createGame()
  gameboard.gameboardEl.onclick = e => gameboard.playerMove(e)
}
