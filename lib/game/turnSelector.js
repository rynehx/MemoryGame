class TurnSelector {
  constructor(cb) {
    this.cb = cb;
    this.current = null;
    this.start = null;
  }
  add(data) {
    const newNode = new LinkNode(data);
    if (this.start) { // insert the new node behind the start node
      newNode.previous = this.start.previous;
      newNode.next = this.start;
      this.start.previous.next = newNode;
      this.start.previous = newNode;
    } else {
      this.start = newNode;
      this.start.next = newNode;
      this.start.previous = newNode;
      this.current = this.start;
    }
  }
  nextTurn() {
    if (this.current) {
      this.current = this.current.next;
      this.cb(this.currentPlayer());
    }
  }
  currentPlayer(){
    if (this.current) {
      return this.current.store;
    }
    return null;
  }
  allPlayers() {
    const players = [this.start.store];
    let currentPlayer = this.start.next;

    while (currentPlayer != this.start) {
      players.push(currentPlayer.store);
      currentPlayer = currentPlayer.next;
    }

    return players;
  }
  reset() {
    this.allPlayers().forEach((playerNode) => {
      playerNode.matchedCards = [];
    });
  }
}

class LinkNode {
  constructor(data) {
    this.store = data;
    this.next = null;
    this.previous = null;
  }
}

export {TurnSelector as default};
