<script lang="ts">
	import { useAbs } from './index.svelte.js';
	import { Slider } from '$lib/components/ui/slider/index.js';

	let value = $state([-23]);

	const absValue = useAbs();

	function onSliderValueChange(value: number[]) {
		absValue.abs(value);
	}
</script>

<div class="flex min-h-40 w-full flex-col items-center justify-center gap-y-4 p-5">
	<Slider bind:value max={0} min={-30} step={1} onValueChange={onSliderValueChange} />
	<ul class="flex w-full gap-x-[12.5%]">
		{#each Array.from({ length: 7 }, (_, i) => i * 5 - 30) as i}
			<li>{i}</li>
		{/each}
	</ul>
	<p class="mt-6 font-semibold">
		<code class="mr-4 text-gray-500">Math.abs(value): </code>
		{absValue.value}
	</p>
</div>
