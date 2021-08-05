const castle = {
    height: 400,
    width: 137,
    lives: null,
    elements: {
        container: document.getElementById('castle'),
        livesText: document.getElementById('castle-lives'),
    },

    setup(lives) {
        this.lives = lives;
        this.draw();
    },

    damage(amount, onGameOver) {
        this.lives -= amount;
        this.draw();

        if (this.lives === 0) onGameOver();
    },

    draw() {
        this.elements.livesText.textContent = Math.max(0, this.lives);
    },
};

export default castle;
