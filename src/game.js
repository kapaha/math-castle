import gameBoard from './gameBoard';
import castle from './castle';

class Game {
    constructor() {
        this.gameBoard = gameBoard;
        this.castle = castle;
        this.enemies = [];
    }
}

export default Game;
