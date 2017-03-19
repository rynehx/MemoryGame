import _handleResizeMatched from './resizeMatched.js';

const _handleResize = function() {
  const main = document.getElementById('main');
  main.style.width = window.innerWidth + 'px';
  main.style.height = window.innerHeight + 'px';

  const gameBoard = document.getElementById('game-board');
  gameBoard.style.height = window.innerHeight*0.7 + 'px';

  const completeBoard = document.getElementById('complete-board');
  completeBoard.style.height = window.innerHeight*0.3 + 'px';

  Array.prototype.forEach.call(gameBoard.children, (el, i) => {
    el.style.height = window.innerHeight*0.1 + 'px';
    el.style.width = window.innerWidth*0.06 + 'px';
    el.style.fontSize = window.innerWidth*0.02 + 'px';
    let row = i % 4;
    let col = Math.floor(i / 4);
    el.style.left = col * window.innerWidth/13 + 'px';
    el.style.top = row * window.innerHeight*0.7/4 + 'px';
  });

  _handleResizeMatched();
};

export {_handleResize as default};
