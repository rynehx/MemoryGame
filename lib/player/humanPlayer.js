class HumanPlayer {
  constructor(name, board) {
    this.board = board;
    this.type = 'human';
    this.movesLeft = 2;
    this.matchedCards = [];
    this.name = name;
  }
  addMatchCards(pair) {
    this.matchedCards.push(pair);
  }
}

export {HumanPlayer as default};
