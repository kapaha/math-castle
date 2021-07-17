import './styles/styles.css';
import Enemy from './enemy';
import { enemySpawn, enemies } from './enemySpawn';

function update() {
    // update game objects
}

function draw() {
    // draw game objects
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// start the game loop
requestAnimationFrame(gameLoop);

enemySpawn();
