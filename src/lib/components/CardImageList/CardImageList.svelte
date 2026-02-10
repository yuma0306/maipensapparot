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
		width: 100%;
		justify-content: center;
		@media (min-width: 640px) {
			grid-template-columns: repeat(auto-fit, max(227px));
			gap: calc(var(--spacing-2) * 1px);
		}
		@media (max-width: 639px) {
			grid-template-columns: repeat(2, 1fr);
			gap: calc(var(--calc-sp) * var(--spacing-2));
		}
	}
</style>
