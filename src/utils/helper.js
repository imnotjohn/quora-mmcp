export function setTransitionTimeout (timeout, func) {
    setTimeout( () => {
        if (func !== undefined) {
            func();
        }
    }, timeout);
}