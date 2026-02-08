<script lang="ts">
	type SpacerProps = {
		variant: 'div' | 'span';
		size: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
	};

	let props: SpacerProps = $props();
</script>

<svelte:element
	this={props.variant}
	class="spacer"
	style="--spacer-size: var(--spacing-{props.size})"
	aria-hidden="true"
	role="presentation"
/>

<style>
	.spacer {
		display: block;
	}
	@media (min-width: 640px) {
		.spacer {
			height: calc(var(--spacer-size) * 1px);
		}
	}
	@media (max-width: 639px) {
		.spacer {
			height: calc(var(--calc-sp) * var(--spacer-size));
		}
	}
</style>
