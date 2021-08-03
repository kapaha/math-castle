import gameBoard from './gameBoard';
import castle from './castle';
import Enemy from './enemy';
import Timer from './timer';
import questionGenerator from './questionGenerator';
import scoreHandler from './scoreHandler';
import DEFAULT_SETTINGS from './defaultSettings';
import { hideElement, showElement } from './domUtils';

const GAMESTATES = {
    MENU: 0,
    RUNNING: 1,
    GAMEOVER: 2,
    PAUSED: 3,
};

const startPage = document.querySelector('#start-page');
const gamePage = document.querySelector('#game-page');
const gameOverPage = document.querySelector('#game-over-page');
const answerForm = document.querySelector('.answer-form');
const answerInput = document.querySelector('#answer-input');
const gameTimer = document.querySelector('#game-timer');
const wrongAnswersEl = document.querySelector('#game-over-wrong-answers');

const timers = {};
const fieldWidth = gameBoard.width - castle.width;

let settings = { ...DEFAULT_SETTINGS };
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

function gameOver() {
    gameState = GAMESTATES.GAMEOVER;
    wrongAnswersEl.textContent = wrongAnswers;
    hideElement(gamePage);
    showElement(gameOverPage, 'flex');
}

function reset() {
    settings = { ...DEFAULT_SETTINGS };
    initialiseTimers();
    scoreHandler.reset();
    wrongAnswers = 0;
    answerInput.value = '';
    castle.setup(settings.castleStartingLives);
    enemies.forEach((enemy) => enemy.handleDelete());
}

// PUBLIC FUNCTIONS

function start() {
    reset();
    answerForm.addEventListener('submit', handleAnswerSubmit);
    hideElement(startPage);
    showElement(gamePage, 'flex');
    gameState = GAMESTATES.RUNNING;
}

function restart() {
    reset();
    hideElement(gameOverPage);
    showElement(gamePage, 'flex');
    gameState = GAMESTATES.RUNNING;
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
    restart,
    pause,
    unPause,
    update,
    draw,
});
