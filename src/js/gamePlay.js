export default class GamePlay {
  constructor(board, char) {
    this.board = board;
    this.char = char;
    this.boardSize = 4;
    this.current = null;
    this.counter = 0;
    this.score = 0;
    this.points = 0;
    this.misses = 0;
  }

  init() {
    this.drawBoard();
    this.cells = Array.from(document.querySelectorAll('.cell'));
    this.cells.forEach((item) => item.addEventListener('click', this.onClick.bind(this)));
    this.newGame();
  }

  newGame() {
    this.current = Math.floor(Math.random() * this.boardSize * this.boardSize);
    this.redrawChar(this.current);
    this.start();
    this.counter = 0;
    this.score.textContent = 0;
    this.points = 0;
    this.misses = 0;
  }

  drawBoard() {
    const body = document.querySelector('body');
    const stats = document.createElement('h1');
    stats.classList.add('score');
    stats.innerHTML = 'Score: ';
    this.score = document.createElement('span');
    this.score.textContent = this.points;
    stats.appendChild(this.score);
    body.appendChild(stats);
    const container = document.createElement('div');
    container.classList.add('container');
    this.board = this.board.createBoard(this.boardSize);
    container.appendChild(this.board);
    body.appendChild(container);
  }

  redrawChar(index) {
    const char = this.char.createChar();
    this.cells[index].appendChild(char);
  }

  getRandomIndex() {
    let index = Math.floor((Math.random() * this.cells.length));
    if (index === this.current) {
      index = this.getRandomIndex();
    } else {
      this.current = index;
    }
    return index;
  }

  removeChar() {
    this.cells[this.current].firstChild.remove();
  }

  start() {
    this.interval = setInterval(() => {
      this.removeChar();
      const index = this.getRandomIndex();
      this.redrawChar(index);
      this.counter += 1;
      if (this.counter > this.points) {
        this.misses += 1;
      }
      console.log(this.counter, this.points, this.misses)
      this.checkDefeat();
    }, 1000);
  }

  onClick(event) {
    event.preventDefault();
    if (event.target.classList.contains('char')) {
      this.points += 1;
      this.score.textContent = this.points;
      this.changeCursor();
      setTimeout(() => this.changeCursor(), 100);
    }
  }

  changeCursor() {
    this.board.classList.toggle('hammer');
    this.board.classList.toggle('hammer-hit');
  }

  checkDefeat() {
    if (this.misses === 5) {
      clearInterval(this.interval);
      this.removeChar();
      alert('You loss!');
      this.newGame();
    }
  }
}
