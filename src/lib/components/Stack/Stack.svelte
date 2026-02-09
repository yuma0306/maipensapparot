<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type CommonProps = {
		size: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
		variant: 'div' | 'ul' | 'section' | 'dl';
		children: Snippet;
	};
	type Props = CommonProps & HTMLAttributes<HTMLElement>;

	let props: Props = $props();
</script>

<svelte:element this={props.variant} class="stack" data-size={props.size} {...props}>
	{@render props.children()}
</svelte:element>

<style>
	.stack {
		display: grid;
	}
	@media (min-width: 640px) {
		.stack {
			&[data-size='1'] {
				row-gap: calc(var(--spacing-1) * 1px);
			}
			&[data-size='2'] {
				row-gap: calc(var(--spacing-2) * 1px);
			}
			&[data-size='3'] {
				row-gap: calc(var(--spacing-3) * 1px);
			}
			&[data-size='4'] {
				row-gap: calc(var(--spacing-4) * 1px);
			}
			&[data-size='5'] {
				row-gap: calc(var(--spacing-5) * 1px);
			}
			&[data-size='6'] {
				row-gap: calc(var(--spacing-6) * 1px);
			}
			&[data-size='7'] {
				row-gap: calc(var(--spacing-7) * 1px);
			}
			&[data-size='8'] {
				row-gap: calc(var(--spacing-8) * 1px);
			}
			&[data-size='9'] {
				row-gap: calc(var(--spacing-9) * 1px);
			}
			&[data-size='10'] {
				row-gap: calc(var(--spacing-10) * 1px);
			}
		}
	}
	@media (max-width: 639px) {
		.stack {
			&[data-size='1'] {
				row-gap: calc(var(--calc-sp) * var(--spacing-1));
			}
			&[data-size='2'] {
				row-gap: calc(var(--calc-sp) * var(--spacing-2));
			}
			&[data-size='3'] {
				row-gap: calc(var(--calc-sp) * var(--spacing-3));
			}
			&[data-size='4'] {
				row-gap: calc(var(--calc-sp) * var(--spacing-4));
			}
			&[data-size='5'] {
				row-gap: calc(var(--calc-sp) * var(--spacing-5));
			}
			&[data-size='6'] {
				row-gap: calc(var(--calc-sp) * var(--spacing-6));
			}
			&[data-size='7'] {
				row-gap: calc(var(--calc-sp) * var(--spacing-7));
			}
			&[data-size='8'] {
				row-gap: calc(var(--calc-sp) * var(--spacing-8));
			}
			&[data-size='9'] {
				row-gap: calc(var(--calc-sp) * var(--spacing-9));
			}
			&[data-size='10'] {
				row-gap: calc(var(--calc-sp) * var(--spacing-10));
			}
		}
	}
</style>
