<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	type CommonProps = {
		variant: 'a' | 'button';
		children: Snippet;
		color: 'secondary' | 'success';
	};

	type Props = CommonProps & (HTMLAnchorAttributes | HTMLButtonAttributes);

	let { children, variant, color, ...restProps }: Props = $props();
</script>

<svelte:element this={variant} class="button" data-color={color} {...restProps}>
	{@render children()}
</svelte:element>

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
		&[data-color='secondary'] {
			background-color: var(--color-secondary);
		}
		&[data-color='success'] {
			background-color: var(--color-success);
		}
	}
	@media (min-width: 640px) {
		.button {
			width: min(100%, 400px);
			border-radius: calc(var(--border-radius) * 1px);
			padding: calc(var(--spacing-2) * 1px);
			font-size: calc(var(--font-size-2) * 1px);
		}
	}
	@media (max-width: 639px) {
		.button {
			width: 100%;
			border-radius: calc(var(--calc-sp) * var(--border-radius));
			padding: calc(var(--calc-sp) * var(--spacing-2));
			font-size: calc(var(--calc-sp) * var(--font-size-2));
		}
	}
</style>
