// import type { MaybeRef } from '@vueuse/shared';
// import { objectPick, toRefs } from '@vueuse/shared';

import { type ConfigurableWindow, defaultWindow } from '$lib/_configurable.js';
import { objectPick } from '$lib/shared/index.js';
import type { PointerType, Position } from '$lib/types.js';

import { useEventListener } from '../useEventListener';

export interface UsePointerState extends Position {
	pressure: number;
	pointerId: number;
	tiltX: number;
	tiltY: number;
	width: number;
	height: number;
	twist: number;
	pointerType: PointerType | null;
}

export interface UsePointerOptions extends ConfigurableWindow {
	/**
	 * Pointer types that listen to.
	 *
	 * @default ['mouse', 'touch', 'pen']
	 */
	pointerTypes?: PointerType[];

	/**
	 * Initial values
	 */
	initialValue?: Partial<UsePointerState>;

	/**
	 * @default window
	 */
	target?: EventTarget | null | undefined | Document | Window;
}

const defaultState: UsePointerState = /* #__PURE__ */ {
	x: 0,
	y: 0,
	pointerId: 0,
	pressure: 0,
	tiltX: 0,
	tiltY: 0,
	width: 0,
	height: 0,
	twist: 0,
	pointerType: null
};

const keys = /* #__PURE__ */ Object.keys(defaultState) as (keyof UsePointerState)[];

/**
 * Reactive pointer state.
 *
 * @see https://vueuse.org/usePointer
 * @param options
 */
export function usePointer(options: UsePointerOptions = {}) {
	const { target = defaultWindow } = options;

	let isInside = $state(false);
	let state = $state(options.initialValue || {}) as unknown as UsePointerState;

	Object.assign(state, defaultState, state);

	const handler = (event: PointerEvent) => {
		isInside = true;

		if (options.pointerTypes && !options.pointerTypes.includes(event.pointerType as PointerType))
			return;

		state = objectPick(event, keys, false) as UsePointerState;
	};

	if (target) {
		const listenerOptions = { passive: true };
		useEventListener(target, ['pointerdown', 'pointermove', 'pointerup'], handler, listenerOptions);
		useEventListener(target, 'pointerleave', () => (isInside = false), listenerOptions);
	}

	return {
		...toRefs(state),
		isInside
	};
}

export type UsePointerReturn = ReturnType<typeof usePointer>;
