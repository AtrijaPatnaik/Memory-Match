const icons = [
  '🍎', '🍌', '🍇', '🍒', '🍓', '🍍', '🍑', '🥝',
  '🍉', '🥥', '🍈', '🍋', '🥑', '🍆', '🥕', '🌽'
];
let cards = [...icons, ...icons]; // Create 32 cards (16 pairs)
let firstCard = null, secondCard = null;
let moves = 0;
let matchedPairs = 0;

const gameBoard = document.getElementById('game-board');
const movesDisplay = document.getElementById('moves');

// Shuffle the cards
cards = cards.sort(() => 0.5 - Math.random());

// Create card elements
cards.forEach(icon => {
  const card = document.createElement('div');
  card.classList.add('col', 'card');
  card.dataset.icon = icon;
  card.addEventListener('click', flipCard);
  gameBoard.appendChild(card);
});

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

    if (matchedPairs === icons.length) {
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
