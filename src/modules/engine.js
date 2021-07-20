class Engine {
    constructor(update, render) {
        this.running = false;
        this.rafID = undefined;

        this.update = update;
        this.draw = render;

        this.accumulatedTime = 0;
        this.currentTime = 0;
        this.timeStep = 1000 / 60;

        this.cycle = this.cycle.bind(this);
    }

    cycle(timeStamp) {
        this.rafID = requestAnimationFrame(this.cycle);

        this.accumulatedTime += timeStamp - this.currentTime;
        this.currentTime = timeStamp;

        let updated = false;

        if (this.accumulatedTime > 60) {
            this.accumulatedTime = this.timeStep;
        }

        while (this.accumulatedTime >= this.timeStep) {
            this.update(this.timeStep);

            updated = true;

            this.accumulatedTime -= this.timeStep;
        }

        if (updated) this.draw();
    }

    start() {
        this.running = true;
        this.rafID = requestAnimationFrame(this.cycle);
    }

    stop() {
        this.running = false;
        cancelAnimationFrame(this.rafID);
    }
}

export default Engine;
