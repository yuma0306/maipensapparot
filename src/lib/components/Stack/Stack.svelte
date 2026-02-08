<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type CommonProps = {
		size: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
		variant: 'div' | 'ul' | 'section' | 'dl';
		children: Snippet;
	};
	type StackProps = CommonProps & HTMLAttributes<HTMLElement>;

	let props: StackProps = $props();
</script>

<svelte:element
	this={props.variant}
	class="stack"
	style="--stack-gap: var(--spacing-{props.size})"
	{...props}
>
	{@render props.children()}
</svelte:element>

<style>
	.stack {
		display: grid;
	}
	@media (min-width: 640px) {
		.stack {
			row-gap: calc(var(--stack-gap) * 1px);
		}
	}
	@media (max-width: 639px) {
		.stack {
			row-gap: calc(var(--calc-sp) * var(--stack-gap));
		}
	}
</style>
