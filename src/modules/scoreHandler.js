const scoreElements = document.querySelectorAll('[data-score-display]');

let score = 0;

function draw() {
    scoreElements.forEach((element) => {
        const el = element;
        el.textContent = score;
    });
}

function addPoints(amount) {
    if (amount < 0) {
        score = Math.max(0, score + amount);
    } else {
        score += amount;
    }
    draw();
}

function reset() {
    score = 0;
    draw();
}

export default Object.freeze({ addPoints, reset });
