import {
    ease,
    animate,
    generateBezierFunction,
    BezierPoints,
} from "../src/animus";
import * as Animus from "../src/animus";

describe("bezier", () => {
    const testEasing = (
        points: BezierPoints,
        ...ioPairs: [number, number][]
    ) => {
        const e = generateBezierFunction(points);

        ioPairs.forEach(pair => expect(e(pair[0])).toBeCloseTo(pair[1]));
    };

    it("should project input value to LINEAR bezier curve", () => {
        testEasing(Animus.BEZIER_LINEAR, [0.2, 0.2], [0.5, 0.5], [0.75, 0.75]);
    });

    it("should project input value to EASE bezier curve", () => {
        testEasing(Animus.BEZIER_EASE, [0.2, 0.3], [0.5, 0.8], [0.75, 0.96]);
    });

    it("should project input value to EASE_IN bezier curve", () => {
        testEasing(
            Animus.BEZIER_EASE_IN,
            [0.2, 0.06],
            [0.5, 0.32],
            [0.75, 0.62]
        );
    });

    it("should project input value to EASE_OUT bezier curve", () => {
        testEasing(
            Animus.BEZIER_EASE_OUT,
            [0.2, 0.31],
            [0.5, 0.68],
            [0.75, 0.91]
        );
    });

    it("should project input value to EASE_IN_OUT bezier curve", () => {
        testEasing(
            Animus.BEZIER_EASE_IN_OUT,
            [0.2, 0.08],
            [0.5, 0.5],
            [0.75, 0.87]
        );
    });

    it("should project input value to EASE_IN_QUAD bezier curve", () => {
        testEasing(
            Animus.BEZIER_EASE_IN_QUAD,
            [0.2, 0.05],
            [0.5, 0.26],
            [0.75, 0.6]
        );
    });

    it("should project input value to EASE_IN_CUBIC bezier curve", () => {
        testEasing(
            Animus.BEZIER_EASE_IN_CUBIC,
            [0.2, 0.03],
            [0.5, 0.15],
            [0.75, 0.45]
        );
    });

    it("should project input value to EASE_IN_QUART bezier curve", () => {
        testEasing(
            Animus.BEZIER_EASE_IN_QUART,
            [0.2, 0.01],
            [0.5, 0.06],
            [0.75, 0.28]
        );
    });

    it("should project input value to EASE_IN_QUINT bezier curve", () => {
        testEasing(
            Animus.BEZIER_EASE_IN_QUINT,
            [0.2, 0.01],
            [0.5, 0.05],
            [0.75, 0.19]
        );
    });

    it("should project input value to EASE_IN_SINE bezier curve", () => {
        testEasing(
            Animus.BEZIER_EASE_IN_SINE,
            [0.2, 0.04],
            [0.5, 0.29],
            [0.75, 0.64]
        );
    });

    it("should project input value to EASE_IN_EXPO bezier curve", () => {
        testEasing(
            Animus.BEZIER_EASE_IN_EXPO,
            [0.2, 0.01],
            [0.5, 0.04],
            [0.75, 0.13]
        );
    });

    it("should project input value to EASE_IN_CIRC bezier curve", () => {
        testEasing(
            Animus.BEZIER_EASE_IN_CIRC,
            [0.2, 0.02],
            [0.5, 0.12],
            [0.75, 0.3]
        );
    });

    it("should project input value to EASE_IN_BACK bezier curve", () => {
        testEasing(
            Animus.BEZIER_EASE_IN_BACK,
            [0.2, -0.08],
            [0.5, -0.06],
            [0.75, 0.24]
        );
    });

    it("should project input value to EASE_OUT_QUAD bezier curve", () => {
        testEasing(
            Animus.BEZIER_EASE_OUT_QUAD,
            [0.2, 0.37],
            [0.5, 0.77],
            [0.75, 0.94]
        );
    });

    it("should project input value to EASE_OUT_CUBIC bezier curve", () => {
        testEasing(
            Animus.BEZIER_EASE_OUT_CUBIC,
            [0.2, 0.51],
            [0.5, 0.88],
            [0.75, 0.98]
        );
    });

    it("should project input value to EASE_OUT_QUART bezier curve", () => {
        testEasing(
            Animus.BEZIER_EASE_OUT_QUART,
            [0.2, 0.62],
            [0.5, 0.91],
            [0.75, 0.99]
        );
    });

    it("should project input value to EASE_OUT_QUINT bezier curve", () => {
        testEasing(
            Animus.BEZIER_EASE_OUT_QUINT,
            [0.2, 0.68],
            [0.5, 0.97],
            [0.75, 1]
        );
    });

    it("should project input value to EASE_OUT_SINE bezier curve", () => {
        testEasing(
            Animus.BEZIER_EASE_OUT_SINE,
            [0.2, 0.31],
            [0.5, 0.74],
            [0.75, 0.94]
        );
    });

    it("should project input value to EASE_OUT_EXPO bezier curve", () => {
        testEasing(
            Animus.BEZIER_EASE_OUT_EXPO,
            [0.2, 0.77],
            [0.5, 0.98],
            [0.75, 1]
        );
    });

    it("should project input value to EASE_OUT_CIRC bezier curve", () => {
        testEasing(
            Animus.BEZIER_EASE_OUT_CIRC,
            [0.2, 0.79],
            [0.5, 0.96],
            [0.75, 0.99]
        );
    });

    it("should project input value to EASE_OUT_BACK bezier curve", () => {
        testEasing(
            Animus.BEZIER_EASE_OUT_BACK,
            [0.2, 0.75],
            [0.5, 1.07],
            [0.75, 1.08]
        );
    });

    it("should project input value to EASE_IN_OUT_QUAD bezier curve", () => {
        testEasing(
            Animus.BEZIER_EASE_IN_OUT_QUAD,
            [0.2, 0.08],
            [0.5, 0.51],
            [0.75, 0.88]
        );
    });

    it("should project input value to EASE_IN_OUT_CUBIC bezier curve", () => {
        testEasing(
            Animus.BEZIER_EASE_IN_OUT_CUBIC,
            [0.2, 0.05],
            [0.5, 0.52],
            [0.75, 0.93]
        );
    });

    it("should project input value to EASE_IN_OUT_QUART bezier curve", () => {
        testEasing(
            Animus.BEZIER_EASE_IN_OUT_QUART,
            [0.2, 0.03],
            [0.5, 0.6],
            [0.75, 0.96]
        );
    });

    it("should project input value to EASE_IN_OUT_QUINT bezier curve", () => {
        testEasing(
            Animus.BEZIER_EASE_IN_OUT_QUINT,
            [0.2, 0.02],
            [0.5, 0.68],
            [0.75, 0.97]
        );
    });

    it("should project input value to EASE_IN_OUT_SINE bezier curve", () => {
        testEasing(
            Animus.BEZIER_EASE_IN_OUT_SINE,
            [0.2, 0.09],
            [0.5, 0.5],
            [0.75, 0.87]
        );
    });

    it("should project input value to EASE_IN_OUT_EXPO bezier curve", () => {
        testEasing(
            Animus.BEZIER_EASE_IN_OUT_EXPO,
            [0.2, 0.02],
            [0.5, 0.5],
            [0.75, 0.97]
        );
    });

    it("should project input value to EASE_IN_OUT_CIRC bezier curve", () => {
        testEasing(
            Animus.BEZIER_EASE_IN_OUT_CIRC,
            [0.2, 0.06],
            [0.5, 0.6],
            [0.75, 0.92]
        );
    });

    it("should project input value to EASE_IN_OUT_BACK bezier curve", () => {
        testEasing(
            Animus.BEZIER_EASE_IN_OUT_BACK,
            [0.2, -0.09],
            [0.5, 0.61],
            [0.75, 1.09]
        );
    });

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
