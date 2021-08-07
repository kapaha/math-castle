import gameBoard from './gameBoard';
import castle from './castle';
import Enemy, { ENEMY_EVENT_TYPES, createEnemyEvent } from './enemy';
import Timer from './timer';
import questionGenerator from './questionGenerator';
import scoreHandler from './scoreHandler';
import DEFAULT_SETTINGS from './defaultSettings';
import { hideElement, showElement } from './domUtils';
import Engine from './engine';
import populateQuestionHistory from './questionHistory';

const GAMESTATES = {
    MENU: 0,
    RUNNING: 1,
    GAMEOVER: 2,
    PAUSED: 3,
};

const startPage = document.querySelector('#start-page');
const gamePage = document.querySelector('#game-page');
const gameOverPage = document.querySelector('#game-over-page');
const difficultySelectPage = document.querySelector('#difficulty-select-page');
const answerForm = document.querySelector('.answer-form');
const answerInput = document.querySelector('#answer-input');
const gameTimer = document.querySelector('#game-timer');
const startButton = document.querySelector('.start-button');
const restartButton = document.querySelector('#restart-button');
const pauseButton = document.querySelector('.pause-button');
const difficultyButtons = document.querySelectorAll('[data-difficulty');
const homeButton = document.querySelector('#home-button');
const gameOverTitle = document.querySelector('#game-over-title');

const settings = { ...DEFAULT_SETTINGS };
const timers = {};
const fieldWidth = gameBoard.width - (castle.width - 70);
const engine = new Engine(update, draw);

let gameState = GAMESTATES.MENU;
let selectedEnemy = null;
let enemies = [];
let questionHistory = [];

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

        questionHistory.push(enemy.getQuestionInfo());

        return false;
    });
}

function handleWin() {
    gameOver('You Win!');
}

function initialiseTimers() {
    // spawn enemy every 2.5 seconds
    timers.spawnTimer = Timer(settings.spawnTimerMs, spawnEnemy);

    // end game after 300000 ms (5 minutes)
    timers.gameTimer = Timer(settings.gameTimerMs, handleWin, {
        autoRestart: false,
    });
}

function handleAnswerSubmit(event) {
    event.preventDefault();

    if (!selectedEnemy || answerInput.value.trim() === '') return;

    const correctAnswer = selectedEnemy.question.answer.toString();

    const enemyEvent = createEnemyEvent(
        ENEMY_EVENT_TYPES.QUESTION_ANSWERED,
        answerInput.value
    );

    selectedEnemy.addEvent(enemyEvent);

    if (enemyEvent.answer.value === correctAnswer) {
        enemyEvent.answer.isCorrect = true;
        selectedEnemy.handleDelete();
        selectedEnemy = null;
        scoreHandler.addPoints(settings.POINTS.CORRECT_ANSWER);
    } else {
        enemyEvent.answer.isCorrect = false;
        scoreHandler.addPoints(settings.POINTS.WRONG_ANSWER);
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

function gameOver(titleText) {
    gameState = GAMESTATES.GAMEOVER;
    populateQuestionHistory(questionHistory, settings.lastAnswersToShow);
    hideElement(gamePage);
    gameOverTitle.textContent = titleText || 'Game Over';
    showElement(gameOverPage, 'flex');
}

function reset() {
    settings.enemySpeed = DEFAULT_SETTINGS.enemySpeed;
    initialiseTimers();
    scoreHandler.reset();
    answerInput.value = '';
    castle.setup(settings.castleStartingLives);
    enemies.forEach((enemy) => enemy.handleDelete());
    questionHistory = [];
}

function start(selectedDifficulty) {
    reset();
    settings.questionDifficulty = selectedDifficulty;
    gameState = GAMESTATES.RUNNING;
    engine.start();
}

function restart() {
    reset();
    hideElement(gameOverPage);
    showElement(gamePage, 'flex');
    gameState = GAMESTATES.RUNNING;
}

function pause() {
    gameState = GAMESTATES.PAUSED;
    answerInput.disabled = true;
    enemies.forEach((enemy) => enemy.element.classList.add('not-clickable'));
}

function unPause() {
    gameState = GAMESTATES.RUNNING;
    answerInput.disabled = false;
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

function handlePause() {
    const pauseButtonText = ['Continue', 'Pause'];
    const [first, second] = pauseButtonText;
    if (gameState === GAMESTATES.RUNNING) {
        pause();
        engine.stop();
        pauseButton.textContent = first;
    } else if (gameState === GAMESTATES.PAUSED) {
        engine.start();
        unPause();
        pauseButton.textContent = second;
    }
}

function handleStartButtonClick() {
    hideElement(startPage);
    showElement(difficultySelectPage, 'flex');
}

function handleDifficultySelect(event) {
    const selectedDifficulty = event.target.dataset.difficulty;
    hideElement(difficultySelectPage);
    showElement(gamePage, 'flex');
    start(selectedDifficulty);
}

function handleHomeButtonClick() {
    if (gameState === GAMESTATES.PAUSED) handlePause();
    engine.stop();
    gameState = GAMESTATES.MENU;
    hideElement(gamePage);
    showElement(startPage, 'flex');
}

// PUBLIC FUNCTIONS

function init() {
    startButton.addEventListener('click', handleStartButtonClick);
    restartButton.addEventListener('click', restart);
    pauseButton.addEventListener('click', handlePause);
    answerForm.addEventListener('submit', handleAnswerSubmit);
    difficultyButtons.forEach((button) =>
        button.addEventListener('click', handleDifficultySelect)
    );
    homeButton.addEventListener('click', handleHomeButtonClick);
}

export default Object.freeze({
    init,
});
