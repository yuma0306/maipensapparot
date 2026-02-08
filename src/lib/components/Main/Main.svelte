<script lang="ts">
	import type { Snippet } from 'svelte';

	type MainProps = {
		children: Snippet;
	};

	let props: MainProps = $props();
</script>

<main class="main">
	{@render props.children()}
</main>

<style>
	@media (min-width: 640px) {
		.main {
			flex: 1;
			background-color: var(--color-primary-5);
			padding: calc(var(--spacing-5) * 1px) calc(var(--spacing-2) * 1px);
		}
	}
	@media (max-width: 639px) {
		.main {
			flex: 1;
			background-color: var(--color-primary-5);
			padding: calc(var(--calc-sp) * var(--spacing-5)) calc(var(--calc-sp) * var(--spacing-2));
		}
	}
</style>
