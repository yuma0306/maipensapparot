<script lang="ts">
	import type { PageData } from './$types';
	import CardImageList from '$lib/components/CardImageList/CardImageList.svelte';
	import { siteData } from '$lib/const/siteData';
	import Stack from '$lib/components/Stack/Stack.svelte';
	import Spacer from '$lib/components/Spacer/Spacer.svelte';
	import CardImage from '$lib/components/CardImage/CardImage.svelte';

	let { data }: { data: PageData } = $props();
	const situations = $derived(data.situations);
</script>

<Stack size={2} variant="section">
	<h1 class="heading">{siteData.title}へようこそ</h1>
	<p class="lead">シチュエーションを選んで学習を始めましょう</p>
</Stack>
<Spacer size={3} variant="div" />
<CardImageList>
	{#each situations as situation}
		<CardImage
			variant="a"
			href={`/situations/${situation.id}`}
			id={situation.id}
			title={situation.title}
			description={situation.description}
			thumbnail={situation.thumbnail}
		/>
	{/each}
</CardImageList>

<style>
	.heading {
		font-size: calc(var(--font-size-5) * 1px);
		text-align: center;
		font-weight: 700;
		color: var(--color-secondary);
	}
	.lead {
		font-size: calc(var(--font-size-1) * 1px);
		text-align: center;
	}
</style>
