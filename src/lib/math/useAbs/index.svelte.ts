/**
 * Reactive `Math.abs`.
 *
 * @see https://vueuse.org/useAbs
 */
export function useAbs(value: number) {
	const absValueSt = $state(Math.abs(value));

	return {
		get value() {
			return absValueSt;
		}
	};
}
