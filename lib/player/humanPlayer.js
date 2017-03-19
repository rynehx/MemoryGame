class HumanPlayer {
  constructor(board) {
    this.board = board;
    this.type = 'human';
    this.movesLeft = 2;
    this.matchedCards = [];
    this.name = 'Henry';
  }
  addMatchCards(pair) {
    this.matchedCards.push(pair);
  }
}

export {HumanPlayer as default};
