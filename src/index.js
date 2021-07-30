import './styles/styles.css';
import Game, { GAMESTATE } from './modules/game';
import Engine from './modules/engine';

const game = new Game();
const engine = new Engine(game.update, game.draw);

const startButton = document.querySelector('.start-button');
const restartButton = document.querySelector('.restart-button');
const pauseButton = document.querySelector('.pause-button');

function startGame() {
    engine.start();
    game.start();
}

function pauseGame() {
    if (game.gameState === GAMESTATE.RUNNING) {
        game.pause();
        engine.stop();
    } else if (game.gameState === GAMESTATE.PAUSED) {
        engine.start();
        game.continue();
    }
    console.log(engine.running);
    console.log(game.gameState);
}

// function restartGame() {
//     game = new Game();
//     //  engine = new Engine(game.update, game.draw);
//     game.start();
// }

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);
pauseButton.addEventListener('click', pauseGame);