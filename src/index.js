import './styles/styles.css';
import Game from './modules/game';
import Engine from './modules/engine';

const game = new Game();
const engine = new Engine(game.update, game.draw);

engine.start();

export { game };
