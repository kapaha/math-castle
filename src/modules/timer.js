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

        if (timeRemaining <= 1) handleComplete();
    }

    // converts time in ms to mm:ss format
    function getHumanTimeRemaining() {
        const seconds = Math.ceil(timeRemaining / 1000) % 60;
        const minutes = Math.floor(Math.ceil(timeRemaining / 1000) / 60);

        const formatedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${formattedMinutes}:${formatedSeconds}`;
    }

    return Object.freeze({
        tick,
        getHumanTimeRemaining,
    });
}

export default Timer;
