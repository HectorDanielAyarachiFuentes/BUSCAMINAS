// Acceso a elementos del DOM y configuración inicial del juego.
const board = document.querySelector('.board'); // Selecciona el elemento con la clase 'board'
const overlay = document.getElementById('overlay'); // Selecciona el elemento con el ID 'overlay'
const restartButton = document.getElementById('restart'); // Selecciona el elemento con el ID 'restart'
const playerNameInput = document.getElementById('player-name'); // Selecciona el elemento con el ID 'player-name'
const playerScoresList = document.getElementById('player-scores'); // Selecciona el elemento con el ID 'player-scores'
const gameOverMessage = document.getElementById('game-over-message'); // Selecciona el elemento con el ID 'game-over-message'
const rows = 8; // Número de filas del tablero
const cols = 8; // Número de columnas del tablero
const totalCells = rows * cols; // Número total de celdas en el tablero
const totalMines = 5; // Número total de minas en el tablero
let minePositions = generateRandomMines(totalMines, totalCells); // Genera las posiciones aleatorias de las minas
let score = 0; // Puntuación del jugador
let startTime = null; // Tiempo de inicio del juego
let playerName = ''; // Nombre del jugador


// Genera posiciones aleatorias para las minas en el tablero
function generateRandomMines(totalMines, totalCells) {
  const positions = new Set();
  while (positions.size < totalMines) {
    const randomPosition = Math.floor(Math.random() * totalCells);
    positions.add(randomPosition);
  }
  return Array.from(positions);
}

// Crea el tablero de juego
function createBoard() {
  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    board.appendChild(cell);
  }
}

// Muestra todas las minas en el tablero
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

// Crea el tablero al cargar la página
createBoard();

const cells = document.querySelectorAll('.cell'); // Selecciona todas las celdas del tablero
cells.forEach((cell, index) => {
  // Agrega un evento de clic a cada celda
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

// Reinicia el juego al hacer clic en el botón de reinicio
restartButton.addEventListener('click', () => {
  hideGameOver();
  resetBoard();
});

// Muestra el mensaje de fin de juego
function showGameOver() {
  overlay.style.display = 'flex';
  gameOverMessage.textContent = `Perdiste! Score: ${score} - Tiempo: ${getTime()}`;
  const playerScore = document.createElement('li');
  playerScore.textContent = `Jugador: ${playerName} - Score: ${score} - Tiempo: ${getTime()}`;
  playerScoresList.appendChild(playerScore);
}

// Oculta el mensaje de fin de juego
function hideGameOver() {
  overlay.style.display = 'none';
  playerNameInput.value = '';
}

// Reinicia el tablero y la puntuación del jugador
function resetBoard() {
  cells.forEach((cell) => {
    cell.classList.remove('mine', 'revealed');
    cell.textContent = '';
  });
  score = 0;
  minePositions = generateRandomMines(totalMines, totalCells);
}

// Inicia el juego al hacer clic en el botón de inicio
function startGame() {
  hideGameOver();
  resetBoard();
  startTimer();
  playerName = playerNameInput.value || 'Anónimo'; // Asigna el valor del campo de entrada al jugador
  const playerNameElement = document.createElement('li');
  playerNameElement.textContent = `Jugador: ${playerName}`;
  playerScoresList.innerHTML = ''; // Limpiar la lista antes de agregar el nombre
  playerScoresList.appendChild(playerNameElement);
}
// Inicia el temporizador del juego
function startTimer() {
  startTime = Date.now();
  intervalId = setInterval(updateTime, 1000);
}

// Actualiza el tiempo en pantalla
function updateTime() {
  const currentTime = Date.now();
  const timeDiff = Math.floor((currentTime - startTime) / 1000);
  gameOverMessage.textContent = `Perdiste! Score: ${score} - Tiempo: ${timeDiff} s`;
}

// Obtiene el tiempo transcurrido desde el inicio del juego
function getTime() {
  if (startTime) {
    const currentTime = Date.now();
    const timeDiff = Math.floor((currentTime - startTime) / 1000);
    return `${timeDiff} s`;
  }
  return '0 s';
}