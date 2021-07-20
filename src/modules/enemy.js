class Enemy {
    constructor(xPos, yPos, game) {
        this.element = document.createElement('div');
        this.pos = { x: xPos, y: yPos };
        this.width = 50;
        this.height = 50;
        this.speed = 60; // px per second
        this.selected = false; // default false (not selected)
        this.question = '';
        this.answer = '';
        this.game = game;

        // setting some enemy css
        this.element.classList.add('enemy');
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;

        // set enemy selected
        this.element.addEventListener('click', () => {
            this.unSelect();
            this.select();
        });
    }

    select() {
        // select clicked enemy
        this.selected = true;
        if (this.selected) {
            this.element.classList.add('selected');
        }
    }

    unSelect() {
        // remove all selected class and attribute in order to make only one selection
        const enemiesArr = this.game.enemies;
        const selectedEnemy = enemiesArr.find((enemy) => enemy.selected);
        if (selectedEnemy === undefined) return;
        selectedEnemy.selected = false;
        selectedEnemy.element.classList.remove('selected');
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
        this.element.style.transform = `translate(${this.pos.x}px, ${this.pos.y}px)`;
    }

    delete(game) {
        // remove enemy from game-board
        this.element.remove();
        // remove enemy from enemies array
        game.deleteEnemy(this);
    }

    hasHitCastle(game) {
        return this.pos.x >= game.fieldWidth - this.width;
    }
}

export default Enemy;
