import bezier from 'bezier-easing';

var generateBezierFunction = function (points) {
    return bezier(points[0], points[1], points[2], points[3]);
};
var ease = function (easingFunction, currentTime, duration, initialValue, outputMultiplier) {
    if (initialValue === void 0) { initialValue = 0; }
    if (outputMultiplier === void 0) { outputMultiplier = 1; }
    return outputMultiplier * easingFunction(currentTime / duration) + initialValue;
};
var animate = function (easingFunction, duration, callback) {
    return new Promise(function (resolve) {
        var start = new Date().getTime();
        var run = function () {
            var elapsed = new Date().getTime() - start;
            if (elapsed < duration) {
                var progress = elapsed / duration;
                callback(easingFunction(progress), progress);
                requestAnimationFrame(run);
            }
            else {
                requestAnimationFrame(function () {
                    callback(easingFunction(1), 1);
                    resolve();
                });
            }
        };
        run();
    });
};

var BEZIER_LINEAR = [0.25, 0.25, 0.75, 0.75];
var BEZIER_EASE = [0.25, 0.1, 0.25, 1.0];
var BEZIER_EASE_IN = [0.42, 0.0, 1.0, 1.0];
var BEZIER_EASE_OUT = [0.0, 0.0, 0.58, 1.0];
var BEZIER_EASE_IN_OUT = [0.42, 0.0, 0.58, 1.0];
var BEZIER_EASE_IN_QUAD = [0.55, 0.085, 0.68, 0.53];
var BEZIER_EASE_IN_CUBIC = [0.55, 0.055, 0.675, 0.19];
var BEZIER_EASE_IN_QUART = [0.895, 0.03, 0.685, 0.22];
var BEZIER_EASE_IN_QUINT = [0.755, 0.05, 0.855, 0.06];
var BEZIER_EASE_IN_SINE = [0.47, 0.0, 0.745, 0.715];
var BEZIER_EASE_IN_EXPO = [0.95, 0.05, 0.795, 0.035];
var BEZIER_EASE_IN_CIRC = [0.6, 0.04, 0.98, 0.335];
var BEZIER_EASE_IN_BACK = [0.6, -0.28, 0.735, 0.045];
var BEZIER_EASE_OUT_QUAD = [0.25, 0.46, 0.45, 0.94];
var BEZIER_EASE_OUT_CUBIC = [0.215, 0.61, 0.355, 1.0];
var BEZIER_EASE_OUT_QUART = [0.165, 0.84, 0.44, 1.0];
var BEZIER_EASE_OUT_QUINT = [0.23, 1.0, 0.32, 1.0];
var BEZIER_EASE_OUT_SINE = [0.39, 0.575, 0.565, 1.0];
var BEZIER_EASE_OUT_EXPO = [0.19, 1.0, 0.22, 1.0];
var BEZIER_EASE_OUT_CIRC = [0.075, 0.82, 0.165, 1.0];
var BEZIER_EASE_OUT_BACK = [0.175, 0.885, 0.32, 1.275];
var BEZIER_EASE_IN_OUT_QUAD = [
    0.455,
    0.03,
    0.515,
    0.955,
];
var BEZIER_EASE_IN_OUT_CUBIC = [
    0.645,
    0.045,
    0.355,
    1.0,
];
var BEZIER_EASE_IN_OUT_QUART = [0.77, 0.0, 0.175, 1.0];
var BEZIER_EASE_IN_OUT_QUINT = [0.86, 0.0, 0.07, 1.0];
var BEZIER_EASE_IN_OUT_SINE = [0.445, 0.05, 0.55, 0.95];
var BEZIER_EASE_IN_OUT_EXPO = [1.0, 0.0, 0.0, 1.0];
var BEZIER_EASE_IN_OUT_CIRC = [0.785, 0.135, 0.15, 0.86];
var BEZIER_EASE_IN_OUT_BACK = [0.68, -0.55, 0.265, 1.55];

export { generateBezierFunction, ease, animate, BEZIER_LINEAR, BEZIER_EASE, BEZIER_EASE_IN, BEZIER_EASE_OUT, BEZIER_EASE_IN_OUT, BEZIER_EASE_IN_QUAD, BEZIER_EASE_IN_CUBIC, BEZIER_EASE_IN_QUART, BEZIER_EASE_IN_QUINT, BEZIER_EASE_IN_SINE, BEZIER_EASE_IN_EXPO, BEZIER_EASE_IN_CIRC, BEZIER_EASE_IN_BACK, BEZIER_EASE_OUT_QUAD, BEZIER_EASE_OUT_CUBIC, BEZIER_EASE_OUT_QUART, BEZIER_EASE_OUT_QUINT, BEZIER_EASE_OUT_SINE, BEZIER_EASE_OUT_EXPO, BEZIER_EASE_OUT_CIRC, BEZIER_EASE_OUT_BACK, BEZIER_EASE_IN_OUT_QUAD, BEZIER_EASE_IN_OUT_CUBIC, BEZIER_EASE_IN_OUT_QUART, BEZIER_EASE_IN_OUT_QUINT, BEZIER_EASE_IN_OUT_SINE, BEZIER_EASE_IN_OUT_EXPO, BEZIER_EASE_IN_OUT_CIRC, BEZIER_EASE_IN_OUT_BACK };
