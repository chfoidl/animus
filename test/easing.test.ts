import {
    ease,
    animate,
    generateBezierFunction,
    BezierPoints,
} from "../src/animus";

describe("bezier", () => {
    const testEasing = (
        points: BezierPoints,
        ...ioPairs: [number, number][]
    ) => {
        const e = generateBezierFunction(points);

        ioPairs.forEach(pair => expect(e(pair[0])).toBeCloseTo(pair[1]));
    };

    it("should project input value to custom bezier curve", () => {
        testEasing(
            [0.58, 0.81, 0.46, -0.03],
            [0.2, 0.25],
            [0.5, 0.41],
            [0.75, 0.59]
        );
    });
});

describe("bezier easing", () => {
    it("should correctly calculate bezier easing", () => {
        const bezFunc = generateBezierFunction([0.25, 0.25, 0.75, 0.75]);

        expect(ease(bezFunc, 100, 1000)).toBeCloseTo(0.1);
        expect(ease(bezFunc, 300, 1000)).toBeCloseTo(0.3);
        expect(ease(bezFunc, 800, 1000)).toBeCloseTo(0.8);
    });

    it("should correctly calculate bezier easing with initial value", () => {
        const bezFunc = generateBezierFunction([0.25, 0.25, 0.75, 0.75]);

        expect(ease(bezFunc, 100, 1000, 5.1)).toBeCloseTo(5.1 + 0.1);
        expect(ease(bezFunc, 300, 1000, 5.1)).toBeCloseTo(5.1 + 0.3);
        expect(ease(bezFunc, 800, 1000, 5.1)).toBeCloseTo(5.1 + 0.8);
    });

    it("should correctly calculate bezier easing with output multiplier", () => {
        const bezFunc = generateBezierFunction([0.25, 0.25, 0.75, 0.75]);

        expect(ease(bezFunc, 100, 1000, 0, 2.3)).toBeCloseTo(0.1 * 2.3);
        expect(ease(bezFunc, 300, 1000, 0, 2.3)).toBeCloseTo(0.3 * 2.3);
        expect(ease(bezFunc, 800, 1000, 0, 2.3)).toBeCloseTo(0.8 * 2.3);
    });
});

describe("animate", () => {
    const bezFunc = generateBezierFunction([0.25, 0.25, 0.75, 0.75]);

    it("should correctly calculate easing output of progress", done => {
        animate(bezFunc, 1000, (easingOutput, progress) => {
            expect(bezFunc(progress)).toBeCloseTo(easingOutput);
        }).then(done);
    });

    it("should run for the given duration", done => {
        const start = +new Date();
        const duration = 1000;
        const tolerance = 50;

        animate(bezFunc, duration, () => {}).then(() => {
            const elapsed = +new Date() - start;

            expect(elapsed).toBeGreaterThanOrEqual(duration - tolerance);
            expect(elapsed).toBeLessThanOrEqual(duration + tolerance);
            done();
        });
    });

    it("should run at approx. 60 FPS", done => {
        const callback = jest.fn();

        animate(bezFunc, 1000, callback).then(() => {
            const calls = callback.mock.calls.length;

            expect(calls).toBeGreaterThan(55);
            expect(calls).toBeLessThanOrEqual(65);

            done();
        });
    });

    it("should output 0 at first callback call", done => {
        const callback = jest.fn();

        animate(bezFunc, 500, callback).then(() => {
            expect(callback.mock.calls[0]).toEqual([0, 0]);
            done();
        });
    });

    it("should output 1 at last callback call", done => {
        const callback = jest.fn();

        animate(bezFunc, 500, callback).then(() => {
            expect(callback.mock.calls[callback.mock.calls.length - 1]).toEqual(
                [1, 1]
            );
            done();
        });
    });
});
