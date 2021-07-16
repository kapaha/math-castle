/* eslint-disable class-methods-use-this */
// enemy class
class Enemy {
    constructor(xPos, yPos) {
        this.element = document.createElement('div');
        this.pos = { x: xPos, y: yPos };
        this.width = 50;
        this.height = 50;
        this.speed = 1;
        this.selected = false; // default false (not selected)
        this.question = '';
        this.answer = '';

        // setting some enemy css
        this.element.classList.add('enemy');
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
    }

    update() {
        // update enemy position
        this.pos.x += this.speed;
    }

    draw() {
        // draw the enemy to different position
        this.element.style.transform = `translate(${this.pos.x}px, ${this.pos.y}px)`;
    }

    delete() {
        // enemy died
    }
}

export default Enemy;
