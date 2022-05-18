import { CountdownTask } from '../src/CountdownTask';

const task = new CountdownTask();

jest.useFakeTimers();

beforeEach(() => {
    let time = 0;
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(
        (callback: FrameRequestCallback): number => {
            time += 100;
            window.setTimeout(() => callback(time), 100);
            return time;
        }
    );
});

test('Tests for CountdownTask', () => {
    const fn = jest.fn();
    task.start(fn, 1000);
    task.start(fn, 2000);
    expect(task.tasks).toBe(2);
    expect(task.done).toBeFalsy();
    expect(fn).toBeCalledTimes(0);

    task.stop();

    expect(task.done).toBeTruthy();

    jest.runOnlyPendingTimers();

    expect(task.tasks).toBe(0);
    expect(fn).toBeCalledTimes(2);

    task.start(fn, 300);
    expect(task.done).toBeFalsy();
    expect(task.tasks).toBe(1);
});
