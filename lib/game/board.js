const SUITS = ['♦', '♥', '♠', '♣'];
const COLORS = ['red', 'red', 'black', 'black'];
const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

let KEYS = [];
let KEYSHASH = {};

class Board {
  constructor() {
    this.deck = [];
    this.currentlyFlipped = [];

    SUITS.forEach((suit, i) => {
      VALUES.forEach((value) => {
        this.deck.push({
          color: COLORS[i],
          suit: suit,
          value: value,
          matched: false,
          flipped: false,
        });
      });
    });
    this.shuffle();
  }
  shuffle() { // shuffles and resets card using fisher-yates
    const deckSize = this.deck.length;
    KEYS = [];
    KEYSHASH = {};

    for(let i = deckSize - 1; i >= 0; i--) {
      let replaceIdx = randInt(i + 1);
      [this.deck[i], this.deck[replaceIdx]] = [this.deck[replaceIdx], this.deck[i]];
    }

    this.deck.forEach((card, i) => {
      this.deck[i].matched = false;
      this.deck[i].flipped = false;

      const randomNum = Math.random();
      KEYS.push(randomNum);
      KEYSHASH[randomNum] = card;
    });
  }
  flip(cardSpec) {
    const foundCard = this.deck.find((card) => {
      return card.suit == cardSpec.suit && card.value == cardSpec.value;
    });
    foundCard.flipped = true;
    this.currentlyFlipped.push(foundCard);
  }
  endTurn() {
    let matchedPair;
    if (this.currentlyFlipped.length == 2) {
      if (this.currentlyFlipped[0].value == this.currentlyFlipped[1].value) {
        this.currentlyFlipped.forEach((card) => {
          card.matched = true;
        });
        matchedPair = this.currentlyFlipped;
      }

      this.currentlyFlipped.forEach((card) => {
        card.flipped = false;
      });
    }
    this.currentlyFlipped = [];
    return matchedPair;
  }
  checkKey(key) {
    return KEYSHASH[key];
  }
  allKeys() {
    return KEYS;
  }
  checkValid(cardSpec) {
    const foundCard = this.deck.find((card) => {
      return card.suit == cardSpec.suit && card.value == cardSpec.value;
    });
    return this.checkUniq(cardSpec) && !foundCard.matched;
  }
  checkUniq(card) {
    if (this.currentlyFlipped.length > 0) {
      return card.value != this.currentlyFlipped[0].value || card.suit != this.currentlyFlipped[0].suit;
    } else {
      return true;
    }
  }
};

export {Board as default};

function randInt(n) {
  return Math.floor(Math.random()*n);
}
