class Enemy {
    constructor(xPos, yPos, game, question) {
        this.elements = {
            enemy: document.createElement('div'),
            question: document.createElement('div'),
        };

        this.pos = { x: xPos, y: yPos };
        this.width = 50;
        this.height = 50;
        this.speed = 60; // px per second
        this.selected = false; // default false (not selected)
        this.question = question;
        this.game = game;

        // setting some enemy css
        this.elements.enemy.classList.add('enemy');
        this.elements.enemy.style.width = `${this.width}px`;
        this.elements.enemy.style.height = `${this.height}px`;

        // question element styles
        this.elements.question.classList.add('enemy-question');
        this.elements.question.textContent = this.question.text;
        this.elements.enemy.appendChild(this.elements.question);

        // set enemy selected
        this.elements.enemy.addEventListener('click', () => {
            this.unSelect();
            this.select();
        });
    }

    select() {
        // select clicked enemy
        this.selected = true;
        if (this.selected) {
            this.elements.enemy.classList.add('selected');
        }
    }

    unSelect() {
        // remove all selected class and attribute in order to make only one selection
        const enemiesArr = this.game.enemies;
        const selectedEnemy = enemiesArr.find((enemy) => enemy.selected);
        if (selectedEnemy === undefined) return;
        selectedEnemy.selected = false;
        selectedEnemy.elements.enemy.classList.remove('selected');
    }

    update(game, deltaTime) {
        if (this.hasHitCastle(game)) {
            this.delete(game);
            game.castle.damage(1);
            return;
        }

        // multiply speed by deltaTime in seconds for consistent movement across
        // different framerates
        this.pos.x += this.speed * (deltaTime / 1000);
    }

    draw() {
        // draw the enemy to different position
        this.elements.enemy.style.transform = `translate(${this.pos.x}px, ${this.pos.y}px)`;
    }

    delete(game) {
        // remove enemy from game-board
        this.elements.enemy.remove();
        // remove enemy from enemies array
        game.deleteEnemy(this);
    }

    hasHitCastle(game) {
        return this.pos.x >= game.fieldWidth - this.width;
    }
}

export default Enemy;
