export const setScrollTop = (
    target: Document | Window | Element,
    value: number
) => {
    const propName = target instanceof Element ? "scrollTop" : "pageYOffset";
    if (target === document) target = window;

    Object.defineProperty(target, propName, {
        value,
        configurable: true,
    });
};
