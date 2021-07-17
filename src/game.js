import gameBoard from './gameBoard';
import castle from './castle';
import Enemy from './enemy';

class Game {
    constructor() {
        this.gameBoard = gameBoard;
        this.castle = castle;
        this.enemies = [];

        // bind gameLoop 'this' to Game class
        this.gameLoop = this.gameLoop.bind(this);
    }

    start() {
        this.spawnEnemy();

        // start the game loop
        requestAnimationFrame(this.gameLoop);
    }

    gameLoop() {
        this.update();
        this.draw();

        // call gameLoop before every browser repaint
        requestAnimationFrame(this.gameLoop);
    }

    update() {
        this.enemies.forEach((enemy) => enemy.update());
    }

    draw() {
        this.enemies.forEach((enemy) => enemy.draw());
    }

    spawnEnemy() {
        const enemiesCount = 3;
        const yPos = [62.5, 175, 287.5];
        const gameBoardElement = this.gameBoard.element;

        for (let i = 0; i < enemiesCount; i += 1) {
            const enemy = new Enemy(0, yPos[i]);
            this.enemies.push(enemy);
        }

        this.enemies.forEach((enemy) => {
            gameBoardElement.appendChild(enemy.element);
            enemy.draw();
        });
    }
}

export default Game;
