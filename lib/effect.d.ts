import { EffectCallback, EffectRunner, Watcher } from "./type";
export declare let currentEffect: EffectCallback | null;
export declare let effectMap: WeakMap<Watcher<unknown>, Set<EffectCallback>>;
export declare function effect(callback: EffectCallback): EffectRunner;
