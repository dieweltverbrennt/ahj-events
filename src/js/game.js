import Board from './board';
import Char from './char';
import GamePlay from './gamePlay';

const board = new Board();
const char = new Char();
const gamePlay = new GamePlay(board, char);
gamePlay.init();
