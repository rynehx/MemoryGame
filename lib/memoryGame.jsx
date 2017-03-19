// React
const React = require('react');
const ReactDOM = require('react-dom');
import Game from './game/game.js';
import _handleResize from './helper/resize.js';
import _handleResizeMatched from './helper/resizeMatched.js';

const App = React.createClass({
  _updateBoard: function(newState, cb) {
    this.setState(newState, cb);
  },
  getInitialState: function() {
    return {game: new Game({}, this._updateBoard)};
  },
  componentDidMount: function() {
    _handleResize();
    window.onresize = _handleResize;
  },
  componentDidUpdate: function() {
    _handleResizeMatched();
  },
  _clickCard: function(event) {
    const card = this.state.game.board.checkKey(event.target.getAttribute("value"));

    this.state.game.selectCard({
      value: card.value,
      suit: card.suit,
    });
  },
  _cardFace: function(card, key) {
    if (card.matched) {
      return <div className="card" key={key} onClick={this._clickCard} value={key} style={{visibility: 'hidden'}}/>;
    } else if (card.flipped) {
      return <div className="card" key={key} onClick={this._clickCard} value={key}>
        {card.suit + ' ' + card.value}
      </div>;
    } else {
      return <div className="card" key={key} onClick={this._clickCard} value={key}/>;
    }
  },
  _renderGameOver: function() {
    if (this.state.game.isOver()) {
      return <div id="game-over" style={{position: 'fixed'}}>
        Game Over! {this.state.game.leader().name} Won!
        <div className="play-again" onClick={
            function() {
              this.state.game.reset(_handleResize);
            }.bind(this)
          }>
          Play Again
        </div>
      </div>;
    }
  },
  render: function() {
    return (
      <div>
        {this._renderGameOver()}
        <div id="game-board">
          {this.state.game.board.allKeys().map((key) => {
            const card = this.state.game.board.checkKey(key);
            return this._cardFace(card, key);
          })}
        </div>
        <div id="complete-board">
        {
          this.state.game.players.allPlayers().map((player) => {
            return <div key={player.name}>
              <div className="player-score">{player.name + '  ' + '(' + player.matchedCards.length + ')'}</div>
              <div className="player-completed-container">
                {
                  player.matchedCards.map((cardPair, i) => {
                    return <div className = "matched-container" key={i}>
                      <div className="card">{cardPair[0].suit + ' ' + cardPair[0].value}</div>
                      <div className="card">{cardPair[1].suit + ' ' + cardPair[1].value}</div>
                    </div>;
                  })
                }
              </div>
            </div>;
          })
        }
        </div>
      </div>
    );
  },
});

document.addEventListener('DOMContentLoaded', function() {
  const main = document.getElementById('main');
  ReactDOM.render(React.createElement(App), main);
});
