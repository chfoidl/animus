declare type BreakpointCallback = (matches: boolean, scrollTop: number) => void;
declare type RangeCallback = (progress: number, scrollTop: number) => void;
declare type Target = Document | Element;
declare class ScrollHandlerCore {
    private target;
    private breakpoints;
    private ranges;
    private scrollListener;
    constructor(target?: Target);
    addBreakpoint(position: number, callback: BreakpointCallback): void;
    addRange(startPosition: number, endPosition: number, callback: RangeCallback): void;
    remove(): void;
    private listen;
    private checkPosition;
    private checkBreakpoint;
    private checkRange;
}
export declare const ScrollHandler: (target?: Target) => ScrollHandlerCore;
export declare const resetScrollHandlers: () => void;
export {};
