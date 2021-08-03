import gameBoard from './gameBoard';
import castle from './castle';
import Enemy from './enemy';
import Timer from './timer';
import questionGenerator from './questionGenerator';
import scoreHandler from './scoreHandler';
import DEFAULT_SETTINGS from './defaultSettings';

const GAMESTATES = {
    MENU: 0,
    RUNNING: 1,
    GAMEOVER: 2,
    PAUSED: 3,
};

const startPage = document.getElementById('start-page');
const gamePage = document.getElementById('game-page');
const gameOverPage = document.getElementById('game-over-page');
const answerForm = document.querySelector('.answer-form');
const answerInput = document.querySelector('#answer-input');
const gameTimer = document.querySelector('#game-timer');
const wrongAnswersEl = document.querySelector('#game-over-wrong-answers');

const settings = { ...DEFAULT_SETTINGS };
const timers = {};
const fieldWidth = gameBoard.width - castle.width;

let gameState = GAMESTATES.MENU;
let selectedEnemy = null;
let wrongAnswers = 0;
let enemies = [];

// PRIVATE FUNCTIONS

function spawnEnemy() {
    const enemy = Enemy({
        position: getRandomSpawnPoint(),
        speed: settings.enemySpeed,
        question: questionGenerator(settings.questionDifficulty),
        fieldWidth,
        handleSelectEnemy,
        damageCastle,
        deleteEnemy,
    });
    settings.enemySpeed += settings.enemySpeedIncrement;
    gameBoard.element.appendChild(enemy.element);
    enemies.push(enemy);
}

function getRandomSpawnPoint() {
    // randomly choose an object keys in the POSITION object
    const keys = Object.keys(settings.SPAWN_POINTS);
    return settings.SPAWN_POINTS[keys[Math.floor(Math.random() * keys.length)]];
}

function deleteEnemy(element) {
    enemies = enemies.filter((enemy) => {
        if (enemy.element !== element) return true;

        if (selectedEnemy === enemy) {
            selectedEnemy = null;
        }

        return false;
    });
}

function gameOver() {
    gameState = GAMESTATES.GAMEOVER;
    wrongAnswersEl.textContent = `Wrong Answers: ${wrongAnswers}`;
    gamePage.style.display = 'none';
    gameOverPage.style.display = 'flex';
    enemies.forEach((enemy) => {
        enemy.handleDelete();
    });
    answerInput.value = '';
    settings.enemySpeed = DEFAULT_SETTINGS.enemySpeed;
}

function initialiseTimers() {
    // spawn enemy every 2.5 seconds
    timers.spawnTimer = Timer(settings.spawnTimerMs, spawnEnemy);

    // end game after 300000 ms (5 minutes)
    timers.gameTimer = Timer(settings.gameTimerMs, gameOver, {
        autoRestart: false,
    });
}

function handleAnswerSubmit(event) {
    event.preventDefault();

    if (!selectedEnemy || answerInput.value.trim() === '') return;

    const correctAnswer = selectedEnemy.question.answer.toString();
    const userAnswer = answerInput.value;

    if (userAnswer === correctAnswer) {
        selectedEnemy.handleDelete();
        selectedEnemy = null;
        scoreHandler.addPoints(settings.POINTS.CORRECT_ANSWER);
    } else {
        scoreHandler.addPoints(settings.POINTS.WRONG_ANSWER);
        wrongAnswers += 1;
    }

    answerInput.value = '';
}

function handleSelectEnemy(event) {
    answerInput.focus();

    const clickedEnemy = enemies.find(
        (enemy) => enemy.element === event.currentTarget
    );

    if (clickedEnemy === selectedEnemy) return;

    if (selectedEnemy) selectedEnemy.toggleSelect();

    clickedEnemy.toggleSelect();

    selectedEnemy = clickedEnemy;
}

function damageCastle(amount) {
    scoreHandler.addPoints(settings.POINTS.CASTLE_LIFE_LOST);
    castle.damage(amount, gameOver);
}

// PUBLIC FUNCTIONS

function start() {
    scoreHandler.reset();
    wrongAnswers = 0;
    castle.setup(settings.castleStartingLives);
    answerForm.addEventListener('submit', handleAnswerSubmit);
    gameState = GAMESTATES.RUNNING;
    initialiseTimers();
    // hide start page
    startPage.style.display = 'none';
    gameOverPage.style.display = 'none';
    gamePage.style.display = 'flex';
}

function pause() {
    gameState = GAMESTATES.PAUSED;
    enemies.forEach((enemy) => enemy.element.classList.add('not-clickable'));
}

function unPause() {
    gameState = GAMESTATES.RUNNING;
    enemies.forEach((enemy) => enemy.element.classList.remove('not-clickable'));
}

function update(deltaTime) {
    if (gameState !== GAMESTATES.RUNNING) return;

    Object.keys(timers).forEach((key) => timers[key].tick(deltaTime));

    enemies.forEach((enemy) => enemy.update(deltaTime));
}

function draw() {
    gameTimer.textContent = timers.gameTimer.getHumanTimeRemaining();

    enemies.forEach((enemy) => enemy.draw());
}

export default Object.freeze({
    GAMESTATES,
    get gameState() {
        return gameState;
    },
    start,
    pause,
    unPause,
    update,
    draw,
});
