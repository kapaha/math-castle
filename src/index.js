import './styles/styles.css';
import Game from './game';

const game = new Game();

game.spawnEnemy();

function gameLoop() {
    game.update();
    game.draw();
    requestAnimationFrame(gameLoop);
}

// start the game loop
requestAnimationFrame(gameLoop);
