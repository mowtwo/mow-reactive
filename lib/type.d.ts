export declare type EffectCallback = () => void;
export declare type EffectRunner = {
    (): void;
};
export declare type Getter<T> = () => T;
export declare type Setter<T> = (value: ((value: T) => T) | T) => void;
export declare type State<T> = [Getter<T>, Setter<T>] & {
    value: T;
};
export declare type Watcher<T> = {
    value: T;
};
