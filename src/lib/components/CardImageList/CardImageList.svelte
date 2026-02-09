<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
	};

	let { children }: Props = $props();
</script>

<div class="list">
	{@render children()}
</div>

<style>
	.list {
		display: grid;
		justify-self: center;
		width: 100%;
		@media (min-width: 640px) {
			grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
			gap: calc(var(--spacing-2) * 1px);
		}
		@media (max-width: 639px) {
			grid-template-columns: repeat(auto-fit, minmax(calc(var(--calc-sp) * 280), 1fr));
			gap: calc(var(--calc-sp) * var(--spacing-2));
		}
	}
</style>
