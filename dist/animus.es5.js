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

export { generateBezierFunction, ease, animate };
