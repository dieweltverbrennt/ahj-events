export default class Board {
  constructor() {
    this.board = null;
  }

  createBoard(size) {
    const board = document.createElement('div');
    board.classList.add('game-container');
    board.classList.add('hammer');

    for (let i = 0; i < size * size; i += 1) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      board.appendChild(cell);
    }

    this.board = board;
    return this.board;
  }
}
