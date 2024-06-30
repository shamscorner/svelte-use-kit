/**
 * Void function
 */
export type Fn = () => void;

/**
 * Any function
 */
export type AnyFn = (...args: any[]) => any;

export type Arrayable<T> = T[] | T;

/**
 * Infers the element type of an array
 */
export type ElementOf<T> = T extends (infer E)[] ? E : never;

export type Awaitable<T> = Promise<T> | T;

export type ArgumentsType<T> = T extends (...args: infer U) => any ? U : never;

/**
 * Compatible with versions below TypeScript 4.5 Awaited
 */
export type Awaited<T> = T extends null | undefined
	? T // special case for `null | undefined` when not in `--strictNullChecks` mode
	: T extends object & { then: (onfulfilled: infer F, ...args: infer _) => any } // `await` only unwraps object types with a callable `then`. Non-object types are not unwrapped
		? F extends (value: infer V, ...args: infer _) => any // if the argument to `then` is callable, extracts the first argument
			? Awaited<V> // recursively unwrap the value
			: never // the argument to `then` was not callable
		: T; // non-object or non-thenable

export type Promisify<T> = Promise<Awaited<T>>;

export type PromisifyFn<T extends AnyFn> = (...args: ArgumentsType<T>) => Promisify<ReturnType<T>>;

export interface Pausable {
	/**
	 * A ref indicate whether a pausable instance is active
	 */
	isActive: Readonly<boolean>;

	/**
	 * Temporary pause the effect from executing
	 */
	pause: Fn;

	/**
	 * Resume the effects
	 */
	resume: Fn;
}

export interface Stoppable<StartFnArgs extends any[] = any[]> {
	/**
	 * A ref indicate whether a stoppable instance is executing
	 */
	isPending: Readonly<boolean>;

	/**
	 * Stop the effect from executing
	 */
	stop: Fn;

	/**
	 * Start the effects
	 */
	start: (...args: StartFnArgs) => void;
}

export type Mutable<T> = { -readonly [P in keyof T]: T[P] };

// https://stackoverflow.com/questions/55541275/typescript-check-for-the-any-type
export type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N;

/**
 * will return `true` if `T` is `any`, or `false` otherwise
 */
export type IsAny<T> = IfAny<T, true, false>;
