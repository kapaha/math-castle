class Timer {
    constructor(duration, onFinish) {
        this.duration = duration;
        this.onFinish = onFinish;

        this.startTime = undefined;
        this.elapsed = 0;
        this.pauseStart = undefined;
        this.pauseTime = undefined;
        this.paused = false;
    }

    start() {
        this.startTime = performance.now();
    }

    tick() {
        if (this.paused) {
            this.pauseTime = performance.now() - this.pauseStart;
            this.paused = false;
        }

        const reduction = this.pauseTime === undefined ? 0 : this.pauseTime;

        this.elapsed = performance.now() - this.startTime - reduction;

        if (this.elapsed > this.duration) {
            this.onFinish();
            this.reset();
        }
    }

    reset() {
        this.startTime = performance.now();
        this.elapsed = 0;
        this.finished = false;
        this.paused = false;
        this.pauseTime = undefined;
        this.pauseStart = undefined;
    }

    pause() {
        this.pauseStart = performance.now();
        this.paused = true;
    }
}

export default Timer;
