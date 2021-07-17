import gameBoard from './gameBoard';
import castle from './castle';

class Game {
    constructor() {
        this.gameBoard = gameBoard;
        this.castle = castle;
        this.enemies = [];
    }

    update() {
        this.enemies.forEach((enemy) => enemy.update());
    }

    draw() {
        this.enemies.forEach((enemy) => enemy.draw());
    }
}

export default Game;
