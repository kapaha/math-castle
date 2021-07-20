class Timer {
    constructor(duration, onFinish) {
        this.duration = duration;
        this.onFinish = onFinish;
        this.elapsed = 0;
    }

    tick(deltaTime) {
        this.elapsed += deltaTime;

        if (this.elapsed > this.duration) {
            this.onFinish();
            this.reset();
        }
    }

    reset() {
        this.elapsed = 0;
    }
}

export default Timer;
