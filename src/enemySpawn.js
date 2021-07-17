import Enemy from './enemy';

function enemySpawn() {
    const enemies = [];
    const enemiesCount = 3;
    const yPos = [62.5, 175, 287.5];
    const gameBoard = document.getElementById('game-board');

    for (let i = 0; i < enemiesCount; i++) {
        const enemy = new Enemy(0, yPos[i]);
        enemies.push(enemy);
    }

    enemies.map((enemy) => {
        gameBoard.appendChild(enemy.element);
        enemy.draw();
    });
}

export default enemySpawn;
