import './styles/styles.css';

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
