import { EffectCallback, EffectRunner, Watcher } from "./type";

export let currentEffect: EffectCallback | null = null;
export let effectMap: WeakMap<Watcher<unknown>, Set<EffectCallback>> = new WeakMap();
export function effect(callback: EffectCallback) {
  const run = (() => {
    currentEffect = callback;
    callback();
  }) as EffectRunner;
  run();
  return run
}