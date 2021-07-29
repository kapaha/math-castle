import gameBoard from './gameBoard';
import castle from './castle';
import Enemy from './enemy';
import Timer from './timer';
import questionGenerator from './questionGenerator';

export const GAMESTATE = {
    MENU: 0,
    RUNNING: 1,
    GAMEOVER: 2,
    PAUSED: 3,
};

const POSITION = {
    firstLane: 50,
    secondLane: 165,
    thirdLane: 280,
};

let enemySpeed = 40;
const startPage = document.getElementById('start-page');
const gamePage = document.getElementById('game-page');
const gameOverPage = document.getElementById('game-over-page');

class Game {
    constructor() {
        this.gameBoard = gameBoard;
        this.castle = castle;
        this.answerForm = document.querySelector('.answer-form');
        this.answerInput = document.querySelector('#answer-input');
        this.gameTimer = document.querySelector('#game-timer');
        // width of area enemy can move in
        this.fieldWidth = gameBoard.width - castle.width;
        this.enemies = [];
        this.selectedEnemy = null;
        this.timers = {};
        this.gameState = GAMESTATE.MENU;

        // bind methods 'this' to Game class
        this.update = this.update.bind(this);
        this.draw = this.draw.bind(this);
        this.spawnEnemy = this.spawnEnemy.bind(this);
        this.handleAnswerSubmit = this.handleAnswerSubmit.bind(this);
        this.gameOver = this.gameOver.bind(this);
        this.handleSelectEnemy = this.handleSelectEnemy.bind(this);
    }

    start() {
        this.castle.setup(this, 3);
        this.answerForm.addEventListener('submit', this.handleAnswerSubmit);
        this.gameState = GAMESTATE.RUNNING;
        this.initialiseTimers();
        // hide start page
        startPage.style.display = 'none';
        gameOverPage.style.display = 'none';
        gamePage.style.display = 'flex';
    }

    pause() {
        this.gameState = GAMESTATE.PAUSED;
        this.enemies.forEach((enemy) =>
            enemy.elements.enemy.classList.add('not-clickable')
        );
    }

    continue() {
        this.gameState = GAMESTATE.RUNNING;
        this.enemies.forEach((enemy) =>
            enemy.elements.enemy.classList.remove('not-clickable')
        );
    }

    update(deltaTime) {
        if (this.gameState !== GAMESTATE.RUNNING) return;

        Object.keys(this.timers).forEach((key) =>
            this.timers[key].tick(deltaTime)
        );

        this.enemies.forEach((enemy) => enemy.update(deltaTime));
    }

    draw() {
        this.gameTimer.textContent =
            this.timers.countDownTimer.getHumanTimeRemaining();

        this.enemies.forEach((enemy) => enemy.draw());
    }

    spawnEnemy() {
        const enemy = Enemy({
            position: {
                x: 0,
                y: this.randomLane(),
            },
            speed: enemySpeed,
            question: questionGenerator('insane'),
            game: this,
        });
        enemySpeed += 3;
        this.gameBoard.element.appendChild(enemy.element);
        this.enemies.push(enemy);
    }

    // eslint-disable-next-line class-methods-use-this
    randomLane() {
        // randomly choose an object keys in the POSITION object
        const keys = Object.keys(POSITION);
        return POSITION[keys[Math.floor(Math.random() * keys.length)]];
    }

    deleteEnemy(element) {
        this.enemies = this.enemies.filter((enemy) => {
            if (enemy.element !== element) return true;

            if (this.selectedEnemy === enemy) {
                this.selectedEnemy = null;
            }

            return false;
        });
    }

    gameOver() {
        this.gameState = GAMESTATE.GAMEOVER;
        gamePage.style.display = 'none';
        gameOverPage.style.display = 'flex';
        this.enemies.forEach((enemy) => {
            enemy.handleDelete();
        });
        this.answerInput.value = '';
        enemySpeed = 40;
    }

    initialiseTimers() {
        // spawn enemy every 2.5 seconds
        this.timers.spawnTimer = Timer(2500, this.spawnEnemy);

        // end game after 300000 ms (5 minutes)
        this.timers.countDownTimer = Timer(300000, this.gameOver, {
            autoRestart: false,
        });
    }

    handleAnswerSubmit(event) {
        event.preventDefault();

        if (!this.selectedEnemy) return;

        const correctAnswer = this.selectedEnemy.question.answer.toString();
        const userAnswer = this.answerInput.value;

        if (userAnswer === correctAnswer) {
            this.selectedEnemy.handleDelete();
            this.selectedEnemy = null;
        }

        this.answerInput.value = '';
    }

    handleSelectEnemy(event) {
        this.answerInput.focus();

        const clickedEnemy = this.enemies.find(
            (enemy) => enemy.element === event.currentTarget
        );

        if (clickedEnemy === this.selectedEnemy) return;

        if (this.selectedEnemy) this.selectedEnemy.toggleSelect();

        clickedEnemy.toggleSelect();

        this.selectedEnemy = clickedEnemy;
    }
}

export default Game;
