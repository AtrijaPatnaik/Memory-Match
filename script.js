const icons = [
  '🍎', '🍌', '🍇', '🍒', '🍓', '🍍', '🍑', '🥝',
  '🍉', '🥥', '🍈', '🍋', '🥑', '🍆', '🥕', '🌽',
  '🍔', '🍕', '🍩', '🍪', '🧁', '🍫', '🥨', '🧀'
]; // Enough icons for all difficulties

const gameBoard = document.getElementById('game-board');
const movesDisplay = document.getElementById('moves');
const difficultySelect = document.getElementById('difficulty');
const startGameButton = document.getElementById('start-game');

let firstCard = null, secondCard = null;
let moves = 0;
let matchedPairs = 0;
let totalPairs;

startGameButton.addEventListener('click', () => {
  const difficulty = difficultySelect.value;
  initializeGame(difficulty);
});

function initializeGame(difficulty) {
  resetGame();
  
  let rows, cols;
  if (difficulty === 'easy') {
    rows = 4;
    cols = 4; // 8 pairs
  } else if (difficulty === 'medium') {
    rows = 6;
    cols = 4; // 12 pairs
  } else {
    rows = 6;
    cols = 6; // 18 pairs
  }

  totalPairs = (rows * cols) / 2;
  const selectedIcons = icons.slice(0, totalPairs);
  let cards = [...selectedIcons, ...selectedIcons];
  cards = cards.sort(() => 0.5 - Math.random()); // Shuffle

  renderGameBoard(cards, rows, cols);
}

function renderGameBoard(cards, rows, cols) {
  gameBoard.innerHTML = ''; // Clear previous board

  let cardIndex = 0;
  for (let i = 0; i < rows; i++) {
    const row = document.createElement('div');
    row.classList.add('row', 'justify-content-center', 'g-2');

    for (let j = 0; j < cols; j++) {
      const col = document.createElement('div');
      col.classList.add('col', 'card', 'col-2'); // Ensure even spacing
      col.dataset.icon = cards[cardIndex++];
      col.addEventListener('click', flipCard);
      row.appendChild(col);
    }
    gameBoard.appendChild(row);
  }
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
