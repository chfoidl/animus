import { getScrollTop } from "@sethorax/browser-utils";

type BreakpointCallback = (matches: boolean, scrollTop: number) => void;
type RangeCallback = (progress: number, scrollTop: number) => void;

interface Breakpoint {
    position: number;
    callback: BreakpointCallback;
    matches: boolean;
}

interface Range {
    progress: number;
    startPosition: number;
    endPosition: number;
    callback: RangeCallback;
}

type Target = Document | Element;

class ScrollHandlerCore {
    private target: Target;
    private breakpoints: Breakpoint[] = [];
    private ranges: Range[] = [];
    private scrollListener: EventListener;

    public constructor(target: Target = document) {
        this.target = target;

        this.listen();
    }

    public addBreakpoint(position: number, callback: BreakpointCallback) {
        this.breakpoints.push({
            position,
            callback,
            matches: false,
        });

        this.checkPosition(true);
    }

    public addRange(
        startPosition: number,
        endPosition: number,
        callback: RangeCallback
    ) {
        this.ranges.push({
            startPosition,
            endPosition,
            callback,
            progress: 0,
        });

        this.checkPosition(true);
    }

    public remove() {
        this.target.removeEventListener("scroll", this.scrollListener);
    }

    private listen() {
        this.scrollListener = () => this.checkPosition();
        this.target.addEventListener("scroll", this.scrollListener);
    }

    private checkPosition(forceCallback = false) {
        requestAnimationFrame(() => {
            const scrollTop = getScrollTop(this.target);

            this.breakpoints.forEach((breakpoint, index) =>
                this.checkBreakpoint(
                    breakpoint,
                    index,
                    scrollTop,
                    forceCallback
                )
            );

            this.ranges.forEach((range, index) =>
                this.checkRange(range, index, scrollTop, forceCallback)
            );
        });
    }

    private checkBreakpoint(
        breakpoint: Breakpoint,
        index: number,
        scrollTop: number,
        forceCallback = false
    ) {
        if (breakpoint.matches && scrollTop < breakpoint.position) {
            this.breakpoints[index].matches = false;
            breakpoint.callback(false, scrollTop);
        } else if (!breakpoint.matches && scrollTop >= breakpoint.position) {
            this.breakpoints[index].matches = true;
            breakpoint.callback(true, scrollTop);
        } else if (forceCallback) {
            breakpoint.callback(false, scrollTop);
        }
    }

    private checkRange(
        range: Range,
        index: number,
        scrollTop: number,
        forceCallback = false
    ) {
        if (
            (scrollTop >= range.startPosition &&
                scrollTop <= range.endPosition) ||
            forceCallback === true
        ) {
            let progress =
                (scrollTop - range.startPosition) /
                (range.endPosition - range.startPosition);

            if (progress > 1) {
                progress = 1;
            } else if (progress < 0) {
                progress = 0;
            }

            this.ranges[index].progress = progress;
            range.callback(progress, scrollTop);
        } else if (scrollTop > range.endPosition && range.progress < 1) {
            this.ranges[index].progress = 1;
            range.callback(1, scrollTop);
        } else if (scrollTop < range.startPosition && range.progress > 0) {
            this.ranges[index].progress = 0;
            range.callback(0, scrollTop);
        }
    }
}

let targets: Target[] = [];
let instances: ScrollHandlerCore[] = [];

export const ScrollHandler = (target: Document | Element = document) => {
    const instanceIndex = targets.indexOf(target);

    if (instanceIndex === -1) {
        const instance = new ScrollHandlerCore(target);

        targets.push(target);
        instances.push(instance);

        return instance;
    }

    return instances[instanceIndex];
};

export const resetScrollHandlers = () => {
    instances.forEach(instance => instance.remove());

    targets = [];
    instances = [];
};
