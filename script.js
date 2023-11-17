const board = document.querySelector('.board');
const overlay = document.getElementById('overlay');
const restartButton = document.getElementById('restart');
const playerNameInput = document.getElementById('player-name');
const playerScoresList = document.getElementById('player-scores');
const gameOverMessage = document.getElementById('game-over-message');
const rows = 8;
const cols = 8;
const totalCells = rows * cols;
const totalMines = 5;
let minePositions = generateRandomMines(totalMines, totalCells);
let score = 0;
let startTime = null;
let playerName = '';
 function generateRandomMines(totalMines, totalCells) {
  const positions = new Set();
  while (positions.size < totalMines) {
    const randomPosition = Math.floor(Math.random() * totalCells);
    positions.add(randomPosition);
  }
  return Array.from(positions);
}
 function createBoard() {
  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    board.appendChild(cell);
  }
}
 function revealBoard() {
  cells.forEach((cell, index) => {
    if (minePositions.includes(index)) {
      cell.classList.add('mine');
      cell.textContent = '💣';
    } else {
      cell.classList.add('revealed');
    }
  });
}
 createBoard();
const cells = document.querySelectorAll('.cell');
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (cell.classList.contains('revealed')) {
      return;
    }
    if (minePositions.includes(index)) {
      revealBoard();
      showGameOver();
    } else {
      cell.classList.add('revealed');
      score++;
    }
  });
});
 restartButton.addEventListener('click', () => {
  hideGameOver();
  resetBoard();
});
 function showGameOver() {
  overlay.style.display = 'flex';
  gameOverMessage.textContent = `Perdiste! Score: ${score} - Tiempo: ${getTime()}`;
  const playerScore = document.createElement('li');
  playerScore.textContent = `Jugador: ${playerName} - Score: ${score} - Tiempo: ${getTime()}`;
  playerScoresList.appendChild(playerScore);
}
 function hideGameOver() {
  overlay.style.display = 'none';
  playerNameInput.value = '';
}
 function resetBoard() {
  cells.forEach((cell) => {
    cell.classList.remove('mine', 'revealed');
    cell.textContent = '';
  });
  score = 0;
  minePositions = generateRandomMines(totalMines, totalCells);
}
 function startGame() {
  hideGameOver();
  resetBoard();
  startTimer();
  playerName = playerNameInput.value || 'Anónimo';
  const playerNameElement = document.createElement('li');
  playerNameElement.textContent = `Jugador: ${playerName}`;
  playerScoresList.innerHTML = ''; // Limpiar la lista antes de agregar el nombre
  playerScoresList.appendChild(playerNameElement);
}
 function startTimer() {
  startTime = new Date();
}
 function getTime() {
  if (startTime) {
    const currentTime = new Date();
    const timeDiff = Math.floor((currentTime - startTime) / 1000); // Diferencia en segundos
    return `${timeDiff} s`;
  }
  return '0 s';
}