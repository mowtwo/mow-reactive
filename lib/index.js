let currentEffect = null;
let effectMap = new WeakMap();
function effect(callback) {
    const run = (() => {
        currentEffect = callback;
        callback();
    });
    run();
    return run;
}

function state(initValue) {
    let watcher = { value: initValue };
    const getter = (() => {
        const effect = currentEffect;
        if (effect) {
            let set;
            if (!effectMap.has(watcher)) {
                effectMap.set(watcher, set = new Set());
            }
            else {
                set = effectMap.get(watcher);
            }
            set.add(effect);
        }
        return watcher.value;
    });
    const setter = (value) => {
        if (value instanceof Function) {
            watcher.value = value(watcher.value);
        }
        else {
            watcher.value = value;
        }
        const effect = effectMap.get(watcher);
        for (const callback of effect !== null && effect !== void 0 ? effect : []) {
            callback();
        }
    };
    const _state = [getter, setter];
    Object.defineProperty(_state, "value", {
        get: getter,
        set: setter,
    });
    return _state;
}

export { effect, state };
