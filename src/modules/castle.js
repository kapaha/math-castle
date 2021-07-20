const castle = {
    height: 400,
    width: 200,
    lives: 3,
    elements: {
        container: document.getElementById('castle'),
        livesText: document.getElementById('castle-lives'),
    },
    game: undefined,

    setup(game) {
        this.game = game;
        this.draw();
    },

    damage(amount) {
        this.lives -= amount;
        this.draw();

        if (this.lives === 0) this.game.gameOver();
    },

    draw() {
        this.elements.livesText.textContent = Math.max(0, this.lives);
    },
};

export default castle;
