import './styles/styles.css';
import Engine from './modules/engine';
import game from './modules/game';

const engine = new Engine(game.update, game.draw);

const startButton = document.querySelector('.start-button');
const restartButton = document.querySelector('.restart-button');
const pauseButton = document.querySelector('.pause-button');

function startGame() {
    engine.start();
    game.start();
}

function pauseGame() {
    const pauseButtonText = ['Continue', 'Pause'];
    const [first, second] = pauseButtonText;
    if (game.gameState === game.GAMESTATES.RUNNING) {
        game.pause();
        engine.stop();
        pauseButton.textContent = first;
    } else if (game.gameState === game.GAMESTATES.PAUSED) {
        engine.start();
        game.unPause();
        pauseButton.textContent = second;
    }
}

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);
pauseButton.addEventListener('click', pauseGame);
