/**
 * Countdown task
 */
export class CountdownTask {
    private _done: boolean = false;

    /**
     * Done state
     */
    get done() {
        return this._done;
    }

    private _tasks: number = 0;

    /**
     * Current running tasks
     */
    get tasks() {
        return this._tasks;
    }

    /**
     * Start a new task
     * @param action Task action
     * @param miliseconds Countdown miliseconds
     */
    start(action: () => any, miliseconds: number) {
        // Reuse the container after all tasks done
        if (this._tasks === 0 && this._done) {
            this._done = false;
        }

        // Add a task
        this._tasks++;

        // Start time
        let start: DOMHighResTimeStamp | undefined;

        // Step
        const step = (time: DOMHighResTimeStamp) => {
            if (start == null) {
                start = time;
            }

            const elapsed = time - start;

            if (elapsed >= miliseconds) {
                this._done = true;
            }

            if (this._done) {
                action();
                this._tasks--;
            } else {
                window.requestAnimationFrame(step);
            }
        };

        // Request step running
        window.requestAnimationFrame(step);
    }

    /**
     * Stop all running tasks
     */
    stop() {
        this._done = true;
    }
}
