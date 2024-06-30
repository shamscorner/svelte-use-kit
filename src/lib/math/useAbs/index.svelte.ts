/**
 * Reactive `Math.abs`.
 *
 * @see https://vueuse.org/useAbs
 */
export function useAbs() {
	let valueSt = $state<number | number[]>(0);

	function abs(value: typeof valueSt) {
		if (Array.isArray(value)) {
			valueSt = value.map(Math.abs);
		} else {
			valueSt = Math.abs(value);
		}
	}

	return {
		get value() {
			return valueSt;
		},
		abs
	};
}
