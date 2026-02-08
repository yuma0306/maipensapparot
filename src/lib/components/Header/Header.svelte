<script lang="ts">
	import type { Snippet } from 'svelte';
	import Inner from '$lib/components/Inner/Inner.svelte';

	type FooterProps = {
		children: Snippet;
	};

	let props: FooterProps = $props();
</script>

<header class="header">
	<Inner>
		{@render props.children()}
	</Inner>
</header>

<style>
	@media (min-width: 640px) {
		.header {
			padding: calc(var(--spacing-2) * 1px);
			background-color: var(--color-primary);
		}
	}
	@media (max-width: 639px) {
		.header {
			padding: calc(var(--calc-sp) * var(--spacing-2));
			background-color: var(--color-primary);
		}
	}
</style>
