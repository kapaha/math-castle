function Enemy({ position: { x, y }, speed, question, game } = {}) {
    const width = 50;
    const height = 50;
    const position = { x, y };
    const element = createElement();

    // PRIVATE FUNCTIONS

    function createElement() {
        const enemyElement = document.createElement('div');
        const questionElement = document.createElement('div');

        // set enemy element styles
        enemyElement.classList.add('enemy');
        enemyElement.style.width = `${width}px`;
        enemyElement.style.height = `${height}px`;

        // set question element styles and text
        questionElement.classList.add('enemy-question');
        questionElement.textContent = question.text;

        enemyElement.appendChild(questionElement);

        enemyElement.addEventListener('click', game.handleSelectEnemy);

        return enemyElement;
    }

    function hasHitCastle() {
        return position.x >= game.fieldWidth - width;
    }

    // PUBLIC FUNCTIONS

    function update(deltaTime) {
        if (hasHitCastle()) {
            handleDelete();
            game.castle.damage(1);
            return;
        }
        // multiply speed by deltaTime in seconds
        // for consistent movement across different framerates
        position.x += speed * (deltaTime / 1000);
    }

    function draw() {
        // draw the enemy to different position
        element.style.transform = `translate(${position.x}px, ${position.y}px)`;
    }

    function handleDelete() {
        game.deleteEnemy(element);
        element.remove();
    }

    function toggleSelect() {
        element.classList.toggle('selected');
    }

    return Object.freeze({
        update,
        draw,
        handleDelete,
        toggleSelect,
        question,
        get element() {
            return element;
        },
    });
}

export default Enemy;
