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
  let playerTurn = true

  const restartGame = () => {
    scoreboard = ['', '', '', '', '', '', '', '', '']
    scoreX = 0
    scoreO = 0
    playerTurn = true
    endGame.classList.remove('end')
    gameboardEl.classList.remove('over')
  }

  const createGame = players => {
    gameboardEl.innerHTML = ''
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div')
      cell.classList.add('cell')
      cell.setAttribute('data-index', i)
      cell.textContent = scoreboard[i]
      gameboardEl.appendChild(cell)
    }
    gameboardEl.style.opacity = '1'
    playerMove(players)
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

  const random = () => {
    const idx = Math.floor(Math.random() * 9)
    if (scoreboard[idx]) {
      random()
    }
    console.log(idx)
    return idx
  }

  const updateScoreboard = (index, player) => {
    // console.log(player.type)
    if (player.type === 'AI') {
      const empty = scoreboard
        .map((cell, index) => !cell && index)
        .filter(e => e && e)
      const random = empty[Math.floor(Math.random() * empty.length)]
      console.log(random)
      index = random
    }
    if (scoreboard[index]) return
    scoreboard[index] = player.name
    createGame({ X, O })
  }

  const endOfGame = () => {
    endGame.classList.add('end')
    gameboardEl.classList.add('over')
    restartBtn.onclick = () => {
      restartGame()
      gameboardEl.style.opacity = '0'
      setTimeout(() => {
        mainMenu.style.opacity = '1'
        mainMenu.classList.remove('started')
      }, 1000)
    }
  }

  const playerMove = players => {
    checkWinner()
    console.log(checkWinner())
    if (scoreX === 3) {
      message.textContent = 'X Won!'
      endOfGame()
    } else if (scoreO === 3) {
      message.textContent = 'O Won!'
      endOfGame()
    }
    if (scoreX === 3 || scoreO === 3) return
    let cellNumber
    document.querySelectorAll('.cell').forEach(cell => {
      cell.addEventListener('click', e => {
        cellNumber = e.target.dataset.index
        updateScoreboard(cellNumber, playerTurn ? players.O : players.X)
      })
    })
    playerTurn = !playerTurn
    playerTurn &&
      players.O.type === 'AI' &&
      updateScoreboard(cellNumber, players.O)
  }

  const mainMenu = document.querySelector('.main-menu')
  const endGame = document.querySelector('.end-game')
  const message = document.querySelector('.message')
  const restartBtn = document.querySelector('#restartBtn')
  const humanBtn = document.querySelector('#human')
  const aiBtn = document.querySelector('#ai')

  return {
    mainMenu,
    humanBtn,
    aiBtn,
    createGame,
    restartGame,
    scoreboard,
    updateScoreboard,
    winningScores,
    checkWinner,
    playerMove,
  }
})()

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
  gameboard.restartGame()
  gameboard.createGame({ X, O })
}

gameboard.aiBtn.onclick = () => {
  O = player('O', 'AI')
  gameboard.mainMenu.classList.add('started')
  gameboard.restartGame()
  gameboard.createGame({ X, O })
}
