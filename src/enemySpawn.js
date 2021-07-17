import Enemy from './enemy';
import gameBoard from './gameBoard';

const enemies = [];

function enemySpawn() {
    const enemiesCount = 3;
    const yPos = [62.5, 175, 287.5];
    const gameBoardElement = gameBoard.element;

    for (let i = 0; i < enemiesCount; i += 1) {
        const enemy = new Enemy(0, yPos[i]);
        enemies.push(enemy);
    }

    enemies.forEach((enemy) => {
        gameBoardElement.appendChild(enemy.element);
        enemy.draw();
    });
}

export { enemySpawn, enemies };
