<script lang="ts">
	import type { Snippet } from 'svelte';

	type CardListProps = {
		children: Snippet;
	};

	let props: CardListProps = $props();
</script>

<div class="list">
	{@render props.children()}
</div>

<style>
	.list {
		display: grid;
		justify-self: center;
		width: 100%;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: calc(var(--spacing-2) * 1px);
	}
</style>
