<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		href: string;
		children: Snippet;
	};

	let { href, children }: Props = $props();
</script>

<a {href} class="button">
	{@render children()}
</a>

<style>
	.button {
		display: block;
		text-align: center;
		background-color: var(--color-secondary);
		color: var(--color-white);
		font-weight: 700;
		text-decoration: none;
		transition: opacity var(--transition);
		margin-inline: auto;
		&:hover {
			opacity: var(--opacity);
		}
	}
	@media (min-width: 640px) {
		.button {
			width: min(100%, 400px);
			border-radius: calc(var(--border-radius) * 1px);
			padding: calc(var(--spacing-4) * 1px);
			font-size: calc(var(--font-size-2) * 1px);
		}
	}
	@media (max-width: 639px) {
		.button {
			width: 100%;
			border-radius: calc(var(--calc-sp) * var(--border-radius));
			padding: calc(var(--calc-sp) * var(--spacing-4));
			font-size: calc(var(--calc-sp) * var(--font-size-2));
		}
	}
</style>
