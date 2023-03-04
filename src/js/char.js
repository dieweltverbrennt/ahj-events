export default class Char {
  constructor() {
    this.char = null;
  }

  createChar() {
    const char = document.createElement('div');
    char.classList.add('char');
    this.char = char;
    return this.char;
  }
}
