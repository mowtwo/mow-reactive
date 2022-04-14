import { EffectCallback, Getter, Setter, State, Watcher } from "./type";
import { currentEffect, effectMap } from "./effect"

export function state<T>(initValue: T): State<T> {
  let watcher: Watcher<T> = { value: initValue };
  const getter: Getter<T> = (() => {
    const effect = currentEffect;
    if (effect) {
      let set: Set<EffectCallback>;
      if (!effectMap.has(watcher)) {
        effectMap.set(watcher, set = new Set());
      } else {
        set = effectMap.get(watcher)!;
      }
      set.add(effect);
    }
    return watcher.value
  }) as Getter<T>

  const setter: Setter<T> = (value) => {
    if (value instanceof Function) {
      watcher.value = value(watcher.value);
    } else {
      watcher.value = value;
    }
    const effect = effectMap.get(watcher);
    for (const callback of effect ?? []) {
      callback();
    }
  }
  const _state: State<T> = [getter, setter] as State<T>;
  Object.defineProperty(_state, "value", {
    get: getter,
    set: setter,
  })
  return _state;
}