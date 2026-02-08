<script lang="ts">
	import type { Snippet } from 'svelte';

	type WrapperProps = {
		children: Snippet;
	};

	let props: WrapperProps = $props();
</script>

<div class="wrapper">
	{@render props.children()}
</div>

<style>
	.wrapper {
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}
</style>
