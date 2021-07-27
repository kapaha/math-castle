function Timer(duration, onFinish, { autoRestart = true } = {}) {
    let timeRemaining = duration;

    function restart() {
        timeRemaining = duration;
    }

    function handleComplete() {
        onFinish();
        if (autoRestart) restart();
    }

    function tick(deltaTime) {
        timeRemaining = Math.max(0, timeRemaining - deltaTime);

        if (timeRemaining === 0) handleComplete();
    }

    return Object.freeze({
        tick,
    });
}

export default Timer;
