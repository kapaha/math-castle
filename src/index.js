import './styles/styles.css';
import Game from './game';
import Engine from './engine';

const game = new Game();
const engine = new Engine(game.update, game.draw);

engine.start();
