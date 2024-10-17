const icons = [
  '🍎', '🍌', '🍇', '🍒', '🍓', '🍍', '🍑', '🥝',
  '🍉', '🥥', '🍈', '🍋', '🥑', '🍆', '🥕', '🌽',
  '🍔', '🍕', '🍩', '🍪', '🧁', '🍫', '🥨', '🧀'
]; // Enough icons for all difficulty levels

const gameBoard = document.getElementById('game-board');
const movesDisplay = document.getElementById('moves');
const difficultySelect = document.getElementById('difficulty');
const startGameButton = document.getElementById('start-game');

let firstCard = null, secondCard = null;
let moves = 0;
let matchedPairs = 0;
let gridSize, totalPairs;

// Handle game start based on difficulty
startGameButton.addEventListener('click', () => {
  const difficulty = difficultySelect.value;
  initializeGame(difficulty);
});

function initializeGame(difficulty) {
  resetGame();

  if (difficulty === 'easy') {
    gridSize = [4, 4]; // 4x4 grid = 8 pairs
  } else if (difficulty === 'medium') {
    gridSize = [6, 4]; // 6x4 grid = 12 pairs
  } else {
    gridSize = [6, 6]; // 6x6 grid = 18 pairs
  }

  totalPairs = (gridSize[0] * gridSize[1]) / 2;
  const selectedIcons = icons.slice(0, totalPairs);
  let cards = [...selectedIcons, ...selectedIcons]; // Create pairs

  cards = cards.sort(() => 0.5 - Math.random()); // Shuffle cards

  renderGameBoard(cards, gridSize);
}

function renderGameBoard(cards, gridSize) {
  gameBoard.innerHTML = ''; // Clear previous board

  gameBoard.style.gridTemplateColumns = `repeat(${gridSize[1]}, 1fr)`;
  cards.forEach(icon => {
    const card = document.createElement('div');
    card.classList.add('col', 'card');
    card.dataset.icon = icon;
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (this === firstCard || this.classList.contains('flipped')) return;

  this.classList.add('flipped');
  this.textContent = this.dataset.icon;

  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    checkMatch();
  }
}

function checkMatch() {
  moves++;
  movesDisplay.textContent = `Moves: ${moves}`;

  if (firstCard.dataset.icon === secondCard.dataset.icon) {
    matchedPairs++;
    firstCard.classList.add('hidden');
    secondCard.classList.add('hidden');
    resetCards();

    if (matchedPairs === totalPairs) {
      setTimeout(() => alert('Congratulations! You matched all pairs!'), 300);
    }
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      firstCard.textContent = '';
      secondCard.textContent = '';
      resetCards();
    }, 1000);
  }
}

function resetCards() {
  firstCard = null;
  secondCard = null;
}

function resetGame() {
  moves = 0;
  matchedPairs = 0;
  movesDisplay.textContent = 'Moves: 0';
  gameBoard.innerHTML = '';
}
