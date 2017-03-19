const playerNameSpace = window.innerHeight*0.03;

const _handleResizeMatched = function() {
  const completeBoards = document.getElementsByClassName('player-completed-container');
  Array.prototype.forEach.call(completeBoards, (playerCompleteBoard, j) => {
    // TODO: add displacement for each player
    if (playerCompleteBoard.children) {
      Array.prototype.forEach.call(playerCompleteBoard.children, (el, i) => {
        const card1 = el.children[0];
        const card2 = el.children[1];
        card1.style.height = window.innerHeight*0.1 + 'px';
        card1.style.width = window.innerWidth*0.06 + 'px';
        card1.style.fontSize = window.innerWidth*0.02 + 'px';

        card2.style.height = window.innerHeight*0.1 + 'px';
        card2.style.width = window.innerWidth*0.06 + 'px';
        card2.style.fontSize = window.innerWidth*0.02 + 'px';

        const col = i%13;
        const row = Math.floor(i/13);
        card1.style.left = col * window.innerWidth/13 + 'px';
        card1.style.top = playerNameSpace + row * window.innerHeight*0.7/4 + 'px';

        card2.style.left = col * window.innerWidth/13 + window.innerWidth/13*(1/6) + 'px';
        card2.style.top = playerNameSpace + row * window.innerHeight*0.7/4 + window.innerHeight*0.7/4*(1/6) + 'px';
      });
    }
  });

  const playerScores = document.getElementsByClassName('player-score');
  Array.prototype.forEach.call(playerScores, (playerScore, i) => {
    playerScore.style.fontSize = window.innerWidth*0.03 + 'px';
    playerScore.style.top = i * (2*window.innerHeight*0.7/4 + playerNameSpace) + window.innerHeight*0.7 + 'px';
  });
};

export {_handleResizeMatched as default};
