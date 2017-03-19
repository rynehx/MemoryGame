import HumanPlayer from '../player/humanPlayer.js';
import Board from './board.js';
import TurnSelector from './TurnSelector.js';

class Game {
  constructor(initializer, updater) {
    this.updater = updater;
    this.initializer = initializer;
    this.board = new Board;

    this.players = new TurnSelector((currentPlayer) => {
      currentPlayer.movesLeft = 2;
    });
    this.players.add(new HumanPlayer("Henry", this.board));
    this.players.add(new HumanPlayer("John", this.board));
  }
  reset(cb) {
    this.board.shuffle();
    this.players.reset();
    this.updater({game: this}, cb);
  }
  selectCard(card) {
    // TODO: make sure selecting same card doesn't activate again
    if (this.players.currentPlayer().movesLeft > 0 && this.board.checkValid(card)) {
      this.players.currentPlayer().movesLeft--;
      // update the board
      this.board.flip(card);
      // render view
      this.updater({game: this}, this.renderMove.bind(this));
    }
  }
  renderMove() {
    if (this.players.currentPlayer().movesLeft == 0) {
      setTimeout(function() {
        // unflip board and queue next player
        const matchedPair = this.board.endTurn();
        if (matchedPair) {
          this.players.currentPlayer().addMatchCards(matchedPair);
          this.updater({game: this}, () => {
            this.players.nextTurn(false);
          });
        } else {
          this.updater({game: this}, () => {
            this.players.nextTurn(true);
          });
        }
      }.bind(this), 500);
    }
  }
  isOver() {
    return this.board.deck.every((card) => {
      return card.matched;
    });
  }
  leader() {
    return this.players.allPlayers().reduce((leader, player) => {
      return leader.matchedCards.length < player.matchedCards.length ? player : leader;
    });
  }
};

export {Game as default};
