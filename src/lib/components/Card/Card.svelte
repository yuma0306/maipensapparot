<script lang="ts">
	import type { Snippet } from 'svelte';

	type CardProps = {
		borderColor: 'gray' | 'success' | 'danger';
		hasBorderLeft: boolean;
		children: Snippet;
		variant: 'li' | 'div';
	};

	let { borderColor, hasBorderLeft, children, variant }: CardProps = $props();
</script>

<svelte:element
	this={variant}
	class="card"
	data-has-border-left={hasBorderLeft}
	data-border-color={borderColor}
>
	{@render children()}
</svelte:element>

<style>
	.card {
		position: relative;
		display: grid;
		align-items: center;
		&[data-border-color='gray'] {
			border: 1px solid var(--color-gray);
		}
		&[data-border-color='success'] {
			border: 1px solid var(--color-success);
		}
		&[data-border-color='danger'] {
			border: 1px solid var(--color-danger);
		}
	}
	@media (min-width: 640px) {
		.card {
			padding: calc(var(--spacing-2) * 1px);
			border-radius: calc(var(--border-radius) * 1px);
			box-shadow: 0 0 calc(var(--spacing-1) * 1px) var(--color-gray);
			&[data-has-border-left='true'] {
				border-left: calc(var(--spacing-1) * 1px) solid var(--color-gray);
			}
		}
	}
	@media (max-width: 639px) {
		.card {
			padding: calc(var(--spacing-2) * var(--calc-sp));
			border-radius: calc(var(--calc-sp) * var(--border-radius));
			box-shadow: 0 0 calc(var(--calc-sp) * var(--spacing-1)) var(--color-gray);
			&[data-has-border-left='true'] {
				border-left: calc(var(--calc-sp) * var(--spacing-1)) solid var(--color-gray);
			}
		}
	}
</style>
