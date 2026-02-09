<script lang="ts">
	type Props = {
		variant: 'div' | 'span';
		size: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
	};

	let { size, variant }: Props = $props();
</script>

<svelte:element
	this={variant}
	class="spacer"
	data-size={size}
	aria-hidden="true"
	role="presentation"
/>

<style>
	.spacer {
		display: block;
	}
	@media (min-width: 640px) {
		.spacer {
			&[data-size='1'] {
				height: calc(var(--spacing-1) * 1px);
			}
			&[data-size='2'] {
				height: calc(var(--spacing-2) * 1px);
			}
			&[data-size='3'] {
				height: calc(var(--spacing-3) * 1px);
			}
			&[data-size='4'] {
				height: calc(var(--spacing-4) * 1px);
			}
			&[data-size='5'] {
				height: calc(var(--spacing-5) * 1px);
			}
			&[data-size='6'] {
				height: calc(var(--spacing-6) * 1px);
			}
			&[data-size='7'] {
				height: calc(var(--spacing-7) * 1px);
			}
			&[data-size='8'] {
				height: calc(var(--spacing-8) * 1px);
			}
			&[data-size='9'] {
				height: calc(var(--spacing-9) * 1px);
			}
			&[data-size='10'] {
				height: calc(var(--spacing-10) * 1px);
			}
		}
	}
	@media (max-width: 639px) {
		.spacer {
			&[data-size='1'] {
				height: calc(var(--calc-sp) * var(--spacing-1));
			}
			&[data-size='2'] {
				height: calc(var(--calc-sp) * var(--spacing-2));
			}
			&[data-size='3'] {
				height: calc(var(--calc-sp) * var(--spacing-3));
			}
			&[data-size='4'] {
				height: calc(var(--calc-sp) * var(--spacing-4));
			}
			&[data-size='5'] {
				height: calc(var(--calc-sp) * var(--spacing-5));
			}
			&[data-size='6'] {
				height: calc(var(--calc-sp) * var(--spacing-6));
			}
			&[data-size='7'] {
				height: calc(var(--calc-sp) * var(--spacing-7));
			}
			&[data-size='8'] {
				height: calc(var(--calc-sp) * var(--spacing-8));
			}
			&[data-size='9'] {
				height: calc(var(--calc-sp) * var(--spacing-9));
			}
			&[data-size='10'] {
				height: calc(var(--calc-sp) * var(--spacing-10));
			}
		}
	}
</style>
