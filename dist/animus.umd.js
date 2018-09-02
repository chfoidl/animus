(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('bezier-easing')) :
    typeof define === 'function' && define.amd ? define(['exports', 'bezier-easing'], factory) :
    (factory((global.animus = {}),global.bezier));
}(this, (function (exports,bezier) { 'use strict';

    bezier = bezier && bezier.hasOwnProperty('default') ? bezier['default'] : bezier;

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

    /**
     * Converts a NodeList or HTMLCollection to a plain Array.
     */

    var getScrollTop = function (target) {
        if (target instanceof Element) {
            return target.scrollTop;
        }
        return (window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0);
    };

    var ScrollHandlerCore = /** @class */ (function () {
        function ScrollHandlerCore(target) {
            if (target === void 0) { target = document; }
            this.breakpoints = [];
            this.ranges = [];
            this.target = target;
            this.listen();
        }
        ScrollHandlerCore.prototype.addBreakpoint = function (position, callback) {
            this.breakpoints.push({
                position: position,
                callback: callback,
                matches: false,
            });
            this.checkPosition(true);
        };
        ScrollHandlerCore.prototype.addRange = function (startPosition, endPosition, callback) {
            this.ranges.push({
                startPosition: startPosition,
                endPosition: endPosition,
                callback: callback,
                progress: 0,
            });
            this.checkPosition(true);
        };
        ScrollHandlerCore.prototype.remove = function () {
            this.target.removeEventListener("scroll", this.scrollListener);
        };
        ScrollHandlerCore.prototype.listen = function () {
            var _this = this;
            this.scrollListener = function () { return _this.checkPosition(); };
            this.target.addEventListener("scroll", this.scrollListener);
        };
        ScrollHandlerCore.prototype.checkPosition = function (forceCallback) {
            var _this = this;
            if (forceCallback === void 0) { forceCallback = false; }
            requestAnimationFrame(function () {
                var scrollTop = getScrollTop(_this.target);
                _this.breakpoints.forEach(function (breakpoint, index) {
                    return _this.checkBreakpoint(breakpoint, index, scrollTop, forceCallback);
                });
                _this.ranges.forEach(function (range, index) {
                    return _this.checkRange(range, index, scrollTop, forceCallback);
                });
            });
        };
        ScrollHandlerCore.prototype.checkBreakpoint = function (breakpoint, index, scrollTop, forceCallback) {
            if (forceCallback === void 0) { forceCallback = false; }
            if (breakpoint.matches && scrollTop < breakpoint.position) {
                this.breakpoints[index].matches = false;
                breakpoint.callback(false, scrollTop);
            }
            else if (!breakpoint.matches && scrollTop >= breakpoint.position) {
                this.breakpoints[index].matches = true;
                breakpoint.callback(true, scrollTop);
            }
            else if (forceCallback) {
                breakpoint.callback(false, scrollTop);
            }
        };
        ScrollHandlerCore.prototype.checkRange = function (range, index, scrollTop, forceCallback) {
            if (forceCallback === void 0) { forceCallback = false; }
            if ((scrollTop >= range.startPosition && scrollTop <= range.endPosition) ||
                forceCallback === true) {
                var progress = (scrollTop - range.startPosition) / (range.endPosition - range.startPosition);
                if (progress > 1) {
                    progress = 1;
                }
                else if (progress < 0) {
                    progress = 0;
                }
                this.ranges[index].progress = progress;
                range.callback(progress, scrollTop);
            }
            else if (scrollTop > range.endPosition && range.progress < 1) {
                this.ranges[index].progress = 1;
                range.callback(1, scrollTop);
            }
            else if (scrollTop < range.startPosition && range.progress > 0) {
                this.ranges[index].progress = 0;
                range.callback(0, scrollTop);
            }
        };
        return ScrollHandlerCore;
    }());
    var targets = [];
    var instances = [];
    var ScrollHandler = function (target) {
        if (target === void 0) { target = document; }
        var instanceIndex = targets.indexOf(target);
        if (instanceIndex === -1) {
            var instance = new ScrollHandlerCore(target);
            targets.push(target);
            instances.push(instance);
            return instance;
        }
        return instances[instanceIndex];
    };
    var resetScrollHandlers = function () {
        instances.forEach(function (instance) { return instance.remove(); });
        targets = [];
        instances = [];
    };

    exports.generateBezierFunction = generateBezierFunction;
    exports.ease = ease;
    exports.animate = animate;
    exports.BEZIER_LINEAR = BEZIER_LINEAR;
    exports.BEZIER_EASE = BEZIER_EASE;
    exports.BEZIER_EASE_IN = BEZIER_EASE_IN;
    exports.BEZIER_EASE_OUT = BEZIER_EASE_OUT;
    exports.BEZIER_EASE_IN_OUT = BEZIER_EASE_IN_OUT;
    exports.BEZIER_EASE_IN_QUAD = BEZIER_EASE_IN_QUAD;
    exports.BEZIER_EASE_IN_CUBIC = BEZIER_EASE_IN_CUBIC;
    exports.BEZIER_EASE_IN_QUART = BEZIER_EASE_IN_QUART;
    exports.BEZIER_EASE_IN_QUINT = BEZIER_EASE_IN_QUINT;
    exports.BEZIER_EASE_IN_SINE = BEZIER_EASE_IN_SINE;
    exports.BEZIER_EASE_IN_EXPO = BEZIER_EASE_IN_EXPO;
    exports.BEZIER_EASE_IN_CIRC = BEZIER_EASE_IN_CIRC;
    exports.BEZIER_EASE_IN_BACK = BEZIER_EASE_IN_BACK;
    exports.BEZIER_EASE_OUT_QUAD = BEZIER_EASE_OUT_QUAD;
    exports.BEZIER_EASE_OUT_CUBIC = BEZIER_EASE_OUT_CUBIC;
    exports.BEZIER_EASE_OUT_QUART = BEZIER_EASE_OUT_QUART;
    exports.BEZIER_EASE_OUT_QUINT = BEZIER_EASE_OUT_QUINT;
    exports.BEZIER_EASE_OUT_SINE = BEZIER_EASE_OUT_SINE;
    exports.BEZIER_EASE_OUT_EXPO = BEZIER_EASE_OUT_EXPO;
    exports.BEZIER_EASE_OUT_CIRC = BEZIER_EASE_OUT_CIRC;
    exports.BEZIER_EASE_OUT_BACK = BEZIER_EASE_OUT_BACK;
    exports.BEZIER_EASE_IN_OUT_QUAD = BEZIER_EASE_IN_OUT_QUAD;
    exports.BEZIER_EASE_IN_OUT_CUBIC = BEZIER_EASE_IN_OUT_CUBIC;
    exports.BEZIER_EASE_IN_OUT_QUART = BEZIER_EASE_IN_OUT_QUART;
    exports.BEZIER_EASE_IN_OUT_QUINT = BEZIER_EASE_IN_OUT_QUINT;
    exports.BEZIER_EASE_IN_OUT_SINE = BEZIER_EASE_IN_OUT_SINE;
    exports.BEZIER_EASE_IN_OUT_EXPO = BEZIER_EASE_IN_OUT_EXPO;
    exports.BEZIER_EASE_IN_OUT_CIRC = BEZIER_EASE_IN_OUT_CIRC;
    exports.BEZIER_EASE_IN_OUT_BACK = BEZIER_EASE_IN_OUT_BACK;
    exports.ScrollHandler = ScrollHandler;
    exports.resetScrollHandlers = resetScrollHandlers;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
