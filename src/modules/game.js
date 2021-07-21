import gameBoard from './gameBoard';
import castle from './castle';
import Enemy from './enemy';
import Timer from './timer';
import questionGenerator from './questionGenerator';

const GAMESTATE = {
    MENU: 0,
    RUNNING: 1,
    GAMEOVER: 2,
};

class Game {
    constructor() {
        this.gameBoard = gameBoard;
        this.castle = castle;
        // width of area enemy can move in
        this.fieldWidth = gameBoard.width - castle.width;
        this.enemies = [];
        this.gameState = GAMESTATE.MENU;

        // bind methods 'this' to Game class
        this.update = this.update.bind(this);
        this.draw = this.draw.bind(this);
        this.spawnEnemy = this.spawnEnemy.bind(this);

        this.spawnTimer = new Timer(2000, this.spawnEnemy);
    }

    start() {
        this.castle.setup(this);

        this.gameState = GAMESTATE.RUNNING;
    }

    update(deltaTime) {
        if (this.gameState !== GAMESTATE.RUNNING) return;

        this.spawnTimer.tick(deltaTime);
        this.enemies.forEach((enemy) => enemy.update(this, deltaTime));
    }

    draw() {
        this.enemies.forEach((enemy) => enemy.draw());
    }

    spawnEnemy() {
        const enemy = new Enemy(0, 150, this, questionGenerator('easy'));
        this.gameBoard.element.appendChild(enemy.elements.enemy);
        this.enemies.push(enemy);
    }

    deleteEnemy(enemyToDelete) {
        this.enemies = this.enemies.filter((enemy) => enemy !== enemyToDelete);
    }

    gameOver() {
        this.gameState = GAMESTATE.GAMEOVER;
    }
}

export default Game;
