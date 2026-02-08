<script lang="ts">
	import type { Snippet } from 'svelte';
	type InnerProps = {
		children: Snippet;
	};

	let props: InnerProps = $props();
</script>

<div class="inner">
	{@render props.children()}
</div>

<style>
	@media (min-width: 640px) {
		.inner {
			width: min(100%, 1200px);
			margin-inline: auto;
		}
	}
</style>
