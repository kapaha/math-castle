import gameBoard from './gameBoard';
import castle from './castle';
import Enemy from './enemy';

class Game {
    constructor() {
        this.gameBoard = gameBoard;
        this.castle = castle;
        // width of area enemy can move in
        this.fieldWidth = gameBoard.width - castle.width;
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
        this.enemies.forEach((enemy) => enemy.update(this));
    }

    draw() {
        this.enemies.forEach((enemy) => enemy.draw());
    }

    spawnEnemy() {
        const enemy = new Enemy(0, 150);
        this.gameBoard.element.appendChild(enemy.element);
        this.enemies.push(enemy);
    }

    deleteEnemy(enemyToDelete) {
        this.enemies = this.enemies.filter((enemy) => enemy !== enemyToDelete);
    }
}

export default Game;
