import gameBoard from './gameBoard';
import castle from './castle';
import Enemy from './enemy';
import Timer from './timer';

class Game {
    constructor() {
        this.gameBoard = gameBoard;
        this.castle = castle;
        // width of area enemy can move in
        this.fieldWidth = gameBoard.width - castle.width;
        this.enemies = [];

        // bind methods 'this' to Game class
        this.update = this.update.bind(this);
        this.draw = this.draw.bind(this);
        this.spawnEnemy = this.spawnEnemy.bind(this);

        this.spawnTimer = new Timer(2000, this.spawnEnemy);

        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                this.spawnTimer.pause();
            }
        });
    }

    start() {
        this.spawnTimer.start();
    }

    update(deltaTime) {
        this.spawnTimer.tick();
        this.enemies.forEach((enemy) => enemy.update(this, deltaTime));
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
