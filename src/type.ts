export type EffectCallback = () => void;
export type EffectRunner = {
  (): void;
}

export type Getter<T> = () => T;


export type Setter<T> = (value: ((value: T) => T) | T) => void;

export type State<T> = [Getter<T>, Setter<T>] & {
  value: T;
};;

export type Watcher<T> = { value: T }