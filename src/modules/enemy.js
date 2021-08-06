import createEnemySpriteSheet from './createEnemySpriteSheet';

const ENEMY_EVENT_TYPES = Object.freeze({
    HIT_CASTLE: 0,
    QUESTION_ANSWERED: 1,
});

function Enemy({
    position: { x, y },
    speed,
    question,
    fieldWidth,
    handleSelectEnemy,
    damageCastle,
    deleteEnemy,
} = {}) {
    const enemySpriteSheet = createEnemySpriteSheet();
    const width = enemySpriteSheet.frameWidth;
    const height = enemySpriteSheet.frameHeight;
    const position = { x, y };
    const element = createElement();
    const events = [];

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

        // sprite styles
        enemyElement.style.backgroundImage = `url(${enemySpriteSheet.sprite.src})`;
        enemyElement.style.backgroundPosition =
            enemySpriteSheet.getBackgroundPosition();
        enemyElement.style.backgroundSize =
            enemySpriteSheet.getBackgroundSize();

        enemyElement.appendChild(questionElement);

        enemyElement.addEventListener('click', handleSelectEnemy);

        return enemyElement;
    }

    function hasHitCastle() {
        return position.x >= fieldWidth - width / 2;
    }

    // PUBLIC FUNCTIONS

    function update(deltaTime) {
        if (hasHitCastle()) {
            handleDelete();
            events.push(createEnemyEvent(ENEMY_EVENT_TYPES.HIT_CASTLE));
            damageCastle(1);
            return;
        }

        // multiply speed by deltaTime in seconds
        // for consistent movement across different framerates
        position.x += speed * (deltaTime / 1000);

        enemySpriteSheet.update(deltaTime);
    }

    function draw() {
        // draw the enemy to different position
        element.style.transform = `translate(${position.x}px, ${position.y}px)`;
        element.style.backgroundPosition =
            enemySpriteSheet.getBackgroundPosition();
    }

    function handleDelete() {
        deleteEnemy(element);
        element.remove();
    }

    function toggleSelect() {
        element.classList.toggle('selected');
    }

    function addEvent(event) {
        events.push(event);
    }

    function getQuestionInfo() {
        return {
            text: question.text,
            answer: question.answer,
            events,
        };
    }

    return Object.freeze({
        update,
        draw,
        handleDelete,
        toggleSelect,
        addEvent,
        getQuestionInfo,
        question,
        get element() {
            return element;
        },
    });
}

function createEnemyEvent(type, answerValue = null, answerIsCorrect = false) {
    return {
        type,
        answer: {
            value: answerValue,
            isCorrect: answerIsCorrect,
        },
    };
}

export { Enemy as default, createEnemyEvent, ENEMY_EVENT_TYPES };
