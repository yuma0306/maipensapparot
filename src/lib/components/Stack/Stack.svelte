<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type CommonProps = {
		size: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
		children: Snippet;
	};

	type StackDivProps = {
		variant: 'div';
	} & CommonProps &
		HTMLAttributes<HTMLDivElement>;

	type StackSectionProps = {
		variant: 'section';
	} & CommonProps &
		HTMLAttributes<HTMLElement>;

	type StackProps = StackDivProps | StackSectionProps;

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
