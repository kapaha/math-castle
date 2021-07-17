import './styles/styles.css';
import Game from './game';
import { enemySpawn } from './enemySpawn';

const game = new Game();

function gameLoop() {
    game.update();
    game.draw();
    requestAnimationFrame(gameLoop);
}

// start the game loop
requestAnimationFrame(gameLoop);

enemySpawn();
