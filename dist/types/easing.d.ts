export declare type EasingFunction = (input: number) => number;
export declare type BezierPoints = [number, number, number, number];
export declare const generateBezierFunction: (points: [number, number, number, number]) => EasingFunction;
export declare const ease: (easingFunction: EasingFunction, currentTime: number, duration: number, initialValue?: number, outputMultiplier?: number) => number;
export declare const animate: (easingFunction: EasingFunction, duration: number, callback: (easingOutput: number, progress: number) => void) => Promise<{}>;
