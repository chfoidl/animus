"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var browser_utils_1 = require("@sethorax/browser-utils");
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
            var scrollTop = browser_utils_1.getScrollTop(_this.target);
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
exports.ScrollHandler = function (target) {
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
exports.resetScrollHandlers = function () {
    instances.forEach(function (instance) { return instance.remove(); });
    targets = [];
    instances = [];
};
