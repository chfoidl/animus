import bezier from "bezier-easing";

export type EasingFunction = (input: number) => number;
export type BezierPoints = [number, number, number, number];

export const generateBezierFunction = (points: BezierPoints): EasingFunction =>
    bezier(points[0], points[1], points[2], points[3]);

export const ease = (
    easingFunction: EasingFunction,
    currentTime: number,
    duration: number,
    initialValue = 0,
    outputMultiplier = 1
) => outputMultiplier * easingFunction(currentTime / duration) + initialValue;

export const animate = (
    easingFunction: EasingFunction,
    duration: number,
    callback: (easingOutput: number, progress: number) => void
) => {
    return new Promise(resolve => {
        const start = new Date().getTime();

        const run = () => {
            const elapsed = new Date().getTime() - start;

            if (elapsed < duration) {
                const progress = elapsed / duration;

                callback(easingFunction(progress), progress);
                requestAnimationFrame(run);
            } else {
                requestAnimationFrame(() => {
                    callback(easingFunction(1), 1);
                    resolve();
                });
            }
        };

        run();
    });
};
