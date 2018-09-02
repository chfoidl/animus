import { ScrollHandler, resetScrollHandlers } from "../src/animus";
import { setScrollTop } from "./utils/index";

window.requestAnimationFrame = (fn: Function) => fn();

describe("ScrollHandler", () => {
    beforeEach(() => {
        resetScrollHandlers();
        setScrollTop(document, 0);
    });

    it("should run callback on creation", () => {
        const callback = jest.fn();

        ScrollHandler(document).addBreakpoint(50, callback);
        expect(callback.mock.calls.length).toBe(1);
        expect(callback.mock.calls[0][0]).toBeFalsy();
    });

    it("should pass variable to callback if breakpoint matches", () => {
        const callback = jest.fn();

        ScrollHandler().addBreakpoint(50, callback);

        setScrollTop(document, 105);

        document.dispatchEvent(new Event("scroll"));

        expect(callback.mock.calls[0][0]).toBeFalsy();
        expect(callback.mock.calls[1][0]).toBeTruthy();
    });

    it("should listen on document by default", () => {
        const callback = jest.fn();

        ScrollHandler().addBreakpoint(50, callback);

        setScrollTop(document, 50);

        document.dispatchEvent(new Event("scroll"));

        expect(callback.mock.calls.length).toBe(2);
    });

    it("should run breakpoint callback only when passing the breakpoint", () => {
        const cb = jest.fn();

        ScrollHandler().addBreakpoint(50, cb);

        setScrollTop(document, 50);
        document.dispatchEvent(new Event("scroll"));

        setScrollTop(document, 55);
        document.dispatchEvent(new Event("scroll"));

        setScrollTop(document, 105);
        document.dispatchEvent(new Event("scroll"));

        setScrollTop(document, 48);
        document.dispatchEvent(new Event("scroll"));

        setScrollTop(document, 41);
        document.dispatchEvent(new Event("scroll"));

        setScrollTop(document, 96);
        document.dispatchEvent(new Event("scroll"));

        expect(cb.mock.calls.length).toBe(4);
    });

    it("should pass scrollTop value to callback", () => {
        const cb = jest.fn();

        ScrollHandler().addBreakpoint(50, cb);

        setScrollTop(document, 50);
        document.dispatchEvent(new Event("scroll"));

        expect(cb.mock.calls[0][1]).toBe(0);
        expect(cb.mock.calls[1][1]).toBe(50);
    });

    it("should not create multiple instances for the same target", () => {
        const cb = jest.fn();
        const addEventListenerMock = jest.fn(document.addEventListener);
        document.addEventListener = addEventListenerMock;

        ScrollHandler().addBreakpoint(50, cb);
        ScrollHandler().addBreakpoint(50, cb);
        ScrollHandler().addBreakpoint(50, cb);

        setScrollTop(document, 50);
        document.dispatchEvent(new Event("scroll"));

        expect(addEventListenerMock.mock.calls.length).toBe(1);
    });

    it("should handle ranges", () => {
        const cb = jest.fn();

        ScrollHandler().addRange(50, 100, cb);

        expect(cb.mock.calls.length).toBe(1);
        expect(cb.mock.calls[0][0]).toBe(0);
        expect(cb.mock.calls[0][1]).toBe(0);
    });

    it("should report progress of one if scrollTop after range on init", () => {
        const cb = jest.fn();

        setScrollTop(document, 105);
        ScrollHandler().addRange(50, 100, cb);

        expect(cb.mock.calls[0][0]).toBe(1);
        expect(cb.mock.calls[0][1]).toBe(105);
    });

    it("should run range callback if scrolling withing that range", () => {
        const cb = jest.fn();

        ScrollHandler().addRange(50, 100, cb);

        cb.mockReset();

        setScrollTop(document, 60);
        document.dispatchEvent(new Event("scroll"));

        expect(cb.mock.calls[0][0]).toBe(0.2);
        expect(cb.mock.calls[0][1]).toBe(60);

        cb.mockReset();

        setScrollTop(document, 75);
        document.dispatchEvent(new Event("scroll"));

        expect(cb.mock.calls[0][0]).toBe(0.5);
        expect(cb.mock.calls[0][1]).toBe(75);

        cb.mockReset();

        setScrollTop(document, 99);
        document.dispatchEvent(new Event("scroll"));

        expect(cb.mock.calls[0][0]).toBe(0.98);
        expect(cb.mock.calls[0][1]).toBe(99);

        cb.mockReset();

        setScrollTop(document, 285);
        document.dispatchEvent(new Event("scroll"));

        expect(cb.mock.calls[0][0]).toBe(1);
        expect(cb.mock.calls[0][1]).toBe(285);
    });

    it("should always report progress of 1 after scrolling by range", () => {
        const cb = jest.fn();

        ScrollHandler().addRange(50, 100, cb);
        setScrollTop(document, 105);
        document.dispatchEvent(new Event("scroll"));

        expect(cb.mock.calls[1][0]).toBe(1);
        expect(cb.mock.calls[1][1]).toBe(105);
    });

    it("should always report progress of 0 after scrolling before range", () => {
        const cb = jest.fn();

        ScrollHandler().addRange(50, 100, cb);
        setScrollTop(document, 105);
        document.dispatchEvent(new Event("scroll"));

        setScrollTop(document, 20);
        document.dispatchEvent(new Event("scroll"));

        expect(cb.mock.calls[2][0]).toBe(0);
        expect(cb.mock.calls[2][1]).toBe(20);
    });

    it("should report breakpoint changes with element as target", () => {
        const cb = jest.fn();

        const el = document.createElement("div");

        ScrollHandler(el).addBreakpoint(50, cb);

        setScrollTop(el, 55);
        el.dispatchEvent(new Event("scroll"));

        expect(cb.mock.calls.length).toBe(2);
        expect(cb.mock.calls[0][0]).toBeFalsy();
        expect(cb.mock.calls[0][1]).toBe(0);
        expect(cb.mock.calls[1][0]).toBeTruthy();
        expect(cb.mock.calls[1][1]).toBe(55);
    });

    it("should report range progress with element as target", () => {
        const cb = jest.fn();

        const el = document.createElement("div");

        ScrollHandler(el).addRange(50, 100, cb);

        cb.mockReset();

        setScrollTop(el, 60);
        el.dispatchEvent(new Event("scroll"));

        expect(cb.mock.calls[0][0]).toBe(0.2);
        expect(cb.mock.calls[0][1]).toBe(60);

        cb.mockReset();

        setScrollTop(el, 90);
        el.dispatchEvent(new Event("scroll"));

        expect(cb.mock.calls[0][0]).toBe(0.8);
        expect(cb.mock.calls[0][1]).toBe(90);

        cb.mockReset();

        setScrollTop(el, 105);
        el.dispatchEvent(new Event("scroll"));

        expect(cb.mock.calls[0][0]).toBe(1);
        expect(cb.mock.calls[0][1]).toBe(105);

        cb.mockReset();

        setScrollTop(el, 10);
        el.dispatchEvent(new Event("scroll"));

        expect(cb.mock.calls[0][0]).toBe(0);
        expect(cb.mock.calls[0][1]).toBe(10);
    });
});
