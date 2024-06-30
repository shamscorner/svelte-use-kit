<script lang="ts">
	import { useAbs } from './index.svelte.js';

	let value = $state(-23);

	const absValue = $derived(useAbs(value));
</script>

{absValue.value}
