<script lang="ts">
	import type { Snippet } from 'svelte';

	type TypographyProps = {
		children: Snippet;
		size: 1 | 2 | 3 | 4 | 5;
		variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'dt' | 'dd';
		color: 'primary' | 'secondary' | 'dark' | 'white' | 'gray';
		weight: 'normal' | 'bold';
	};

	let props: TypographyProps = $props();
</script>

<svelte:element
	this={props.variant}
	class="typography"
	data-size={props.size}
	data-color={props.color}
	data-weight={props.weight}
	{...props}
>
	{@render props.children()}
</svelte:element>

<style>
	.typography {
		&[data-color='primary'] {
			color: var(--color-primary);
		}
		&[data-color='secondary'] {
			color: var(--color-secondary);
		}
		&[data-color='dark'] {
			color: var(--color-dark);
		}
		&[data-color='white'] {
			color: var(--color-white);
		}
		&[data-color='gray'] {
			color: var(--color-gray);
		}
		&[data-weight='normal'] {
			font-weight: 400;
		}
		&[data-weight='bold'] {
			font-weight: 700;
		}
	}
	@media (min-width: 640px) {
		.typography {
			&[data-size='1'] {
				font-size: calc(var(--font-size-1) * 1px);
			}
			&[data-size='2'] {
				font-size: calc(var(--font-size-2) * 1px);
			}
			&[data-size='3'] {
				font-size: calc(var(--font-size-3) * 1px);
			}
			&[data-size='4'] {
				font-size: calc(var(--font-size-4) * 1px);
			}
			&[data-size='5'] {
				font-size: calc(var(--font-size-5) * 1px);
			}
		}
	}
	@media (max-width: 639px) {
		.typography {
			&[data-size='1'] {
				font-size: calc(var(--calc-sp) * var(--font-size-1));
			}
			&[data-size='2'] {
				font-size: calc(var(--calc-sp) * var(--font-size-2));
			}
			&[data-size='3'] {
				font-size: calc(var(--calc-sp) * var(--font-size-3));
			}
			&[data-size='4'] {
				font-size: calc(var(--calc-sp) * var(--font-size-4));
			}
			&[data-size='5'] {
				font-size: calc(var(--calc-sp) * var(--font-size-5));
			}
		}
	}
</style>
