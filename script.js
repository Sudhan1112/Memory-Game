let flippedCards = [];
let isLocked = false;
let noOfMoves = 0;
const mgGameNoOfMoves = document.getElementById("mg-game-no-of-moves");

const cardValues = ["🚩", "🟩", "🟥", "🟦", "🟨", "⭐", "🌟", "🎯", "🎮", "🎲", "🃏", "🎻", 
                    "🚩", "🟩", "🟥", "🟦", "🟨", "⭐", "🌟", "🎯", "🎮", "🎲", "🃏", "🎻"];

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createCard(value) {
  const card = document.createElement("div");
  card.classList.add("mg-game-card");
  card.innerHTML = `
        <div class="mg-game-card-front">❓</div>
        <div class="mg-game-card-back">${value}</div>
    `;
  card.addEventListener("click", flipCard);
  return card;
}

function createCards(cardValues) {
  const gameContainer = document.getElementById("mg-game-game-area");
  gameContainer.innerHTML = "";
  const shuffledValues = shuffle(cardValues);
  shuffledValues.forEach((value) => {
    const card = createCard(value);
    gameContainer.appendChild(card);
  });
}

function flipCard() {
  if (isLocked) return;
  if (this.classList.contains("flip")) return;
  if (flippedCards.length === 2) return;

  this.classList.add("flip");
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    noOfMoves++;
    mgGameNoOfMoves.innerHTML = `Moves: ${noOfMoves}`;
    checkForMatch();
  }
}

function checkForMatch() {
  const [card1, card2] = flippedCards;
  const value1 = card1.querySelector(".mg-game-card-back").textContent;
  const value2 = card2.querySelector(".mg-game-card-back").textContent;

  if (value1 === value2) {
    flippedCards = [];
  } else {
    isLocked = true;
    setTimeout(() => {
      card1.classList.remove("flip");
      card2.classList.remove("flip");
      flippedCards = [];
      isLocked = false;
    }, 1000);
  }
}

function resetGame() {
  noOfMoves = 0;
  mgGameNoOfMoves.innerHTML = `Moves: ${noOfMoves}`;
  createCards(cardValues);
}

document.getElementById("resetGame").addEventListener("click", resetGame);

createCards(cardValues);
