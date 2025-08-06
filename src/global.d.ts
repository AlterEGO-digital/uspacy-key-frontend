// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Anything = any;

type Prettify<T> = {
	[K in keyof T]: T[K] extends InstanceType<new (...args: Anything[]) => Anything> ? T[K] : T[K] extends object ? Prettify<T[K]> : T[K];
};

type NullOr<T> = T | null;
type Nullable<T> = NullOr<T> | undefined;
